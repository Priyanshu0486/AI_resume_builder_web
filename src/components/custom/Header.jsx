import React from 'react'

import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Button } from '../ui/button';

function Header() {
    const { user, isSignedIn } = useUser();
    return (
        <div className='p-3 px-5 flex justify-between shadow-md'>
             <Link to={'/dashboard'}>
            <img src='/logo.svg' className='cursor-pointer' width={100} height={100} />
            </Link>
            {isSignedIn ?
                <div className='flex gap-2 items-center'>
                    <Link to={'/dashboard'}>
                        <Button 
                          variant="outline" 
                          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-purple-500 border-none transition-all duration-300 font-medium rounded-md px-4 py-2 shadow-sm hover:shadow-lg"
                        >
                          Dashboard
                        </Button>
                    </Link>
                    <UserButton />
                </div> :
                <Link to={'/auth/sign-in'}>
                    <Button>Get Started</Button>
                </Link>
            }

        </div>
    )
}

export default Header