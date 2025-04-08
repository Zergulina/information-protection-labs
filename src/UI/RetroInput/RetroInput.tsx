import { useEffect, useRef, useState } from 'react';
import classes from './RetroInput.module.css'

type RetroInputProps = {
  value: string,
  setValue: (targetValue: string) => void,
  onEnterKey?: () => void,
  onBackspaceKey?: () => void,
  className?: string
}

const RetroInput = ({ value, setValue, onEnterKey, onBackspaceKey, className }: RetroInputProps) => {
  const [letters, setLetters] = useState<{ char: string; id: number; left: number }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const letterId = useRef<number>(0);

  const handleInputChange = (newValue: string) => {
    setValue(newValue);

    const cursorPosition = inputRef.current?.selectionStart || 0;
    const inputWidth = inputRef.current?.clientWidth || 0;

    if (newValue.length > value.length) {
      const newChar = newValue[cursorPosition - 1];
      if (newChar) {
        setLetters((prevLetters) => [
          ...prevLetters,
          { char: newChar, id: letterId.current++, left: cursorPosition * 13.5 > inputWidth - 15 ? inputWidth - 15 : cursorPosition * 13.5 },
        ]);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (letters.length > 0) {
        setLetters((prevLetters) => prevLetters.slice(1));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [letters]);

  return (
    <div className={classes.RetroInputContainer}>
      <input value={value} ref={inputRef}
        onChange={e => handleInputChange(e.target.value)} className={`${classes.RetroInput} ${className}`}
        onKeyDown={(e) => {
          e.key == 'Enter' && onEnterKey && onEnterKey();
          if (e.key == 'Backspace' && onBackspaceKey) {
            e.preventDefault();
            onBackspaceKey();
          }
        }} />
      <div className={classes.FallingLettersContainer}>
        {letters.map((letter) => (
          <span
            key={letter.id}
            className={classes.FallingLetter}
            style={{ left: `${letter.left}px` }}
          >
            {letter.char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RetroInput;