import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./styles.css"
import FilePoliticsPage from "../pages/FilePoliticsPage/FilePoliticsPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavPanel from "../modules/NavPanel/NavPanel";
import MandatFilePoliticsPage from "../pages/MandatFilePoliticsPage/MandatFilePoliticsPage";
import GraphicKeyPage from "../pages/GraphicKeyPage/GraphicKeyPage";
import KeyboardPage from "../pages/KeyboardPage/KeyboardPage";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavPanel />}>
          <Route index element={<FilePoliticsPage />} />
          <Route path="lab3" element={<MandatFilePoliticsPage />} />
          <Route path="lab5" element={<GraphicKeyPage/>} />
          <Route path="lab6" element={<KeyboardPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
