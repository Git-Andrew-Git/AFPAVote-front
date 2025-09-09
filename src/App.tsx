import {BrowserRouter, Link, Route, Routes} from 'react-router';
import './App.css'
import HomePage from './pages/HomePage';
import CreateStagiaire from './pages/CreateStagiaire/CreateStagiaire';
import CreateSession from './pages/CreateSession/CreateSession';
import CreateBinome from './pages/CreateBinome/CreateBinome';

function App() {


  return (
    <>
      <BrowserRouter>
        <header>
          <h1>AFPA Vote</h1>
          <nav>
            <Link to="/createstagiaire">Create Stagiaire</Link>
            <Link to="/createsession">Create Session</Link>
            <Link to="/createbinome">Create Binome</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/createstagiaire" element={<CreateStagiaire />} />
            <Route path="/createsession" element={<CreateSession />} />
            <Route path="/createbinome" element={<CreateBinome />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App
