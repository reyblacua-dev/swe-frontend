import { useState } from 'react';
import { useComments } from '../../providers/CharacterCommentProvider';
import { CommentCard } from '../Comment/CommentCard';
import type { Character } from '../../interfaces/Character';
import './CharacterCommentSection.css'

export default function CharacterCommentSection({ character }: { character: Character }) {

    
    const { comments, addComment } = useComments();
    const characterComment = comments[character.id];
    
    const [inputText, setInputText] = useState(character.id ? comments[character.id] || "" : "");

    const handleSave = () => {
        addComment(character.id, inputText);
    };


    return (
    <> 
        <h2>Comments</h2>
        <div className='comment-section'>
            <textarea
            placeholder="Write a comment..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className='comment-textarea'
            />
            <button 
            onClick={handleSave}
            className='primary-button'>
            {comments[character.id] ? 'Update Comment' : 'Publish'}
            </button>
        </div>
        {characterComment && 
        <div className="comment-card">
            <CommentCard comment={characterComment} />
        </div>
        }
    </>
  )
}