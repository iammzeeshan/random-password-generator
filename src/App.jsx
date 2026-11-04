import { useCallback, useState, useEffect, useRef } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(16)
  const [numberAllow, setNumberAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [Password, setPassword] = useState("")
  const PasswordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllow) str += "0123456789"
    if (charAllow) str += "!@#$%^&*()_+-=[]{}|'/?<>."

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)

      setPassword(pass)
    }

  }, [length, numberAllow, charAllow, setPassword])

  useEffect(() => { passwordGenerator() }, [length, numberAllow, charAllow, passwordGenerator])
  const copyPasswordToClipboard = useCallback(() => {
    PasswordRef.current?.select(Password);
    PasswordRef.current?.setSelectionRange(0, 30)
    window.navigator.clipboard.writeText(Password)
  }, [Password])

  return (
    <>
      <div className='w-full max-w-md mx-auto my-8 rounded-lg bg-gray-700 px-4 py-4 shadow-md'>
        <h1 className='mb-3 text-center text-white'>Random Password Generator</h1>
        <div className='flex overflow-hidden rounded-lg shadow-md'>
          <input type="text"
            value={Password}
            className='w-full bg-white py-2 px-3 outline-none'
            placeholder='password'
            readOnly
            ref={PasswordRef}
          />
          <button onClick={copyPasswordToClipboard} className='bg-blue-500 text-white px-2 outline-none shrink-0 hover:bg-blue-400'>copy</button>
        </div>

        <div className='flex text-sm gap-x-2 m-2'>
          <div className='flex justify-center gap-x-1 mt-2'>
            <input type="range"
              min={8}
              max={30}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label className='text-orange-400'>Length:{length}</label>
          </div>

          <div className='flex text-sm gap-x-2 mt-2'>
            <input type="checkbox"
              defaultChecked={numberAllow}
              id='inputnumber'
              onChange={() =>
                setNumberAllow((prev) => !prev)
              }
            />
            <label className='text-orange-400'>Numbers</label>
          </div>
          <div className='flex text-sm gap-x-2 mt-2'>
            <input type="checkbox"
              defaultChecked={charAllow}
              id='inputchar'
              onChange={() =>
                setCharAllow((prev) => !prev)
              }
            />
            <label className='text-orange-400'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
