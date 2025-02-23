import { useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter, Outlet, NavLink, useRouteError } from 'react-router-dom'
import Minecraft from './pages/Minecraft'
import Boutique from './pages/Boutique'
import Home from './pages/Home'
import './styles/NavBar.css'
import Login from './components/auth/Login'
import AdminPage from './pages/Admin'

const currentUrl = window.location.href;

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
       path: 'boutique',
       element: <Boutique />,
     },
     {
       path: 'admin',
       element: <AdminPage />,
     },
     {
       path: 'contact',
       element: <div>Page de contact</div>,
     },
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
      <NavLink to="/boutique" className='navLink'>Boutique</NavLink>
      <NavLink to="/minecraft" className='navLink'>MINECRAFT</NavLink>
      <a href="#" to="/minecraft" className='navLink'>CV</a>
      <NavLink  className='nav_li_contact' to="mailto:botquin.jonathan@yahoo.fr"
            onClick={(e) => {
                window.location.href = mailto;
                e.preventDefault();
            }}
        >CONTACT</NavLink>
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
        <Login />
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
