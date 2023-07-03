'use client'

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCallback, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/components/inputs/Input';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import AuthSocialButton from '@/components/auth/AuthSocialButton';
import { signIn, useSession } from 'next-auth/react';
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useSearchParams } from 'next/navigation'

type Variant = 'LOGIN' | 'REGISTER';

const Auth = () => {
    const session = useSession();
    const searchParams = useSearchParams()
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (session?.status === 'authenticated') {
            // Redirect to the previous page or a default route
            const callbackUrl = searchParams.get('callbackUrl') || '/';
            router.push(callbackUrl);
        }
    }, [session?.status, router, searchParams]);

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN');
        }
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        if (variant === 'REGISTER') {
            axios.post('/api/register', data)
                .then(() => signIn('credentials', {
                    ...data,
                    redirect: false,
                }))
                .then((callback) => {
                    if (callback?.error) {
                        toast.error('Invalid credentials!', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light"
                        });
                    } else if (callback?.ok) {
                        toast.success('Account created successfully!', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light"
                        });

                        // Redirect to the previous page or a default route
                        const callbackUrl = searchParams.get('callbackUrl') || '/'; // Use callbackUrl from query parameter if available
                        router.push(callbackUrl);

                    } else {
                        toast.error('Invalid credentials!', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light"
                        });
                    }
                })
                .catch(() => toast.error('Invalid credentials!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                }))
                .finally(() => setIsLoading(false))
        }

        if (variant === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false
            })
                .then((callback) => {
                    if (callback?.error) {
                        toast.error('Invalid credentials!', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light"
                        });
                    } else if (callback?.ok) {
                        toast.success('Logged in successfuly!', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light"
                        });

                        // Redirect to the previous page or a default route
                        // Use callbackUrl from query parameter if available
                        const callbackUrl = searchParams.get('callbackUrl') || '/';
                        router.push(callbackUrl);

                    } else {
                        toast.error('Invalid credentials!', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light"
                        });
                    }
                })
                .finally(() => setIsLoading(false))
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true)

        signIn(action, { redirect: false })
            .then((callback) => {
                if (callback?.error) {
                    toast.error("Invalid Credentials", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                    })
                }

                if (callback?.ok) {
                    toast.success("Logged in successfully", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                    });

                    // Redirect to the previous page or a default route
                    const callbackUrl = searchParams.get('callbackUrl') || '/'; // Use callbackUrl from query parameter if available
                    router.push(callbackUrl);
                }
            })
            .finally(() => setIsLoading(false))
    }
    return (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
            <div className="sm:mx-auto sm:w-full sm:max-w-md flex items-center gap-3 justify-center">
                <AddShoppingCartIcon className="w-8 h-8 text-darkYellow cursor-pointer" />
                <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div
                    className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10"
                >
                    <form
                        className="space-y-6"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {variant === 'REGISTER' && (
                            <Input
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                                required
                                id="name"
                                label="Name"
                                placeholder='Username'
                            />
                        )}
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
                            id="password"
                            label="Password"
                            type="password"
                            placeholder='password...'
                        />
                        <div>

                            {variant === "LOGIN" ? (
                                <button
                                    type="submit"
                                    className="text-center flex items-center justify-center py-3 w-full outline-none border-none bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
                                    disabled={isLoading}
                                >
                                    {isLoading ? <div className="w-5 h-5 rounded-full border-2 border-white border-r-0 animate-spin" /> : "Login"}
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="text-center flex items-center justify-center py-3 w-full outline-none border-none bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
                                    disabled={isLoading}
                                >
                                    {isLoading ? <div className="w-5 h-5 rounded-full border-2 border-white border-r-0 animate-spin" /> : "Register"}
                                </button>
                            )}

                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-2">
                            <AuthSocialButton
                                icon={GitHubIcon}
                                onClick={() => socialAction('github')}
                            />
                            <AuthSocialButton
                                icon={GoogleIcon}
                                onClick={() => socialAction('google')}
                            />
                        </div>
                    </div>
                    <div
                        className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                        <div>
                            {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
                        </div>
                        <div
                            onClick={toggleVariant}
                            className="underline cursor-pointer"
                        >
                            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;
