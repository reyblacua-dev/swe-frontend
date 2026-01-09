import { useEffect, useState } from 'react'
import { CharaterCard } from '../character/CharacterCard';
import type { Character } from '../interfaces/Character';
import '../App.css';

function CharacterList() {

  const API = "https://rickandmortyapi.com/api/character"  

  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(()=>{
    fetch(API)
    .then(res=>{  
      if (!res.ok) throw new Error("Error fetching data"); 
     let result =res.json();
      console.log(result);
     return result;
    }
    ).then(data=> setCharacters(data.results))
    .catch(err=>console.log(err))
  
  },[]);

  return (
    <>
      <h1>Personajes de Ricky Morty</h1>

      <div>
      {characters && characters.map(character => (
        <CharaterCard key={character.id} {...character} />
        ))}
      </div>

    </>
  )
}
export default CharacterList
