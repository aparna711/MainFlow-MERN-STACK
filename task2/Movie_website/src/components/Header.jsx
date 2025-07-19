

import Search from './Search'
function Header(){
    return(
    <main>
       
      
       <div className="wrapper">
        
       <header className="flex flex-col justify-center items-center">
       
        {/* <img src="https://i.ibb.co/6n1x5f3/logo.png" alt="logo" /> */}
        <img src="https://img.freepik.com/free-photo/view-3d-cinema-elements_23-2150720822.jpg" alt="hero" 
        className="hero"/>
       
        <h1 className=" text-gradient m-4">
           Welcome to Movie World
        </h1>
       </header>
      <Search  />
       </div>
      </main>
    )
}
export default Header;