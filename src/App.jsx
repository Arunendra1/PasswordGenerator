import { useState , useCallback ,useEffect ,useRef} from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false)
  const [charAllowed,setCharAllowed]=useState(false)
  const [password,setPassword]= useState("")
    //useRef hook
    const passwordRef=useRef(null)
  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str+='0123456789'
  if(charAllowed) str+='!@#$%^&*()_+~`|}{[]\:;?><,./-='
  for(let i=1;i<=length;i++){
    let char =(Math.floor(Math.random()*str.length+1))
    pass+=str.charAt(char);
  }

  setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword]) //here we are  doing optimization

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(password)
    
  },[password])

  useEffect(()=>{passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator]) // here we run the function when the length or numberAllowed or charAllowed change

  return (
   
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center my-3'>Password generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>

      <input 
      type="text"
       value={password} 
       className='outline-none w-full py-1 px-3'
        placeholder='password' 
        readOnly
        ref={passwordRef}/>
      <button 
      onClick={copyPasswordToClipboard}
      className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
        copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
             type="range"
             min={8}
             max={100}
             value={length}
             className='cursor-pinter'
             onChange={(e)=>{
              setLength(e.target.value)

             }}
             />
         <label>Lenght: {length}</label>
         </div>
         <div className='flex items-center gap-x-1'>
         <input
             type="checkbox"
             defaultChecked={numberAllowed}
            id="numberInput"
             onChange={()=>{
              setNumberAllowed((prev)=>!prev) 
             }}
             />
             <label htmlFor='numberInput'>Numbers</label>
         </div>
         <div className='flex items-center gap-x-1'>
         <input
             type="checkbox"
             defaultChecked={charAllowed}
            id="CharecterInput"
             onChange={()=>{
              setCharAllowed((prev)=>!prev) 
             }}
             />
             <label htmlFor='charecterInput'>Charecters</label>
         </div>
        </div>
        </div>
   
  )
}

export default App
//useCallback is a React Hook that lets you cache defination between re-renders
//useEffect is a React Hook that lets you perform side effects in function components(syncronization)

//useRef is a React Hook that lets you reference a DOM node or a mutable value that will persist between re-renders
//useMemo is a React Hook that lets you memoize a value between re-renders
//useReducer is a React Hook that lets you manage complex state with a reducer function
//useContext is a React Hook that lets you subscribe to React context