'use client'

import { FC } from 'react'
import Input from "./Input"
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import Options from './Options'
import Link from 'next/link'

const NavOptions = () => {
    return (
        <div className='hidden lg:flex items-center justify-between border-t border-solid border-gray-700 gap-24 py-2 w-full'>
            <Link href="/" className='no-underline p-0'>
                <h1 className='font-medium text-white text-3xl'>Store.</h1>
            </Link>
            <Input
                id='search'
                type='search'
                placeholder='Enter a search...'
                required
            />
            <Options />
        </div>
    )
}

export default NavOptions