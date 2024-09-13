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
          <div className="text-center mt-4">
            <span className={`px-2 py-1 rounded ${thread.type === 'QNA' ? 'bg-blue-200' : 'bg-green-200'}`}>
              {thread.type}
            </span>
          </div>
          <div className="flex flex-wrap justify-center mt-4 space-x-2">
          {thread.tags?.length ? (
            thread.tags.map(tag => (
              <span key={tag.id} className='bg-gray-200 rounded px-2 py-1'>
                {tag.name}
              </span>
            ))
          ) : (
            <span>No tags available</span>
          )}
          </div>
        </div>
      </div>
    )
  }
  
  export default ThreadCard