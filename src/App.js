import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import Header from './components/Header/Header';
import RegistrationForm from './components/RegistrationForm/RegistrationForm'
import Eventos from './components/Eventos/Eventos';
import EventCreator from './components/EventCreator/EventCreator';
import { LoginProvider } from './context/LoginContext'

function App() {

  return (
    <Router>
      <LoginProvider>
        <div className="App">
          <Header/>
          <div className="container d-flex align-itens-center flex-column">
            <Switch>
              <Route path="/" exact={true}>
                <RegistrationForm/>
              </Route>
              <Route path="/eventos">
                <Eventos/>
              </Route>
              <Route>
                <EventCreator/>
              </Route>
            </Switch>
          </div>
        </div>
      </LoginProvider>
    </Router>
  );
}

export default App;
