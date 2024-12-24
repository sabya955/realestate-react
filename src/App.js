// import logo from './logo.svg';
import './App.css';
import HomePage from'./components/home';
import NavBar from './components/header';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <HomePage />
      </header>
    </div>
  );
}

export default App;
