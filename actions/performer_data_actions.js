import { FETCH_PERFORMER_DATA, CREATE_PERFORMER, UPDATE_PERFORMER } from './types';
import _ from 'lodash';
import request from 'superagent';
const index = Math.floor(100000 + Math.random() * 900000);

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
            console.log(data);
            dispatch({
               type: FETCH_PERFORMER_DATA,
               payload: data
            })
         });
   }
}

export const createPerformer = (profilePic, name, description, profile_facebook, profile_instagram) => {
   const id = Math.floor(100000 + Math.random() * 900000);
   return {
      type: CREATE_PERFORMER,
      payload: { 
         data: {
            profilePic, name, description, profile_facebook, profile_instagram, id 
         },
         products: {}
      }
   }
}

export const updatePerformer = (name, description, profile_facebook, profile_instagram, profilePic, productData, id) => {
   console.log(`Item with id of ${id} is updated`)
   return {
      type: UPDATE_PERFORMER,
      payload: {
         data: {
            name, description, profile_facebook, profile_instagram, profilePic, id
         },
         products: productData
      }
   }
}
