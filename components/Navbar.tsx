'use client'

import { SignOutButton, useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import React, { useState } from 'react'

interface NavbarProps {
  onSearch: (searchTerm: string) => void;
}

const Navbar = ({ onSearch }: NavbarProps): JSX.Element => {
  const {isSignedIn} = useAuth()
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      onSearch(e.target.value);
  };
  if(isSignedIn) {
    return(
      <div className="flex justify-between p-4">
        <div>
          <Link href="/">Devvan</Link>
        </div>
        <div className="flex">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by tag"
            className="rounded border border-gray-300 p-2 text-black"
          />
          <SignOutButton />
        </div>
      </div>
    )
  }
  return (
    <div className='flex justify-between p-4'>
        <div>
            <Link href="/">Devvan</Link>
        </div>
        <div className="flex gap-4">
            <Link href="/sign-up">Sign up</Link>
            <Link href="/sign-in">Sign in</Link>
        </div>
    </div>
  )
}

export default Navbar