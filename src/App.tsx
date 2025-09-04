import {BrowserRouter, Link, Route, Routes} from 'react-router';
import './App.css'
import HomePage from './pages/HomePage';
import CreateStagiaire from './pages/CreateStagiaire/CreateStagiaire';

function App() {


  return (
    <>
      <BrowserRouter>
        <header>
          <h1>AFPA Vote</h1>
          <nav>
            <Link to="/createstagiaire">Create Stagiaire</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/createstagiaire" element={<CreateStagiaire/>}/>
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App
