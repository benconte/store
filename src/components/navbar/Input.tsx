'use client'

import { FC } from 'react'
import { FieldErrors, FieldValues, UseFormRegister, SubmitHandler, useForm } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';

interface InputProps {
  id: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}

const Input: FC<InputProps> = ({
    id,
    type,
    required,
    placeholder,
}) => {
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            search: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {

    } 
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex h-9 w-full items-center'>
        <input 
            id={id}
            type={type}
            required={required}
            {...register(id, { required })}
            placeholder={placeholder}
            className='w-full h-full border-none outline-none px-4 rounded-l-md'
        />
        <div className='h-full rounded-r-md bg-[#F9B96E] flex items-center justify-center px-4'>
            <SearchIcon className="w-8 h-8 text-gray-900" />
        </div>
    </form>
  )
}

export default Input