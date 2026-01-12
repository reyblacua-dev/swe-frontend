import { useEffect, useState } from 'react'
import type { Character } from '../../interfaces/Character';
import type { Location } from '../../interfaces/Location';
import { useParams } from 'react-router-dom';
import { CharaterCard } from '../../components/CharacterCard/CharacterCard';
import CharacterCommentSection from '../../components/CharacterCommentSection/CharacterCommentSection';
import { characterApi } from '../../api/characterApi';

import './CharacterDetail.css';

function CharacterDetail() {
    const { id } = useParams<{ id: string }>();

    const [character, setCharacter] = useState<Character>({} as Character);
    const [location, setLocation] = useState<Location>({} as Location);
    const [residents, setResidents] = useState<Character[]>([]);

    useEffect(()=>{
        if (!id) throw new Error("Error fetching data");
        const fetchOneCharacter = async () => {
            try{
                let result = await characterApi.getCharacterByIds(id);
                setCharacter(result);
            }catch(error){  
                console.log("Error fetching character by ID:", error);        
            }
        }

        fetchOneCharacter();
        },[id])


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

            const fetchCharacters = async () => {
                try{
                    let results = await characterApi.getCharacterByIds(ids);
                    setResidents(results);
                }catch(error){  
                    console.log("Error fetching character by ID:", error);        
                }
            }

            fetchCharacters();
        } 
    },[location])

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

        <CharacterCommentSection key={character.id}  character={character} />

        <h2>Residents</h2>
        <div className='resident-list'>
            {residents && residents.map(character => (
                    character.id.toString()!=id && <CharaterCard key={character.id} {...character} />
                    ))}
        </div>
        </>
    )

}

export default CharacterDetail;