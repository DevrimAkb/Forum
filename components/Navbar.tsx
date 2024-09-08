'use client'

import { SignOutButton, useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

function Navbar() {
  const {isSignedIn} = useAuth()
  if(isSignedIn) {
    return <SignOutButton />
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