import { useState } from 'react'
import { RouterProvider, createBrowserRouter, Outlet, NavLink, useRouteError } from 'react-router-dom'
import Minecraft from './pages/Minecraft'
import Home from './pages/Home'
import './styles/NavBar.css'

const router = createBrowserRouter([
  {
   path: '/',
   element: <Root />,
   errorElement: <PageError />,
   children: [
     {
       path: '',
       element: <Home />,
     },
     {
       path: 'minecraft',
       element: <Minecraft />,
     },
     {
       path: 'contact',
       element: <div>Page de contact</div>,
     },
    //  {
    //   path: 'mc',
    //   children: [
    //     {
    //       path: '',
    //       element: <>Mon blog</>
    //     },
    //     {
    //       path: ':id',
    //       element: <UniquePage />
    //     }
    //   ]
    //  }
   ]
  }
])

function PageError(){
  const error = useRouteError()
  return <>
    <h1>Une erreur est arrivé</h1>
    <p>
      {error?.error?.toString() ?? error?.toString()}
    </p>
  </>
}

const NavDiv = () => {
  return  (
    <div>
      <NavLink to="/" className='navLink'>HOME</NavLink>
      <NavLink to="/minecraft" className='navLink'>MINECRAFT</NavLink>
      <a href="#" to="/minecraft" className='navLink'>CV</a>
      <NavLink to="/contact" className='nav_li_contact'>CONTACT</NavLink>
    </div>
  )
}

function Root(){
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen)
  }

  return <>
    <header>
      <nav>
        <div className="nav_top">
          <h1>JONATHAN</h1>
        </div>
        <div className="nav_bot">
          <NavDiv />
        </div>
        <div className="nav_bot_burger" onClick={toggleMobileMenu}>
          <div className="burger_icon">&#9776;</div>
        </div>
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="nav_bot_phone">
            <NavDiv />
          </div>
        )}
      </nav>
    </header>
    <div className="">
      <Outlet />
    </div>
  </>
}

function App() {
  return (<RouterProvider router={router}/>)
}

export default App
