'use client'

import { FC, useState } from 'react'
import ImageIcon from '@mui/icons-material/Image';
import Image from "next/image"
import CloseIcon from '@mui/icons-material/Close';
import { User } from '@prisma/client'
import Input from '../inputs/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { CldUploadButton } from 'next-cloudinary';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

interface ProfileProps {
    user: User
}

const Profile: FC<ProfileProps> = ({ user }) => {
    const [image, setImage] = useState(null);
    const [isChangePassword, setIsChangePassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: user?.name,
            email: user?.email,
            image: image,
            oldPassword: null,
            newPassword: null,
            confirmPassword: null,
        }
    });

    const handleUpload = (result: any) => {
        setValue('image', result.info.secure_url, {
            shouldValidate: true
        });
        setImage(result.info.secure_url)
    }
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        if (isChangePassword && data.confirmPassword !== data.newPassword) {
            toast.error("Invalid Credentials. Password don't match", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
              })
            setIsLoading(false)
            return
        }

        let newData = {
            name: data.name,
            email: data.email,
            image: image ? data.image : user.image,
            oldPassword: isChangePassword ? data.oldPassword : null,
            newPassword: isChangePassword ? data.newPassword : null,
        }


        axios.post("/api/user/profile", newData)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error("Something went wrong.")
                }

                if (response.data.passwordChanged) {
                    toast.success(response.data.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                      })
                    signOut()
                } else {
                    toast.success(response.data.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                      })
                    setImage(null)
                    router.refresh()
                }
            })
            .catch((err) => {
                console.log("Something went wrong.", err)
            })
            .finally(() => setIsLoading(false))
    }
    return (
        <div className='h-auto'>
            <div className='w-auto block md:flex items-start justify-center gap-3 mx-auto mt-5 md:mt-12'>
                <div className="w-full md:w-6/12 p-5 h-auto md:rounded-lg bg-white">
                    {/* profile card */}
                    <div className="w-full flex items-center gap-3 border-b border-solid border-gray-300 mb-3 pb-3">
                        <div className="relative rounded-full overflow-hidden w-14 h-14">
                            <Image src={user?.image || '/images/placeholder.jpg'} alt="profile picture" fill className="object-cover" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h3 className="text-lg font-medium text-gray-700 leading-5">{user.name}</h3>
                            <span className="text-sm font-medium text-gray-500">{user.email}</span>
                        </div>
                    </div>

                    <h3 className="text-2xl font-medium text-gray-700">Personal info</h3>
                    <span className="text-sm text-gray-500">Update your profile photo and personal details here</span>

                    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                        <input type="file" className="invisible" id="file" />
                        <div className='w-full'>
                            <span className="text-base font-medium text-gray-500">Profile Picture</span>
                            <div className="w-full h-20 flex items-center gap-3 mt-2 border-2 border-dashed border-gray-300 p-3 rounded-lg">
                                <div className="w-28 h-full">
                                    {image !== null ?
                                        <div className="w-full h-full relative">
                                            <Image src={image} alt="profile" className="object-cover rounded"
                                                fill={true} />
                                            <div className="absolute -top-2 -right-2 flex items-center justify-center bg-white cursor-pointer border border-solid border-gray-200 rounded-full z-[1]" onClick={() => {
                                                setImage(null)
                                            }}>
                                                <CloseIcon className="text-sm p-1 text-[var(--dark-blue)]" />
                                            </div>
                                        </div>
                                        :
                                        <div className="w-full h-full rounded bg-blue-100 flex items-center justify-center">
                                            <ImageIcon className="text-sky-500" />
                                        </div>
                                    }
                                </div>
                                <p className="text-sm text-gray-500 basis-full truncate">Upload a profile picture(jpg, jpeg, png). Max size 1MB</p>
                                <CldUploadButton
                                    options={{ maxFiles: 1 }}
                                    onUpload={handleUpload}
                                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                                >
                                    <label htmlFor='file' className="px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-sky-600 hover:text-white text-[var(--dark)] border-2 border-solid border-gray-300 hover:border-transparent">
                                        Browse
                                    </label>
                                </CldUploadButton>
                            </div>
                        </div>

                        <div className='flex flex-col gap-3 mt-4'>

                            {/* username */}
                            <Input
                                id='name'
                                type="text"
                                label='name'
                                placeholder="firstname..."
                                required
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                            />

                            {/* email */}
                            <Input
                                id='email'
                                type="email"
                                label='email'
                                placeholder="myemail@mail.com"
                                required
                                disabled={true}
                                register={register}
                                errors={errors}
                            />

                            {user.hashedPassword !== null &&
                                <div className="my-4 w-full">
                                    <span className="text-sm text-sky-500 font-medium hover:underline cursor-pointer" onClick={() => setIsChangePassword(!isChangePassword)}>Change password?</span>

                                    {isChangePassword &&
                                        <div className="w-full flex flex-col gap-2">
                                            <Input
                                                id='oldPassword'
                                                type="password"
                                                label='Old password'
                                                placeholder="Old password..."
                                                required
                                                disabled={isLoading}
                                                register={register}
                                                errors={errors}
                                            />
                                            <Input
                                                id='newPassword'
                                                type="password"
                                                label='New password'
                                                placeholder="new password..."
                                                required
                                                disabled={isLoading}
                                                register={register}
                                                errors={errors}
                                            />
                                            <Input
                                                id='confirmPassword'
                                                type="password"
                                                label='Confirm password'
                                                placeholder="Re-enter your password..."
                                                required
                                                disabled={isLoading}
                                                register={register}
                                                errors={errors}
                                            />
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                        <div className='w-full mt-8 flex items-center justify-center'>
                            <button type="submit" className="text-white bg-sky-500 rounded-full w-6/12 py-2 font-medium outline-none text-center hover:bg-darkBlue">
                                {isLoading ? <div className="w-5 h-5 mx-auto border-2 border-solid border-white border-r-transparent rounded-full animate-spin"></div> : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile

