use std::{fs::{self, File}, io::Write};
use std::fs::OpenOptions;
use std::io::{self};

#[tauri::command]
fn create_file(name: &str) {
    File::create(name).unwrap();
}

#[tauri::command]
fn delete_file(name: &str) {
    fs::remove_file(name);
}

#[tauri::command]
fn write_to_file(name: &str, line: &str) {
    let mut file = OpenOptions::new()
        .write(true)
        .append(true)
        .create(true)
        .open(name)
        .unwrap();

    writeln!(file, "{}", line).unwrap();
}

#[tauri::command]
fn read_file(filename: &str) -> String {
    let contents = fs::read_to_string(filename).unwrap();
    contents
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![create_file, delete_file, write_to_file, read_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
