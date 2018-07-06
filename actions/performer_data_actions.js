import { FETCH_PERFORMER_DATA } from './types';
import _ from 'lodash';
import request from 'superagent';

export const fetchPerformerData = () => {
   return (dispatch) => {
      let data;
      request
         .post('https://nodedev.gigleapp.com/user')
         .send({
            action: 'getPerformersAndProducts',
            userId: 'ZuaqGwjNc6M47HchSJYVa2lunf03'
         })
         .end((err, res) => {
            const data = _.toArray(res.body);
            // console.log(data)
            const personalData = data[0].data;
            // console.log(performerData);
            const productData = data[0].products;
            dispatch({
               type: FETCH_PERFORMER_DATA,
               payload: {
                  personalData,
                  productData
               }
            })
         });
   }
}
