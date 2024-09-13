'use client'
import React, { useEffect, useState } from 'react'
import CreateThread from '@/components/CreateThread'
import ThreadCard from '@/components/ThreadCard'
import Navbar from '@/components/Navbar'

function Page() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [searchTag, setSearchTag] = useState('');

  useEffect(() => {
    const savedThreads = JSON.parse(localStorage.getItem('threads') || '[]')
    setThreads(savedThreads)
  }, []);

  const handleCreate = (newThread: Thread) => {
    const updatedThreads = [newThread, ...threads]
    setThreads(updatedThreads)
    localStorage.setItem('threads', JSON.stringify(updatedThreads))
  }

  const handleSearch = (searchTerm: string) => {
    setSearchTag(searchTerm);
  }

  const filteredThreads = threads.filter(thread =>
    thread.tags?.some(tag => tag.name.toLowerCase().includes(searchTag.toLowerCase()))
  );

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <CreateThread onCreate={handleCreate} />
      <div>
        {filteredThreads.map(thread => (
          <ThreadCard key={thread.id} thread={thread} />
        ))}
      </div>
    </>
  )
}

export default Page