'use client'

import { FC } from 'react'
import Input from "./Input"
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import Options from './Options'

const NavOptions = () => {
    return (
        <div className='hidden lg:flex items-center justify-between border-t border-solid border-gray-700 gap-24 py-2 w-full'>
            <h1 className='font-medium text-white text-3xl'>Store.</h1>
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