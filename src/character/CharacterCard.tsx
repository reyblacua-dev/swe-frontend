import type { Character } from '../interfaces/Character';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import { Link } from 'react-router-dom';

export function CharaterCard(character:Character) {

    return (
    <>
        <Link to={`/character/${character.id}`} className='noStyledLink'>  
            <div key={character.id} className="character-card">
                <div>
                    <img src={character.image} alt={character.name} />
                </div>
                <div>
                    <h4>{character.name}</h4>
                    <div>
                        <p>Species: {character.species && character.species}</p>
                        <p>Origin: {character.origin && character.origin.name}</p>
                    </div>

                </div>
            </div>
        </Link>
    </>
  )
}
