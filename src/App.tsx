import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CharacterList from './views/CharacterList/CharacterList';
import CharacterDetail from './views/CharacterDetail/CharacterDetail';
import CommentsProvider from './contexts/CharacterCommentProvider';

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
