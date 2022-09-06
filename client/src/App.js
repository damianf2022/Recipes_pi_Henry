import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Landing from './componentes/Landing'
import Home from './componentes/Home'
import Detail from './componentes/Detail'
import Form from './componentes/Form'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path = '/' component = {Landing}/>
        <Route path = '/home' component = {Home}/>
        <Route path='/recipes/:id' component = {Detail}/>
        <Route path = '/recipes' component = {Form}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
