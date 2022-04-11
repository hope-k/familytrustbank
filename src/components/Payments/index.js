import React from 'react'
import { BiTransfer } from 'react-icons/bi'
import { BsCashCoin } from 'react-icons/bs'
import { MdOutlinePersonOutline } from 'react-icons/md'
import { CashIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'


const Payments = () => {
    return (
        <div className='lg:w-[83.6%] lg:absolute lg:right-0 z-50 relative'>
            <h1 className='lg:px-[7rem] top-[15rem] px-4 text-white font-semibold text-xl flex items-center fixed lg:top-40'>
                Payments <BsCashCoin className='ml-2 text-2xl text-white' />
            </h1>
            <div className='flex h-full items-center mt-[20rem]'>
                <div className="container relative px-[1.5rem] md:px-[5rem] lg:px-[20rem] pb-6">
                    <div className='bg-gray-100 p-4 pb-10 rounded-xl mt-5 shadow-2xl'>

                        <div className='bg-gray-100 rounded-xl '>
                            <div className="px-2">
                                <h1 className='font-semibold px-4 py-4'>Payments</h1>
                                <div className='flex  mt-6 justify-evenly border-b border-gray-300 pb-6 items-end'>
                                    <Link to='/account/transfer' className='flex flex-col items-center font-semibold text-sm'>
                                        <CashIcon className='w-6 stroke-[#90996e]' />
                                        Pay a bill
                                    </Link>
                                    <Link to='/account/transfer' className='flex flex-col items-center font-semibold text-sm'>
                                        <MdOutlinePersonOutline className='text-[1.7rem] text-[#90996e]' />
                                        Pay a Person
                                    </Link>
                                    <Link to='/account/transfer' className='flex flex-col items-center font-semibold text-sm'>
                                        <BiTransfer className='text-[1.4rem] text-[#90996e]' />
                                        Transfer
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Payments