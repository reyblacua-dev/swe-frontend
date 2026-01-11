import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CharacterList from './pages/CharacterList';
import CharacterDetail from './pages/CharacterDetail';
import CommentsProvider from './providers/CharacterCommentProvider';

function App() {

  return (
    <>
    <CommentsProvider>
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </BrowserRouter>
    </CommentsProvider>
    </>
  )
}

export default App
