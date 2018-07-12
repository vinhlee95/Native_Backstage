import { FETCH_PERFORMER_DATA, CREATE_PERFORMER, UPDATE_PERFORMER } from './types';
import _ from 'lodash';
import request from 'superagent';
const index = Math.floor(100000 + Math.random() * 900000);
const samplePerformerData = {
   "data": {
      "description": "",
      "name": "Eminem ",
      "profilePic": "file:///var/mobile/Containers/Data/Application/C1D22526-8179-434F-B564-1842526B67FE/Library/Caches/ExponentExperienceData/%2540vinhlee95%252Fback-stage/ImagePicker/43DCAC52-9A58-4BF3-B323-EA93A9CC111D.jpg",
      "profile_facebook": "",
      "profile_instagram": "",
      id: index,

   },
   "products": {},
}

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
            // console.log(performerData);
            data.push(samplePerformerData);
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
