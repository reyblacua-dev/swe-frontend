import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CharacterList from './pages/CharacterList';
import CharacterDetail from './pages/CharacterDetail';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
