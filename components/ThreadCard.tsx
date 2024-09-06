import React from 'react'
import { useRouter } from 'next/navigation'

interface ThreadCardProps {
  thread: Thread
}

const ThreadCard = ({ thread }: ThreadCardProps): JSX.Element => {
    const router = useRouter()

    const handleClick = () => {
        router.push(`/post/${thread.id}`)
    };

    return (
        <div className="flex items-center justify-center m-8 text-black">
        <div onClick={handleClick} className="w-full max-w-lg p-6 bg-white border rounded-xl shadow-lg space-y-4 cursor-pointer">
            <div className='text-center font-bold text-lg underline'>{thread.title}</div>
            <p className='text-center'>{thread.description}</p>
            <div className="flex justify-between mt-8">
                <p className='text-sm'>{thread.username}</p>
                <p className='text-sm'>{thread.creationDate}</p>
            </div>
        </div>
        </div>
    );
};

export default ThreadCard