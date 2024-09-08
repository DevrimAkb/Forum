'use client'
import React, { useEffect, useState } from 'react'
import CreateThread from '@/components/CreateThread'
import ThreadCard from '@/components/ThreadCard';

function Page() {
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    const savedThreads = JSON.parse(localStorage.getItem('threads') || '[]')
    setThreads(savedThreads)
  }, []);

  const handleCreate = (newThread: Thread) => {
    const updatedThreads = [newThread, ...threads]
    setThreads(updatedThreads)
    localStorage.setItem('threads', JSON.stringify(updatedThreads))
  }

  return (
    <>
      <CreateThread onCreate={handleCreate}/>
      <div>
        {threads.map(thread => (
          <ThreadCard key={thread.id} thread={thread}/>    
        ))}
      </div>
    
    </>
  )
}

export default Page