import { useEffect, useState, useContext } from 'react'
import { useSession, signOut } from 'next-auth/react';
import Header from "@/components/Header"
import Modal from "@/components/Modal"
import Head from "next/head"
import Router from "next/router"
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import axios from 'axios';
import ImageIcon from '@mui/icons-material/Image';
import Image from "next/image"
import profile from "@/assets/default.png"
import CloseIcon from '@mui/icons-material/Close';
import { UserContext } from '@/context/MainContext'

const loading = require("@/assets/lottiefiles/loading.json")

type user = {
    _id: object;
    username: string;
    email: string;
    profile: string;
    favorites: []
}

function Profile() {
    const { status, data: session } = useSession()
    const [image, setImage] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [user, setUser] = useState<user>({} as user)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [filename, setFileName] = useState("")
    const [isChangePassword, setIsChangePassword] = useState(false)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")



    const handleFileInputChange = (event: any) => {
        const file = event.target.files[0];
        setFileName(file.name)
        // Convert the image file to base64 using the FileReader API
        const reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result);
        };
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);

        try {

            if (oldPassword.length > 0 && newPassword !== confirmNewPassword) {
                setError("Please make sure your password match!")
                setIsLoading(false);
                return
            }


            // Make a POST request to the API with the user ID and image data
            const { data } = await axios.post(`/api/profile`, {
                userId: user._id,
                username,
                email,
                image,
                oldPassword,
                newPassword
            });
            
            // Reset the form and display a success message
            setImage(null);
            setFileName("")
            setError("");
            setIsLoading(false);
            
            // sign out user to update changes on the client
            handleOpenModal()
        } catch (err: any) {
            // Handle errors by displaying an error message
            if (err.response.status === 413) {
                setError("Image too big. Image must be max 1mb")
                setIsLoading(false);
                return
            }
            setError(err.response.data as string);
            setIsLoading(false);
        }
    };


    useEffect(() => {
        if (status === "unauthenticated") Router.replace("/auth/signin"); // redirect to sign in not authenticated

        if (session && session.user) {
            fetch(`/api/getUser/${session?.user?.email}`)
                .then(res => res.json())
                .then(data => {
                    setUser(data)
                    setUsername(data.username)
                    setEmail(data.email)
                })
        }
    }, [session, status])

    if (status == "authenticated" && session) {
        return (
            <div className="pt-20 w-full min-h-screen bg-gray-100">
                {user.username ?
                    <>
                        <div className='w-auto block md:flex items-start justify-center gap-3 mx-auto mt-5 md:mt-12'>
                            <div className="w-full md:w-6/12 p-5 h-auto md:rounded-lg bg-white">
                                {/* profile card */}
                                <div className="w-full flex items-center gap-3 border-b border-solid border-gray-300 mb-3 pb-3">
                                    <Image src={user && user.profile ? user.profile : profile} alt="profile picture" width={50} height={50} className="rounded-full object-cover overflow-hidden" />
                                    <div className="flex flex-col justify-center">
                                        <h3 className="text-lg font-medium text-[var(--dark)] leading-5">{user && user.username}</h3>
                                        <span className="text-sm font-medium text-gray-500">{user && user.email}</span>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-medium text-[var(--dark)]">Personal info</h3>
                                <span className="text-base text-gray-500">Update your profile photo and personal details here</span>

                                {error.length > 0 && <div className="w-full flex items-center py-3 justify-center font-medium rounded px-4 bg-red-400 text-white mt-3">{error}</div>}
                                <form className="w-full" onSubmit={handleSubmit}>
                                    <input type="file" className="invisible" id="file" onChange={handleFileInputChange} />
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
                                                            setFileName("")
                                                        }}>
                                                            <CloseIcon className="text-sm p-1 text-[var(--dark-blue)]" />
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className="w-full h-full rounded bg-blue-100 flex items-center justify-center">
                                                        <ImageIcon className="text-blue-500" />
                                                    </div>
                                                }
                                            </div>
                                            <p className="text-sm text-gray-500 basis-full truncate">{filename.length > 0 ? filename : "Upload a profile picture(jpg, jpeg, png). Max size 1MB"}</p>
                                            <label htmlFor='file' className="px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-[var(--lightblue)] hover:text-white text-[var(--dark)] border-2 border-solid border-gray-300 hover:border-transparent">
                                                Browse
                                            </label>
                                        </div>
                                    </div>

                                    {/* username */}
                                    <div className='w-full flex flex-col justify-start gap-1 mt-3'>
                                        <label className='text-base font-medium font-mono antialiased text-gray-500' htmlFor='username'>First Name</label>
                                        <input id="username" className='h-9 rounded outline border-none focus:shadow-lg focus:outline-[var(--lightblue)] outline-gray-200 text-sm px-2 outline-2 outline-offset-0 text-gray-500' type="text" placeholder='Username....' name="username" onChange={(e) => setUsername(e.target.value)} value={username} />
                                    </div>

                                    {/* email */}
                                    <div className='w-full flex flex-col justify-start gap-1 mt-3'>
                                        <label className='text-base font-medium font-mono antialiased text-gray-500' htmlFor='email'>Email</label>
                                        <input id="email" className='h-9 rounded outline border-none focus:shadow-lg focus:outline-[var(--lightblue)] outline-gray-200 text-sm px-2 outline-2 outline-offset-0 text-gray-500' type="email" placeholder='email....' name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                                    </div>

                                    <div className="my-4 w-full">
                                        <span className="text-sm text-[var(--lightblue)] font-medium hover:underline cursor-pointer" onClick={() => setIsChangePassword(!isChangePassword)}>Change password?</span>

                                        {isChangePassword &&
                                            <div className="w-full flex flex-col gap-2">
                                                <div className='w-full flex flex-col justify-start gap-1 mt-3'>
                                                    <label className='text-base font-medium font-mono antialiased text-gray-500' htmlFor='p1'>Old Password</label>
                                                    <input id="p1" className='h-9 rounded outline border-none focus:shadow-lg focus:outline-[var(--lightblue)] outline-gray-200 text-sm px-2 outline-2 outline-offset-0 text-gray-500' type="password" placeholder='old password' name="password1" onChange={(e) => setOldPassword(e.target.value)} autoComplete="new-password" />
                                                </div>
                                                <div className='w-full flex flex-col justify-start gap-1 mt-3'>
                                                    <label className='text-base font-medium font-mono antialiased text-gray-500' htmlFor='p2'>New Password</label>
                                                    <input id="p2" className='h-9 rounded outline border-none focus:shadow-lg focus:outline-[var(--lightblue)] outline-gray-200 text-sm px-2 outline-2 outline-offset-0 text-gray-500' type="password" placeholder='New password' name="password2" onChange={(e) => setNewPassword(e.target.value)} autoComplete="new-password" />
                                                </div>
                                                <div className='w-full flex flex-col justify-start gap-1 mt-3'>
                                                    <label className='text-base font-medium font-mono antialiased text-gray-500' htmlFor='p3'>Re-enter new password</label>
                                                    <input id="p3" className='h-9 rounded outline border-none focus:shadow-lg focus:outline-[var(--lightblue)] outline-gray-200 text-sm px-2 outline-2 outline-offset-0 text-gray-500' type="password" placeholder='Re-enter new password' name="password3" onChange={(e) => setConfirmNewPassword(e.target.value)} autoComplete="new-password" />
                                                </div>
                                            </div>
                                        }
                                    </div>

                                    <div className='w-full mt-8 flex items-center justify-center'>
                                        <button type="submit" className="text-white bg-[var(--lightblue)] rounded-full w-6/12 py-2 font-medium outline-none text-center hover:bg-[var(--dark-blue)]">
                                            {isLoading ? <div className="w-5 h-5 mx-auto border-2 border-solid border-white border-r-transparent rounded-full animate-spin"></div> : 'Save Changes'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <br />
                    </>
                    :
                    <div className="flex items-center justify-center ">
                        <Player
                            autoplay
                            loop
                            src={loading}
                            style={{ width: 300, height: 300 }}
                        >
                            <Controls visible={false} />
                        </Player>
                    </div>
                }
            </div>
        )
    }

    return <div className="w-screen h-screen flex items-center justify-center ">
        <Player
            autoplay
            loop
            src={loading}
            style={{ width: 300, height: 300 }}
        >
            <Controls visible={false} />
        </Player>
    </div>


}

export default Profile