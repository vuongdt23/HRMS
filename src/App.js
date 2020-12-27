import logo from './logo.svg';
import './App.css';
import Main from './components/MainComponent';
import {BrowserRouter} from 'react-router-dom';
import EmployeesView from './components/EmployeesViewComponent';
function App () {
  return (
    <div className="App">
      <BrowserRouter>
       <Main/>
      </BrowserRouter>
    </div>
  );
}

export default App;
