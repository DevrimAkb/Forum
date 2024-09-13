"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from 'react'
import CommentSection from "./CommentSection"
import { useUser } from "@clerk/nextjs"

const ThreadDetail = () => {
    const { id } = useParams()
    const { user } = useUser()
    const [post, setPost] = useState<Thread | QNAThread | null>(null)

    useEffect(() => {
        if (id) {
            const threads: Thread[] = JSON.parse(localStorage.getItem('threads') || '[]')
            const foundPost = threads.find((thread) => thread.id === parseInt(id as string))

            if (foundPost) {
                foundPost.comments = foundPost.comments || []
            }

            setPost(foundPost || null)
        }
    }, [id])

    const handleAddComment = (newComment: Comment) => {
        if (!post) return

        const updatedPost: Thread = {
            ...post,
            comments: [...post.comments, newComment]
        }
        setPost(updatedPost)

        const threads: Thread[] = JSON.parse(localStorage.getItem('threads') || '[]');
        const updatedThreads = threads.map((thread) =>
            thread.id === updatedPost.id ? updatedPost : thread
        )
        localStorage.setItem('threads', JSON.stringify(updatedThreads))
    }

    const handleMarkAsAnswer = (commentId: number) => {
        if (!post || !isQNAThread(post)) return

        const updatedPost: QNAThread = {
            ...post,
            isAnswered: true,
            acceptedAnswerId: commentId,
            comments: post.comments.map(comment =>
                comment.id === commentId ? { ...comment, isAnswer: true } : comment
            )
        }
        setPost(updatedPost)

        const threads: Thread[] = JSON.parse(localStorage.getItem('threads') || '[]');
        const updatedThreads = threads.map((thread) =>
            thread.id === updatedPost.id ? updatedPost : thread
        )
        localStorage.setItem('threads', JSON.stringify(updatedThreads))
    }

    const handleLockToggle = () => {
        if (!post) return

        const updatedPost: Thread = {
            ...post,
            locked: !post.locked
        }
        setPost(updatedPost)

        const threads: Thread[] = JSON.parse(localStorage.getItem('threads') || '[]');
        const updatedThreads = threads.map((thread) =>
            thread.id === updatedPost.id ? updatedPost : thread
        )
        localStorage.setItem('threads', JSON.stringify(updatedThreads))
    }

    if (!post) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex items-center justify-center m-8 text-black">
            <div className="w-full max-w-lg p-6 bg-white border rounded-xl shadow-lg space-y-4">
                <div className="py-6">
                    <h1 className="font-bold text-lg mb-4 flex items-center justify-center ">{post.title}</h1>
                    <p className="flex items-center justify-center">{post.description}</p>
                </div>
                <div className="flex justify-between items-center mb-5">
                    <p className="text-sm">{post.username}</p>
                    <p className="text-sm">{post.creationDate}</p>
                </div>
                <div className="text-center mt-4">
                    <span className={`px-2 py-1 rounded ${post.type === 'QNA' ? 'bg-blue-200' : 'bg-green-200'}`}>
                        {post.type}
                    </span>
                </div>
                <div className="flex flex-wrap justify-center mt-4 space-x-2">
                    {post.tags.map(tag => (
                        <span key={tag.id} className='bg-gray-200 rounded px-2 py-1'>
                            {tag.name}
                        </span>
                    ))}
                </div>
                {user?.fullName === post.username || user?.emailAddresses[0].emailAddress === post.username ? (
                    <button
                        className='bg-gray-600 text-white hover:bg-gray-700 rounded w-full my-4'
                        onClick={handleLockToggle}
                    >
                        {post.locked ? 'Unlock Thread' : 'Lock Thread'}
                    </button>
                ) : null}
                <CommentSection thread={post} onAddComment={handleAddComment} onMarkAsAnswer={handleMarkAsAnswer}/>
            </div>
        </div>
    );
};

export default ThreadDetail

// Type guarding

function isQNAThread(thread: Thread | QNAThread): thread is QNAThread {
    return thread.type === 'QNA';
}