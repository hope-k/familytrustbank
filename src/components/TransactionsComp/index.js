import React from 'react'
import SendIcon from '../SendIcon'
import ReceiveIcon from '../ReceiveIcon'
const TransactionsComp = () => {
  return (
      <div className='lg:max-w-[55rem] w-full bg-gray-200 rounded-3xl overflow-scroll '>
          <div className='container px-14 my-8 '>
              <h1 className='text-2xl font-bold mb-7'>Recent Transactions</h1>
              <table className='lg:w-full ' >
                  <tr className='rounded-2xl flex  pb-4'>
                      <th className='w-[14rem]'>To</th>
                      <th className='w-[13rem] text-center'>Amount</th>
                      <th className=' text-center w-[5rem]'>Date</th>
                      <th className='w-[14rem]'>Status</th>
                  </tr>

                  <tr className='rounded-2xl flex  p-6'>
                      <td className='flex items-center justify-center w-[14rem]'>
                          <div className='mr-2 w-[3rem]'>
                              <SendIcon />
                          </div>
                          <div className='tracking-normal leading-3'>
                              <div className='font-bold'>
                                  **** **** **** 2853
                              </div>
                              <div className='text-sm text-gray-500'>
                                  Transfer
                              </div>
                          </div>

                      </td>
                      <td className='font-bold w-[10rem] text-center text-red-500'>-$500,000</td>
                      <td className='w-[8rem] text-center'>
                          <div className='font-bold'>
                              23 feb 2022
                          </div>
                          <div className='text-sm text-gray-500'>
                              04:44:66 AM
                          </div>
                      </td>
                      <td className='text-red-500 font-semibold text-center w-[10rem]'>
                          Failed
                      </td>
                  </tr>
                  <tr className='rounded-2xl flex  p-6'>
                      <td className='flex items-center justify-center w-[14rem]'>
                          <div className='mr-2 w-[3rem]'>
                              <SendIcon />
                          </div>
                          <div className='tracking-normal leading-3'>
                              <div className='font-bold'>
                                  **** **** **** 2853
                              </div>
                              <div className='text-sm text-gray-500'>
                                  Transfer
                              </div>
                          </div>

                      </td>
                      <td className='font-bold w-[10rem] text-center text-red-500'>-$20,000,000</td>
                      <td className='w-[8rem] text-center'>
                          <div className='font-bold'>
                              23 feb 2022
                          </div>
                          <div className='text-sm text-gray-500'>
                              04:44:66 AM
                          </div>
                      </td>
                      <td className='text-gray-500 font-semibold text-center w-[10rem]'>
                          Pending
                      </td>
                  </tr>
                  <tr className='rounded-2xl flex  p-6'>
                      <td className='flex items-center justify-center w-[14rem]'>
                          <div className='mr-2 w-[3rem]'>
                              <ReceiveIcon />
                          </div>
                          <div className='tracking-normal leading-3'>
                              <div className='font-bold'>
                                  **** **** **** 2853
                              </div>
                              <div className='text-sm text-gray-500'>
                                  Receive
                              </div>
                          </div>

                      </td>
                      <td className='font-bold w-[10rem] text-center text-[#00A389] '>+$300,000</td>
                      <td className='w-[8rem] text-center'>
                          <div className='font-bold'>
                              23 feb 2022
                          </div>
                          <div className='text-sm text-gray-500'>
                              04:44:66 AM
                          </div>
                      </td>
                      <td className='text-[#00A389] font-semibold text-center w-[10rem]'>
                          Completed
                      </td>
                  </tr>



              </table>

          </div>
      </div>
  )
}

export default TransactionsComp