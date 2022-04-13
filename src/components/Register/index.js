import React, { useEffect, useLayoutEffect, useState } from 'react'
import { LockClosedIcon, FingerPrintIcon } from '@heroicons/react/outline'
import gsap from 'gsap'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'
import { login } from '../../redux/Slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNotifications } from 'reapop'
import { resetAuthError } from '../../redux/Slices/authSlice'
import FadeLoader from 'react-spinners/FadeLoader'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import instance from '../../axios'

const RegisterPage = () => {
    const { error, loading, isAuthenticated, user, token } = useSelector(state => state.auth)
    const { notify } = useNotifications()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [ssn, setSsn] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const dispatch = useDispatch();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisible = () => {
        setPasswordVisible(!passwordVisible);
    }

    useEffect(() => {
        if (!loading) {
            if (isAuthenticated && user?.role === 'user') {
                window.location.href = ('/account')
            } else if (user?.role === 'admin' && isAuthenticated) {
                window.location.href = '/admin'
            }
        }
        if (error) {
            notify(error, { title: 'Authentication Failure', showDismissButton: true, status: error.includes('processed') ? 'loading' : 'error' });
            dispatch(resetAuthError());
        }
    }, [error, notify, dispatch, isAuthenticated, loading, user])
    useLayoutEffect(() => {
        gsap.from('#registerPage', {
            scale: .9,
            opacity: 0,
            duration: .45,
            ease: 'power4.in'
        })
    }, []);
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await instance.post('/api/register', {
                firstName,
                lastName,
                username,
                password,
                phone,
                dateOfBirth,
                ssn,
                address
            }, {
                headers: {
                    'Authorization': `Bearer ${token && token}`
                }
            });
            if (data?.success) {
                notify('Request for account is being processed you will be contacted by the bank', 'success')
            }
            setPhone('')
            setSsn('')
            setAddress('')
            setDateOfBirth('')
            setFirstName('')
            setLastName('')
            setPassword('')
            setUsername('')
        } catch (error) {
            if (error.response.data?.error?.message) {
                notify(error.response.data?.error?.message, 'error', { title: 'Input Validation Error' })
            }
        }




    }

    return (
        <div className='relative' id='registerPage'>
            <div className="registerBg"></div>
            <div className='pt-20 flex justify-center px-8 md:px-24 lg:px-7 relative '>
                <div className=' bg-[rgba(217,224,230,0.88)] z-10 lg:p-12 flex flex-col rounded-2xl relative lg:w-[40%] w-full '>
                    <div className='relative  pb-24 mt-6 whitespace-nowrap justify-center flex flex-col items-center'>
                        <h1 className='font-light text-xl  lg:text-2xl text-[black] lg:flex'>
                            Online Banking Registration Portal
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 ml-2 mb-[.3rem] flex lg:mt-1" fill="none" viewBox="0 0 24 24" stroke="#1c2c5e" strokeWidth="1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                        </h1>
                        {
                            loading && <FadeLoader css={{ color: 'red' }} height={10} width={20} margin={1} color='#fff' />
                        }
                    </div>
                    <form className='flex flex-col mx-6 pb-28' onSubmit={submitHandler}>
                        <div className='flex flex-col relative mb-10 lg:mb-8'>
                            <input
                                className='z-[1] bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-[#161d3f] focus-within:border-b-2 '
                                type='text'
                                placeholder=' '
                                onChange={e => setUsername(e.target.value)}
                                value={username}

                            />
                            <label className=' lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-[#161d3f] peer-focus:font-semibold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none text-gray-500'>
                                <FingerPrintIcon className='w-6 mr-2 flex' />
                                User ID
                            </label>

                        </div>
                        <div className='flex flex-col relative pb-8 lg:pb-1'>
                            <input
                                onChange={e => setPassword(e.target.value)}
                                className='z-[1] tracking-wider appearance-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-[#161d3f] focus-within:border-b-2'
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder=' '
                                value={password}

                            />
                            <div className='cursor-pointer absolute w-6 right-4 z-10' onClick={() => togglePasswordVisible()}>
                                {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
                            </div>
                            <label className=' lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-[#161d3f] peer-focus:font-semibold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none text-gray-500'>
                                <LockClosedIcon className='w-6 mr-2 flex' />
                                Password
                            </label>

                        </div>
                        <div className='flex flex-col relative pb-8 lg:pb-1'>
                            <input
                                onChange={e => setFirstName(e.target.value)}
                                className='z-[1] tracking-wider appearance-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-[#161d3f] focus-within:border-b-2'
                                type='text'
                                placeholder=' '
                                value={firstName}
                            />

                            <label className=' lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-[#161d3f] peer-focus:font-semibold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none text-gray-500'>
                                First Name
                            </label>

                        </div>
                        <div className='flex flex-col relative pb-8 lg:pb-1'>
                            <input
                                onChange={e => setLastName(e.target.value)}
                                className='z-[1] tracking-wider appearance-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-[#161d3f] focus-within:border-b-2'
                                type='text'
                                placeholder=' '
                                value={lastName}
                            />

                            <label className=' lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-[#161d3f] peer-focus:font-semibold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none text-gray-500'>
                                Last Name
                            </label>

                        </div>
                        <div className='flex flex-col relative pb-8 lg:pb-1'>
                            <NumberFormat
                                autoComplete='off'
                                placeholder='MM/DD/YYYY'
                                format='##/##/####'
                                mask='_'
                                value={dateOfBirth}
                                type='text'
                                name='dateOfBirth'
                                onValueChange={(value) => setDateOfBirth(value.formattedValue)}
                                className='z-[1] tracking-wider appearance-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-[#161d3f] focus-within:border-b-2'


                            />

                            <label className=' lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-[#161d3f] peer-focus:font-semibold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none text-gray-500'>
                                Date Of Birth
                            </label>

                        </div>
                        <div className='flex flex-col relative pb-8 lg:pb-1'>

                            <NumberFormat

                                autoComplete='off'
                                placeholder=' '
                                format='###-##-####'
                                mask='*'
                                value={ssn}
                                type='text'
                                name='ssn'
                                onValueChange={(value) => setSsn(value.formattedValue)}
                                className='z-[1] tracking-wider appearance-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-[#161d3f] focus-within:border-b-2'


                            />

                            <label className=' lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-[#161d3f] peer-focus:font-semibold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none text-gray-500'>
                                Social Security Number (SSN)
                            </label>

                        </div>
                        <div className='flex flex-col relative pb-8 lg:pb-1'>
                            <input
                                onChange={e => setAddress(e.target.value)}
                                className='z-[1] tracking-wider appearance-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-[#161d3f] focus-within:border-b-2'
                                type='text'
                                placeholder=' '
                                value={address}

                            />

                            <label className=' lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-[#161d3f] peer-focus:font-semibold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none text-gray-500'>
                                Address Line 1
                            </label>

                        </div>
                        <div className='flex flex-col relative pb-8 lg:pb-1'>

                            <NumberFormat

                                autoComplete='off'
                                placeholder=' '
                                format='(###)-###-####'
                                mask='_'
                                prefix='+1'
                                type='text'
                                name='phone'
                                value={phone}
                                onValueChange={value => setPhone(value.formattedValue)}
                                className='z-[1] tracking-wider appearance-none bg-transparent peer pb-2 border-b border-gray-800 outline-none mb-6 placeholder-transparent focus-within:border-[#161d3f] focus-within:border-b-2'


                            />

                            <label className=' lg:flex duration-200 transition-all ease-in-out absolute top-[-1.5rem] peer-focus:top-[-1.5rem] peer-focus:text-sm peer-focus:text-[#161d3f] peer-focus:font-semibold  peer-placeholder-shown:top-[0] peer-placeholder-shown:text-base text-sm pointer-events-none text-gray-500'>
                                Phone
                            </label>

                        </div>
                        <button disabled={loading && true} type='submit' className='bg-[#1c2c5e] text-[white] p-3 rounded-lg mb-4 disabled:bg-[#1c2d5e8e]'>
                            Request An Account
                        </button>

                    </form>
                    <div className=' bg-[rgba(0,0,0,0.35)] absolute left-0 bottom-0 w-full lg:h-16 p-4'>
                        <div className='cursor-pointer flex flex-col lg:flex-row w-full h-full text-[#ccc] text-[.9rem] px-8 underline justify-between items-center'>
                            <Link to='/sign-in'>Already got a account? Sign in</Link>
                            <h1>Activate a card </h1>

                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default RegisterPage