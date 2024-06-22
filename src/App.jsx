import { useState, useEffect, useRef } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);

  const passwordRef = useRef(null);

  const passwordGenerator = () => {
    let pass = "";
    let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) alpha += "0123456789";
    if (charAllowed) alpha += "!@#$%&*-_+=~`";
    for (let i = 0; i <= length; i++) {
      pass += alpha.charAt(Math.floor(Math.random() * alpha.length + 1));
    }
    setPassword(pass);
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);

  const copyPassword = () => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
  };

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500 select-none">
      <h1 className="text-white text-center my-3 font-black text-xl font-serif">
        Password Generator
      </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 font-mono text-red-600 font-black"
          placeholder="Password..."
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPassword}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={8}
            max={20}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
