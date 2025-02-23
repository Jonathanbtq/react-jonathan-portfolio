
import { useState } from 'react'
import { Cookies, useCookies } from 'react-cookie';
import { NavLink } from 'react-router-dom';

const Login = () => {
    // État pour gérer la visibilité du formulaire
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [credentials, setCredentials] = useState({
      login: '',
      password: ''
    });
    const [message, setMessage] = useState('');
  
    const currentUrl = window.location.href;

    // Fonction pour basculer la visibilité du formulaire
    const toggleForm = () => {
      setIsFormVisible(!isFormVisible);
    };
  
    const toggleFormArrow = () => {
      setIsFormVisible(!isFormVisible);
      setMessage('');
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
  
      fetch('http://localhost:3500/login', {
        method: 'POST',
        credentials: 'include',  // Permet d'envoyer les cookies avec la requête
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
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
            // { path: '/' } : Le cookie est accessible sur toutes les pages du site.
            const user = data.user;
            const cookies = new Cookies();
            cookies.set('user', user, { path: '/', expires: new Date(Date.now() + 86400000)});
            setMessage('Connexion réussi');
            setIsFormVisible(false);
        })
        .catch((error) => {
        console.error('Une erreur est survenue lors de la requête de connexion', error)
        })
    }

    // Vérifie si l'utilisateur est connecté via le cookie
    const isLoggedIn = cookies.user;

    return (
      <>
        {isLoggedIn ? (
          <NavLink to="/admin" className="atxt">
            Admin
          </NavLink>
        ) : (
          <button onClick={toggleForm} className="atxt">
            {isLoggedIn ? 'Admin' : 'Login'}
          </button>
        )}

        {/* Si isFormVisible est true, affiche le formulaire */}
        {isFormVisible && !isLoggedIn && (
          <form action="POST" onSubmit={handleSubmit} className="form_login">
            {message &&
                <p className="msgerror">{message}</p>
            }
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
      </>
    )
}

export default Login;