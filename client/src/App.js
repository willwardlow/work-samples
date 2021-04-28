import './App.css';

//Package Imports
import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

//Functional imports
import { loginUser, registerUser, removeToken, verifyUser } from './services/auth';
import Layout from './components/Layout/Layout';
import Register from './screens/Register/Register';
import Login from './screens/Login/Login';
import Landing from './screens/Landing/Landing';
import MainContainer from './containers/MainContainer';

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const handleVerify = async () => {
      const userData = await verifyUser();
      setCurrentUser(userData);
    }
    handleVerify();
  }, [])

  const handleLogin = async (formData) => {
    const userData = await loginUser(formData);
    setCurrentUser(userData);
    history.push('/home');
  }

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('authToken');
    removeToken();
    history.push('/');
  }

  const handleRegister = async (formData) => {
    const userData = await registerUser(formData);
    setCurrentUser(userData);
    history.push('/home');
  }

  return (
    <div className="App">
      <Layout >
        <Switch>
          <Route path='/register'>
            <Register handleRegister={handleRegister}/>
          </Route>

          <Route path='/login'>
            <Login handleLogin={handleLogin}/>
          </Route>

          <Route path='/orgs'>
            <MainContainer handleLogout={handleLogout} currentUser={currentUser}/>
          </Route>

          <Route path='/'>
            <Landing />
          </Route>


        </Switch>
      </Layout>
    </div>
  );
}

export default App;
