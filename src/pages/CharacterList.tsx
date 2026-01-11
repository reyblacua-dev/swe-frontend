import { useEffect, useState } from 'react'
import { CharaterCard } from '../services/CharacterCard/CharacterCard';
import type { Character } from '../interfaces/Character';
import '../App.css';
import CharaterSearch from '../services/CharacterSearch/CharacterSearch';

function CharacterList() {

  const API = "https://rickandmortyapi.com/api/character"  

  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(()=>{
    fetch(API)
    .then(res=>{  
        if (!res.ok) throw new Error("Error fetching data"); 
        let result =res.json();
        return result;
    }
    ).then(data=> setCharacters(data.results))
    .catch(err=>console.log(err))
  
  },[]);

  const handleResults = (characters: Character[]) => {
    setCharacters(characters);
  };

  return (
    <>
      <h1>Ricky Morty's Characters</h1>
      
      <CharaterSearch onResultsFound={handleResults}/>

      <div>
      {characters && characters.map(character => (
        <CharaterCard key={character.id} {...character} />
        ))}
      </div>

    </>
  )
}
export default CharacterList
