'use client'

import { FC, Fragment } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import CloseIcon from '@mui/icons-material/Close';
import { Categories } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ProfileDrawerProps {
    categories: Categories[];
    isOpen: boolean;
    onClose: () => void;
}

const ProfileDrawer: FC<ProfileDrawerProps> = ({
    categories,
    isOpen,
    onClose
}) => {
    const router = useRouter()
    const handleFilter = (category: string) => {
        router.push(`/store?category=${encodeURIComponent(category)}`)
        onClose()
    }
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-40" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-sm">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                        <div className="px-4 sm:px-6">
                                            <div className="flex items-start justify-end">
                                                <div className="mr-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                        onClick={onClose}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <CloseIcon className="w-6 h-6 text-gray-400" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                            <div className="flex flex-col items-start">
                                                <h3 className="text-lg mb-3 text-gray-900 font-semibold">All categories</h3>

                                                {categories.map((cat) => (
                                                    <div key={cat.id} onClick={() => handleFilter(cat.name)} className='flex items-center hover:bg-orange-500 cursor-pointer h-9 w-full p-3 rounded-md text-gray-600 hover:text-white'>
                                                        <p className='text-sm'>{cat.name}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </div>
        </Dialog>
        </Transition.Root>
  )
}

export default ProfileDrawer