import { NavLink, useHistory } from 'react-router-dom';
import './App.css';
import Routes from './routes';
import { logout } from './Services/utils';

function App() {

    const history = useHistory();

    function handleLogout() {
        logout();
        history.push("/");
    }

  return (
    <div className='App'>
      <Routes />
    </div>
  );
}

export default App;
