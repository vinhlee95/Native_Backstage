import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';

const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];

class CalendarComponent extends Component {
   static navigationOptions = {
      tabBarIcon: ({ focused }) => (
         focused
         ?
         <Ionicons name="ios-calendar" size={28} color="#1a4b93" />
         :
         <Ionicons name="ios-calendar" size={28} color="#8f9193" />
      ),
   }

   constructor(props) {
     super(props);
     this.state = {
       selectedDate: ''
     }
   }

   handlePickDay = (day) => {
     this.setState({ selectedDate: day })
   }


   render() {
    const { selectedDate } = this.state;

    const currentDate = new Date();
    let year = currentDate.getFullYear(); 
    let month = currentDate.getMonth() + 1; month = month<10 ? `0${month}` : month;
    let date = currentDate.getDate(); date = date<10 ? `0${date}` : date;
    const dateInFormat = `${year}-${month}-${date}`;

    const selectedMonthName = monthNames[selectedDate.month];
    const selectedDateName = selectedDate.day;
    const selectedYearName = selectedDate.year;

    console.log(dateInFormat)
    return(
        <View style={{ flex: 1 }}>
          <Calendar
            current={dateInFormat}
            onDayPress={this.handlePickDay}
            markedDates={{
              '2018-08-03' : { selected: true, marked: true, selectedColor: 'blue' }
            }}
          />
          <Text>Day selected is {selectedMonthName} {selectedDateName}, {selectedYearName} </Text>
        </View>
    );
   }
}

export default CalendarComponent;