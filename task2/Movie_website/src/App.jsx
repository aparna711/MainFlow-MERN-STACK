
import { useState } from 'react'

import './App.css'
import Search from './components/Search'

function App() {
  
  return (
    
      <main>
       <div className="pattern"></div>
       <div className="wrapper">
       <header class="flex flex-col justify-center items-center">
        {/* <img src="https://i.ibb.co/6n1x5f3/logo.png" alt="logo" /> */}
        <img src="https://img.freepik.com/free-photo/view-3d-cinema-elements_23-2150720822.jpg" alt="hero" 
        className="w-60 h-50 object-cover mr-3 opacity-60 animate-pulse"/>
        <h1 className='text-gradient  m-4'>
          Find <span className='text-gradient'> Your Movies </span> Without any <span className='text-gradient'>Hassel</span>
        </h1>
        
       </header>
      <Search  />
       </div>
      </main>
    

    
  )
}

export default App
