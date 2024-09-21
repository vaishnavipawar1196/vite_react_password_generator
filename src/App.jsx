import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'


function App() {

  const [length,setLength] = useState(8);
  const [password,setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [number,setNumber] = useState(false);
  const [splchar,setSplchar] = useState(false);

  const generatePassword = () =>{
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let passwordgenerated = '';

    if(number) str += '0123456789';
    if(splchar) str += '~!@#$%^&*()_`{}|:"<>?/][=-';

    for(let i = 0; i <= length; i++){
      let randIndex = Math.floor(Math.random() * str.length);
      passwordgenerated += str[randIndex];
    }
    setPassword(passwordgenerated);
  }

  useEffect(()=>{
    generatePassword();
  },[length,number,splchar])

  const passRef = useRef(null);

  const copyToClipboard = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password).then(() => {
      setCopied(true); // Show "Copied!" message
      setTimeout(() => setCopied(false), 2000); // Hide "Copied!" after 2 seconds
    });
  },[password])

  return (
    <>
      
      <h1 className='text-center text-4xl my-4 text-violet-950 font-bold'>Password Generator</h1>
      
      <div className='text-center my-10 bg-violet-400 p-10 w-[60%] mx-auto rounded-lg'>
        <input value={password} ref={passRef} className='w-[75%] focus-visible:outline-none p-2' type='text' readOnly />
        <span onClick={copyToClipboard} className='cursor-pointer bg-violet-950 text-white py-2 px-4 border border-violet-950'>Copy</span>
        {copied && <span className='text-white ml-2'>Copied!</span>}
        <div className='my-4'>
          <input type='range' className='cursor-pointer mx-4' onChange={(e) => setLength(e.target.value)} min={8} max={12} value={length} /><label className='mr-4'>Length:{length}</label>
          <input type='checkbox' onChange={() => setNumber((prev) => !prev)} className='mx-2' /><label className='mr-4'>Numbers</label>
          <input type='checkbox' onChange={() => setSplchar((prev) => !prev)} className='mx-2' /><label className='mr-4'>Special Characters</label>
        </div>
      </div>
    </>
  )
}

export default App;