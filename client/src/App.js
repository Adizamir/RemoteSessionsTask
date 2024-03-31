
import './App.css';
import LobbyPage from './pages/LobbyPage';
import CodeBlockPage from './pages/CodeBlockPage';
import { Route, Routes } from 'react-router-dom';

function App() {
  

  return (
    <div className="App">
      <Routes>
        <Route  exact path="/" element={<LobbyPage/>} />
        <Route path="/code-block-page/:id" element={<CodeBlockPage/>} />
     </Routes>
    </div>
  );
}

export default App;

