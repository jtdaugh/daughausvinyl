'use client'

/* Core */
import { useState } from 'react'

/* Instruments */
import styles from './counter.module.css'
import { useDispatch } from 'react-redux'
import { useGetCollectionQuery, useGetWantlistQuery } from '@/app/api/discogs'

export const Home = () => {
  const { data: collection } = useGetCollectionQuery();
  const { data: wants } = useGetWantlistQuery();

  const [incrementAmount, setIncrementAmount] = useState(2)

  return (
    <div className='flex-1 w-full p-6 max-w-[1300px]'>
      <h1 className='text-3xl font-bold mb-3'>Current Collection</h1>
      <div className='flex-row flex-wrap w-full space-x-4 grid grid-cols-4 gap-4'>
      {
        collection?.releases.map((release) => (
            <div className='flex-item w-[300px] h-[300px]' style={{backgroundImage: `url(${release.basic_information.cover_image}`, backgroundSize: 'cover'}}>
              {/* <div>{release.basic_information.title}</div> */}
            </div>
          ))
      }
      </div>
      <h1 className='text-3xl font-bold mb-3'>Wishlist</h1>
      <div className='flex-row flex-wrap w-full space-x-4 grid grid-cols-4 gap-4'>
      {
        wants?.wants.map((release) => (
            <div className='flex-item w-[300px] h-[300px]' style={{backgroundImage: `url(${release.basic_information.cover_image}`, backgroundSize: 'cover'}}>
              {/* <div>{release.basic_information.title}</div> */}
            </div>
          ))
      }
      </div>
      
      </div>
  )
}
