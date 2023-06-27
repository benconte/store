'use client'

import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/components/inputs/Input';

const Form = () => {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            firstname: '',
            lastname: '',
            address: '',
            phonenumber: '',
            message: '',
        }
    });
    const onSubmit: SubmitHandler<FieldValues> = () => {
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
            reset()
        }, 5000)
    }
    return (
        <div className="flex min-h-auto flex-col justify-start py-5 sm:px-6 lg:px-8 bg-white">
            <div className="sm:mx-auto sm:w-full sm:max-w-md flex items-center gap-3 px-4">
                <h2 className="text-center text-xl font-bold tracking-tight text-gray-900">
                    Contact Us
                </h2>
            </div>

            <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-lg">
                <div
                    className="bg-white px-4 sm:rounded-lg sm:px-10"
                >
                    <form
                        className="space-y-6"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-col md:flex-row md:gap-3">
                            <Input
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                                required
                                id="firstname"
                                label="First Name"
                                placeholder='firstname...'
                            />
                            <Input
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                                required
                                id="lastname"
                                label="Last Name"
                                placeholder='lastname...'
                            />
                        </div>
                        <Input
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                            id="email"
                            label="Email address"
                            type="email"
                            placeholder='Youremail@mail.com'
                        />
                        <Input
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                            id="address"
                            label="address"
                            placeholder='address...'
                        />
                        <Input
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                            id="phonenumber"
                            label="Phonenumber"
                            placeholder='address...'
                            type="number"
                        />
                        <div>
                            <label htmlFor="message"
                                className="block text-sm font-medium leading-6 text-gray-500 capitalize">
                                Message
                            </label>
                            <textarea id="message" name='message' className='form-input block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 outline-none ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-darkYellow sm:text-sm sm:leading-6
                        ' placeholder='Type your message'>
                            </textarea>
                        </div>
                        <button
                            type="submit"
                            className="text-center flex items-center justify-center py-3 w-full outline-none border-none bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
                            disabled={isLoading}
                        >
                            {isLoading ? <div className="w-5 h-5 rounded-full border-2 border-white border-r-0 animate-spin" /> : "Send"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form;
