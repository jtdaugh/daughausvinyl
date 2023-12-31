/* Instruments */
import { counterSlice } from './slices'
import {discogsApi} from '@/app/api/discogs'
export const reducer = {
  [discogsApi.reducerPath]: discogsApi.reducer,

  counter: counterSlice.reducer,
}
