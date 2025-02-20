import { useState } from 'react'
import { RouterProvider, createBrowserRouter, Outlet, NavLink, useRouteError } from 'react-router-dom'
import Minecraft from './pages/Minecraft'
import Boutique from './pages/Boutique'
import Home from './pages/Home'
import './styles/NavBar.css'

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

const AdminButton = () => {
  // État pour gérer la visibilité du formulaire
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [credentials, setCredentials] = useState({
    login: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  // Fonction pour basculer la visibilité du formulaire
  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const toggleFormArrow = () => {
    setIsFormVisible(!isFormVisible);
  }
  // Fonction de gestion du changement des champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  // Soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault()

    const loginData = {
      email: credentials.login,
      password: credentials.password
    };

    fetch(currentUrl+'login', {
      method: 'POST',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
  })
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              setMessage('Identifiants invalides')
              throw new Error('Identifiants invalides');
          }
      })
      .then(data => {
          // data contient l'objet JSON renvoyé par le serveur
          const user = data.user;
          const cookies = new Cookies();
          cookies.set('user', user, { path: '/' });
          setMessage('Connexion réussi')
      })
      .catch((error) => {
      console.error('Une erreur est survenue lors de la requête de connexion', error)
      })
  }

  return (
    <>
      <button onClick={toggleForm}>
        {isFormVisible ? 'Masquer le formulaire' : 'Afficher le formulaire'}
      </button>
      {/* Si isFormVisible est true, affiche le formulaire */}
      {isFormVisible && (
        <form action="POST" onSubmit={handleSubmit} className="form_login">
          <button onClick={toggleFormArrow}>X</button>
          <div className="post_log_ctn">
            <div>
              <label htmlFor="">Username</label>
              <input type="text" name="login"  value={credentials.login} onChange={handleChange} />
            </div>
            <div>
            <label htmlFor="">Mot de passe</label>
              <input type="password" name="password" value={credentials.password} onChange={handleChange} />
            </div>
            <input type="submit" value="Connexion" />
          </div>
        </form>
      )}
      {message &&
        <p>{message}</p>
      }
    </>
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
        <AdminButton />
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
