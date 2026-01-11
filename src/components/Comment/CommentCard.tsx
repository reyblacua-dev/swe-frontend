
export function CommentCard({ comment }: { comment: string }) {

    if (!comment) return null; 

    return (
    <> 
        <p>Last Comment: "{comment}"</p>
    </>
  )
}