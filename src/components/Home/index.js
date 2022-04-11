import React from 'react'
import { ShieldCheckIcon } from '@heroicons/react/outline'
import { gsap } from 'gsap'
import { TextPlugin } from "gsap/TextPlugin";
import { Link } from 'react-router-dom'

gsap.registerPlugin(TextPlugin);

const Home = () => {
    React.useLayoutEffect(() => {
        gsap.from('#homePage', {
            scale: .9,
            opacity: 0,
            duration: .45,
            ease: 'power4.in'
        })
    }, [])
    React.useLayoutEffect(() => {
        gsap.from("#heading", { duration: 5, text: "", ease: 'power4.out' })
    }, [])
    React.useLayoutEffect(() => {
        gsap.timeline({ defaults: { duration: .8, stagger: .18 } })
            .from("#bankings", { ease: 'power4.in', y: 35, opacity: 0 })
    }, [])
    return (
        <>
            <div className='relative' id='homePage'>
                <div className="homeBg "></div>
                <div className='h-screen md:h-[100vh] bg-[#E5EBE1] lg:overflow-hidden'>
                    <div className='container px-10 lg:px-[10rem] h-full z-10 relative items-center flex lg:items-baseline'>
                        <div className='lg:w-full pt-[5rem] w-full flex flex-col justify-center items-start'>
                            <div id='heading' className='relative whitespace-nowrap flex text-[#cababa] text-[18px] tracking-wider font-light pb-11 pt-8 lg:pt-8'>
                                <span id='heading'>Simple.</span><span className='ml-6'><ShieldCheckIcon className='w-5 absolute left-[4rem] bottom-[3rem]' /> Secure</span> . The Safest
                            </div>

                            <div className='pb-16'>
                                <h1 className='text-4xl pb-8 text-[#f0f0f0] lora md:max-w-lg tracking-normal font-semibold'>Welcome to the <span className='border-b-2 border-green-500 font-medium tracking-tight  mb-2'>family trust bank</span>. The new banking experience.</h1>
                                <p className='max-w-[75ch] text-[16px] text-[#C0C0C0] tracking-wide'>
                                    Family trust bank is the new reality of banking. Everything you need to build you financial future all in one place.
                                    The easiest way to manage personal finance.
                                    Send and receive money all over the world
                                </p>
                            </div>

                            <div className='flex font-light text-[#ccc] flex-col md:flex-row pt-4 md:pt-1 pb-[0rem] lg:pb-[1rem]'>
                                <Link to='/sign-in' id='bankings' className=' mr-20 cursor-pointer hover:text-blue-300 duration-500 hover:border-b-4 pb-4 border-cyan-700 mb-4 '>
                                    <div className='relative '>
                                        <div className='absolute top-3'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div className='ml-8 '>
                                            <div className='mb-1'>Online</div>
                                            <hr className='w-[10rem]' />
                                            <div className='mt-1'>Banking</div>
                                        </div>
                                    </div>

                                </Link>

                                <Link to='/sign-in' id='bankings' className='mr-20  cursor-pointer hover:text-blue-300 duration-500 hover:border-b-4 pb-4 border-cyan-700  mb-4 '>
                                    <div className='relative'>
                                        <div className='absolute top-3'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <div className='ml-8'>
                                            <div className='mb-1'>Personal</div>
                                            <hr className='w-[10rem]' />
                                            <div className='mt-1'>Banking</div>
                                        </div>
                                    </div>

                                </Link>

                                <Link to='/sign-in' id='bankings' className='mr-20 cursor-pointer hover:text-blue-300 duration-500 hover:border-b-4  border-cyan-700'>
                                    <div className='relative'>
                                        <div className='absolute top-3'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div className='ml-8'>
                                            <div className='mb-1'>Business Banking</div>
                                            <hr className='w-[10rem]' />
                                            <div className='mt-1'>Banking</div>
                                        </div>
                                    </div>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Home