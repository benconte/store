'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Login from './Login';
import Register from './Register';
import clsx from 'clsx';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { closeModal, openModal } from "@/redux/features/authModal"

export type TABS = "LOGIN" | "REGISTER";

function Auth() {
  // const [isOpen, setIsOpen] = useState(true)

  const isOpen = useAppSelector((state) => state.authModalReducer.isOpen);
  const dispatch = useDispatch<AppDispatch>();

  const [tab, setTab] = useState<TABS>("LOGIN")

  const changeTab = (tabName: TABS) => {
    setTab(tabName)
  }

  const openAuthModal = () => {
    dispatch(openModal())
  }
  const closeAuthModal = () => {
    dispatch(closeModal())
  }
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeAuthModal}>
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
                    onClick={closeAuthModal}
                  >
                    <span className="sr-only">Close</span>
                    <CloseIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="w-full overflow-hidden rounded-lg">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className={clsx(
                        "py-3 w-full outline-none border-none",
                        tab === "LOGIN" ? "bg-darkBlue text-white" : "text-gray-900"
                      )}
                      onClick={() => changeTab("LOGIN")}
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      className={clsx(
                        "py-3 w-full outline-none border-none",
                        tab === "REGISTER" ? "bg-darkBlue text-white" : "text-gray-900"
                      )}
                      onClick={() => changeTab("REGISTER")}
                    >
                      Register
                    </button>
                  </div>
                  {tab === "LOGIN" ?
                    <Login closeAuthModal={closeAuthModal} changeTab={changeTab} />
                    :
                    <Register closeAuthModal={closeAuthModal} changeTab={changeTab} />
                  }
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Auth