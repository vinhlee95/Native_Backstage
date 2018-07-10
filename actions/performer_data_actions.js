import { FETCH_PERFORMER_DATA, CREATE_PERFORMER } from './types';
import _ from 'lodash';
import request from 'superagent';

const samplePerformerData = {
   "data": {
      "description": "",
      "name": "Eminem ",
      "profileThumb": "file:///var/mobile/Containers/Data/Application/C1D22526-8179-434F-B564-1842526B67FE/Library/Caches/ExponentExperienceData/%2540vinhlee95%252Fback-stage/ImagePicker/43DCAC52-9A58-4BF3-B323-EA93A9CC111D.jpg",
      "profile_facebook": "",
      "profile_instagram": "",
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

export const createPerformer = (profileThumb, name, description, profile_facebook, profile_instagram) => {
   return {
      type: CREATE_PERFORMER,
      payload: { 
         data: {
            profileThumb, name, description, profile_facebook, profile_instagram 
         },
         products: {}
      }
   }
}
