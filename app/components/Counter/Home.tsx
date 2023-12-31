'use client'

/* Core */
import { useState } from 'react'

/* Instruments */
import styles from './counter.module.css'
import { useDispatch } from 'react-redux'
import { useGetCollectionQuery, useGetWantlistQuery } from '@/app/api/discogs'

export const Home = () => {
  const dispatch = useDispatch()
  const { data: collection } = useGetCollectionQuery();
  const { data: wants } = useGetWantlistQuery();

  const [incrementAmount, setIncrementAmount] = useState(2)

  return (
    <div>
      <h1>Collection</h1>
      {
        collection?.releases.map((release) => (
            <div className={styles.row}>
              <div>{release.basic_information.title}</div>
            </div>
          ))
      }
       <h1>Wishlist</h1>
      {
        wants?.wants.map((release) => (
            <div className={styles.row}>
              <div>{release.basic_information.title}</div>
            </div>
          ))
      }
      </div>
  )
}
