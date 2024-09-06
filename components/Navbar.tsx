import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <div className='flex justify-between'>
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