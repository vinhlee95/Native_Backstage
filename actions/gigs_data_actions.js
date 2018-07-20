import GIGS_DATA from '../data/gigs_data.json';
import { FETCH_GIGS_DATA } from './types';

const {
   gigDate,
   gigTime,
   gigAddress,
   gigStatus,
   product,
   customerName, 
   customerEmail,
} = GIGS_DATA;

export const fetchGigsData = () => {
   return {
      type: FETCH_GIGS_DATA,
      payload: {
         gigDate,
         gigTime,
         gigAddress,
         gigStatus,
         product,
         customerName,
         customerEmail,
      }
   }
}
