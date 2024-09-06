"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from 'react';
import CommentSection from "./CommentSection";

const ThreadDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState<Thread | null>(null);

    useEffect(() => {
        if (id) {
            const threads: Thread[] = JSON.parse(localStorage.getItem('threads') || '[]');
            const foundPost = threads.find((thread) => thread.id === parseInt(id as string));

            
            if (foundPost) {
                foundPost.comments = foundPost.comments || [];
            }

            setPost(foundPost || null);
        }
    }, [id]);

    const handleAddComment = (newComment: Comment) => {
        if (!post) return;

        const updatedPost: Thread = {
            ...post,
            comments: [...post.comments, newComment]
        };

        setPost(updatedPost);

        const threads: Thread[] = JSON.parse(localStorage.getItem('threads') || '[]');
        const updatedThreads = threads.map((thread) =>
            thread.id === updatedPost.id ? updatedPost : thread
        );

        localStorage.setItem('threads', JSON.stringify(updatedThreads));
    };

    if (!post) {
        return <div>Loading...</div>;
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
            <CommentSection thread={post} onAddComment={handleAddComment} />
        </div>
        </div>
    );
};

export default ThreadDetail;
