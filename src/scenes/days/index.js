import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements'

import { connect } from 'react-redux';

const mapStateToProps = ({ batches }, props) => ({ batch: batches.find(({BatchId}) => BatchId === props.route.params.BatchId) });


const addDays = function(date, days) {
    const newDate = new Date(date.valueOf());
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}

function getDates(startDate, stopDate) {
    const dates = [];
    let currentDate = startDate;
    while (currentDate <= stopDate) {
        dates.push(new Date (currentDate));
        currentDate = addDays(currentDate, 1);
    }
    return dates;
}


function DaysScreenComponent({ batch, navigation }) {
  const startDate = new Date(batch.BatchStartDate)
  startDate.setHours(0, 0, 0, 0)

  const daysSinceBatchStart = getDates(startDate, new Date()).reverse()
  return (
    <View>
      {daysSinceBatchStart.map((date) => (
        <ListItem
          key={date.getDay()}
          bottomDivider
          onPress={() => navigation.push('Records', { BatchId: batch.BatchId, date: date.getTime() })}
        >
          <ListItem.Content>
            <ListItem.Title>{date.toDateString()}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
    </View>
  );
}

export default connect(mapStateToProps)(DaysScreenComponent);