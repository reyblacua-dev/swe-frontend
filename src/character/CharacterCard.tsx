import type { Character } from '../interfaces/Character';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import { Link } from 'react-router-dom';

export function CharaterCard(character:Character) {

    return (
    <>
            <div key={character.id} className="character-card">
                <div>
                    <img src={character.image} alt={character.name} />
                </div>
                <div>
                    <h4>{character.name}</h4>
                    <div>
                        <p>Especie: {character.species && character.species}</p>
                        <p>Origen: {character.origin && character.origin.name}</p>
                    </div>

                </div>
            </div>
    </>
  )
}
