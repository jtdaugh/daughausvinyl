/* Instruments */
import {discogsApi} from '@/app/api/discogs'
export const reducer = {
  [discogsApi.reducerPath]: discogsApi.reducer,
}
