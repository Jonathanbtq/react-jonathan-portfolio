import { useState } from 'react'
import { RouterProvider, createBrowserRouter, Outlet, NavLink, useRouteError } from 'react-router-dom'
import Minecraft from './pages/Minecraft'
import Home from './pages/Home'

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

function Root(){
  return <>
    <header>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/minecraft">Minecraft</NavLink>
        <NavLink to="/contact">Contact</NavLink>
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
