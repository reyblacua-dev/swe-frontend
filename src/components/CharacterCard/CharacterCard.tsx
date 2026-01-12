import type { Character } from '../../interfaces/Character';
import { Link } from 'react-router-dom';
import { CommentCard } from '../Comment/CommentCard';
import { useComments } from '../../contexts/CharacterCommentProvider';

import './CharacterCard.css';

export function CharaterCard(character:Character) {
    
    const { comments, addComment } = useComments();

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
                        <p>Location: {character.location && character.location.name}</p>
                        <CommentCard comment={comments[character.id]? comments[character.id]:"No comments yet"} />
                    </div>

                </div>
            </div>
        </Link>
    </>
  )
}
