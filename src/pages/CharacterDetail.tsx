import { useEffect, useState } from 'react'
import type { Character } from '../interfaces/Character';
import type { Location } from '../interfaces/Location';
import '../App.css';
import { useParams } from 'react-router-dom';
import { CharaterCard } from '../character/CharacterCard';

function CharacterDetail() {
    const { id } = useParams<{ id: string }>();

    const API = `https://rickandmortyapi.com/api/character/${id}`;  

    const [character, setCharacter] = useState<Character>({} as Character);
    const [location, setLocation] = useState<Location>({} as Location);
    const [residents, setResidents] = useState<Character[]>([]);

    useEffect(()=>{
      fetch(API)
      .then(res=>{ 
        if (!res.ok) throw new Error("Error fetching data");
        return res.json();
      }).then(data =>setCharacter(data))
      .catch(error =>console.log(error))},[id])


    useEffect(()=>{
    if(character.location && character.location.url){
        fetch(character.location.url)
        .then(res=>{ 
          if (!res.ok) throw new Error("Error fetching data");
          return res.json();
        }).then(data =>setLocation(data))
        .catch(error =>console.log(error))
    }  
    },[character])

    useEffect(()=>{
        if(location.residents){
            const ids = location.residents.map(url => url.split('/').pop()).join(',');
            fetch(`https://rickandmortyapi.com/api/character/${ids}`).then(res=>{
                if (!res.ok) throw new Error("Error fetching data");
                return res.json();
            }).then(data=>{
                setResidents(data);
            })
            .catch(error =>console.log(error))  
        } },[location])

    return (
        <>
        <h1>{character && character.name}</h1>
        <div className="detailed-card">
            <div>
                <img src={character && character.image} alt={character && character.name} />
            </div>
            <div>
                <div>
                    <p>Epecies: {character && character.species}</p>
                    <p>Origin: {character.origin && character.origin.name}</p>
                    <p>State: {character && character.status}</p>
                    <p>Type: {character && character.type}</p>
                    <p>Gender: {character && character.gender}</p>
                    <p>Location: {character.location && character.location.name}</p>
                    <p>Number of residents in the location: {location && location.residents ? location.residents.length : 0}</p>
                </div> 
            </div>
        </div>
        <h3>Residents</h3>
        <div className='resident-list'>
            {residents && residents.map(character => (
                    character.id.toString()!=id && <CharaterCard key={character.id} {...character} />
                    ))}
        </div>
        </>
    )

}

export default CharacterDetail;