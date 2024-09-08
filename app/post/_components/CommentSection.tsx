"use client";
import { useAuth, useUser } from '@clerk/nextjs';
import React, { useState } from 'react';

interface CommentSectionProps {
  thread: Thread;
  onAddComment: (comment: Comment) => void;
}

function CommentSection({ thread, onAddComment }: CommentSectionProps): JSX.Element {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [commentText, setCommentText] = useState("");
  
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      username: user?.username || `${user?.firstName} ${user?.lastName}` || 'Anonymous',
      content: commentText,
      createdAt: new Date().toISOString(),
    };

    onAddComment(newComment);
    setCommentText("");
  };

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center p-20">
        <p className="text-center text-2xl">You must be signed in to comment on this thread.</p>
      </div>
    );
  }

  return (
    <div>
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
          <button type="submit"
           className='bg-gray-600 text-white hover:bg-gray-700 rounded w-full my-4'>
            Lägg till
          </button>
        </form>
      </div>
      
      {Array.isArray(thread.comments) && thread.comments.length > 0 ? (
        thread.comments.map((comment) => (
          <div key={comment.id} className="border-b p-2">
            <p><strong>{comment.username}</strong>: {comment.content}</p>
            <p><small>{new Date(comment.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</small></p>
          </div>
        ))
      ) : (
        <p>Inga kommentarer än.</p>
      )}
      
    </div>
  );
}

export default CommentSection;