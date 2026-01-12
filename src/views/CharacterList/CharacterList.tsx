import { useEffect, useState } from 'react'
import type { Character } from '../../interfaces/Character';
import CharaterSearch from '../../components/CharacterSearch/CharacterSearch';
import { CharaterCard } from '../../components/CharacterCard/CharacterCard';
import { characterApi } from '../../api/characterApi';

import './CharacterList.css';

function CharacterList() {

  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(()=>{
    const fetchAll = async () => {
      try {
        let results = [];
        
        const data = await characterApi.getCharacters({});
        results = data.results || [];

        setCharacters(results);
      } catch (err) {
        console.log("Error fetching characters:", err);
        setCharacters([]);
      }
    };

    // Debounce de 500ms para no saturar la API mientras el usuario escribe
    const timeoutId = setTimeout(fetchAll, 500);
    return () => clearTimeout(timeoutId);
  
  },[]);

  const handleResults = (characters: Character[]) => {
    setCharacters(characters);
  };

  return (
    <>
      <h1>Ricky Morty's Characters</h1>
      
      <CharaterSearch onResultsFound={handleResults}/>

      <div className='character-list'>
      {characters && characters.map(character => (
        <CharaterCard key={character.id} {...character} />
        ))}
      </div>

    </>
  )
}
export default CharacterList;
