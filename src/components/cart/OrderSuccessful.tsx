'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import orderSuccess from "@/assets/add-to-cart.json";

interface OrderSuccessProps {
    isOpen: boolean;
    closeOrderSuccessModal: () => void;
}

function OrderSuccess({ isOpen, closeOrderSuccessModal }: OrderSuccessProps) {
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeOrderSuccessModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform rounded-lg bg-white shadow-xl transition-all w-full sm:my-8 sm:w-full sm:max-w-md">
                                <div className="absolute -right-14 top-0 hidden pr-4 pt-2 sm:block z-10">
                                    <button
                                        type="button"
                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
                    "
                                        onClick={closeOrderSuccessModal}
                                    >
                                        <span className="sr-only">Close</span>
                                        <CloseIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                <div className="w-full overflow-hidden rounded-lg flex flex-col justify-center items-center py-5">
                                    <Player
                                        autoplay
                                        loop
                                        src={orderSuccess}
                                        style={{ height: '200px', width: '200px' }}
                                    >
                                        <Controls visible={false} />
                                    </Player>

                                    <span className='text-gray-900 leading-5 mt-4 text-center max-w-sm'>
                                        Order Placed successfully. You can track your order from the orders page
                                    </span>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default OrderSuccess;