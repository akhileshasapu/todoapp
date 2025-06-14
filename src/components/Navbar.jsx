import React from 'react'

function Navbar() {
  return (
   <nav className="flex justify-between bg-slate-700 text-white py-4" >
    <div className="logo">
            <span className='font-bold mx-9 text-2xl'>itask</span>
        </div>
    <ul className="flex gap-8 mx-9">
        
        <li className='cursor-pointer  hover:font-bold transition-all'>Home </li>
        <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li> 
        </ul>
   </nav>
  )
}

export default Navbar