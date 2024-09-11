"use client"
import { useAuth, useUser } from '@clerk/nextjs'
import React, { useState } from 'react'

interface CommentSectionProps {
  thread: Thread | QNAThread;
  onAddComment: (comment: Comment) => void;
  onMarkAsAnswer: (commentId: number) => void; // Add this prop
}

function CommentSection({ thread, onAddComment, onMarkAsAnswer }: CommentSectionProps): JSX.Element {
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  const [commentText, setCommentText] = useState("")

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentText.trim()) return

    const newComment: Comment = {
      id: Date.now(),
      username: user?.fullName || user?.emailAddresses[0].emailAddress || 'Anonymous',
      content: commentText,
      createdAt: new Date().toISOString(),
    };

    onAddComment(newComment)
    setCommentText("")
  };

  return (
    <div>
      {!isSignedIn ? (
        <div className="flex items-center justify-center p-20">
          <p className="text-center text-2xl">You must be signed in to comment on this thread.</p>
        </div>
      ) : thread.locked ? (
        <div className="flex items-center justify-center p-20">
          <p className="text-center text-2xl">This thread is locked. No new comments can be added.</p>
        </div>
      ) : (
        <div className="">
          <form onSubmit={handleAddComment}>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full p-2 rounded border-gray-300"
              rows={3}
              placeholder="Skriv en kommentar..."
              required
            />
            <button type="submit" className='bg-gray-600 text-white hover:bg-gray-700 rounded w-full my-4'>
              Lägg till
            </button>
          </form>
        </div>
      )}

      {Array.isArray(thread.comments) && thread.comments.length > 0 ? (
        thread.comments.map((comment) => (
          <div key={comment.id} className="border-b p-2">
            <p className='text-purple-800'><strong>{comment.username}</strong>: {comment.content}</p>
            <p><small>{new Date(comment.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</small></p>
            {thread.type === 'QNA' && !thread.isAnswered && (
              <button
                className='bg-blue-600 text-white hover:bg-blue-700 rounded my-2'
                onClick={() => onMarkAsAnswer(comment.id)}
              >
                Mark as Answer
              </button>
            )}
            {comment.isAnswer && <p className='text-green-500'>Accepted Answer</p>}
          </div>
        ))
      ) : (
        <p>Inga kommentarer än.</p>
      )}
    </div>
  )
}

export default CommentSection
