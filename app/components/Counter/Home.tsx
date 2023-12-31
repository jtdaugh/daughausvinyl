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

  return (
    <div className='flex-1 w-full p-6 max-w-[1600px]'>
      <h1 className='text-3xl mb-3 text-[#eee] font-serif'>Current Collection</h1>
      <div className='flex-row flex-wrap w-full grid grid-cols-2 lg:grid-cols-5  xl:grid-cols-6 gap-4'>
      {
        collection?.releases.map((release) => (
            <div key={release.id} className='flex-item w-full aspect-square shadow-md' style={{backgroundImage: `url(${release.basic_information.cover_image}`, backgroundSize: 'cover'}}>
              {/* <div>{release.basic_information.title}</div> */}
            </div>
          ))
      }
      </div>
      <h1 className='text-3xl mb-3 mt-12 text-[#eee] font-serif'>Wishlist</h1>
      <div className='flex-row flex-wrap w-full grid grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
      {
        wants?.wants.map((release) => (
            <div key={release.id} className='flex-item w-full aspect-square shadow-md' style={{backgroundImage: `url(${release.basic_information.cover_image}`, backgroundSize: 'cover'}}>
              {/* <div>{release.basic_information.title}</div> */}
            </div>
          ))
      }
      </div>
      
      </div>
  )
}
