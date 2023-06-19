'use client'


import { FC, useState } from 'react'
import { TABS } from './Auth';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../inputs/Input';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import AuthSocialButton from './AuthSocialButton';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { toast } from "react-hot-toast";

interface RegisterProps {
  closeAuthModal: () => void;
  changeTab: (tabName: TABS) => void;
}

const Register: FC<RegisterProps> = ({
  changeTab,
  closeAuthModal
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios.post('/api/register', data)
    .then(() => signIn('credentials', {
      ...data,
      redirect: false
    }))
    .then((callback) => {
      if(callback?.error) {
        toast.error("Invalid Credentials")
      }

      if(callback?.ok) {
        closeAuthModal()
      }
    })
    .catch(() => {
      toast.error("Something went wrong!")
    })
    .finally(() => setIsLoading(false))
  }

  const socialAction = (action: string) => {
    setIsLoading(true)

    signIn(action, { redirect: false })
    .then((callback) => {
      if(callback?.error) {
        toast.error("Invalid Credentials")
      }

      if(callback?.ok) {
        closeAuthModal()
      }
    })
    .finally(() => setIsLoading(false))
  }
  return (
    <div className="w-full py-4 px-2 sm:px-6">
      <form
        className="space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id='name'
          type="text"
          label='name'
          placeholder="username"
          required
          disabled={isLoading}
          register={register}
          errors={errors}
        />
        <Input
          id='email'
          type="email"
          label='email'
          placeholder="myemail@mail.com"
          required
          disabled={isLoading}
          register={register}
          errors={errors}
        />
        <Input
          id='password'
          type="password"
          label='password'
          placeholder="password..."
          required
          disabled={isLoading}
          register={register}
          errors={errors}
        />
        <button
          type="submit"
          className="text-center flex items-center justify-center py-3 w-full outline-none border-none bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
          disabled={isLoading}
        >
          {isLoading ? <div className="w-5 h-5 rounded-full border-2 border-white border-r-0 animate-spin" /> : "Register"}
        </button>

        <div className="mt-6">
          <div className="relative">
            <div
              className="
                absolute 
                inset-0 
                flex 
                items-center
              "
            >
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
          className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          "
        >
          <div>
            Already have an account?
          </div>
          <div
            onClick={() => changeTab("LOGIN")}
            className="underline cursor-pointer"
          >
            Login
          </div>
        </div>

      </form>
    </div>
  )
}

export default Register