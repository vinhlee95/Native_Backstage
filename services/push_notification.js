import { Permissions, Notifications } from 'expo';
import {AsyncStorage} from 'react-native';
import axios from 'axios';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
   // check whether permission is already given & saved
   let previousToken = await AsyncStorage.getItem('pushtoken');
   // console.log(previousToken)
   if(previousToken) {
      return;
   } else {
      // ask permission from user
      let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if(status !== 'granted') {
         return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      console.log(token)

      // send token to remote endpoint
      await axios.post(PUSH_ENDPOINT, { token: {token} });

      AsyncStorage.setItem('pushtoken', token);
   }
}