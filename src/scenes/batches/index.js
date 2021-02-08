import React, { useState, } from 'react';
import { View, StyleSheet, TextInput, Modal, TouchableHighlight, Text } from 'react-native';
import { ListItem, } from 'react-native-elements'

import PlusButton from '@/components/PlusButton';
import Prompt from '@/utils/prompt';

import { addBatch } from '@/store';

import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';

const isIOS = require('react-native').Platform.OS === 'ios';
const mapStateToProps = ({ batches }) => ({ batches });
const mapDispatchToProps = dispatch => bindActionCreators({ addBatch }, dispatch);
const ReduxConnector = connect(mapStateToProps, mapDispatchToProps);

const NewBatchButton = ReduxConnector(({ addBatch }) => (
    
    <PlusButton onPress={
      () => {
        Prompt({
          prompt: "Enter a new batch name:",
          onSuccess: name => addBatch(name)
        });
      }
    }/>
  )
  
)

const AndroidBatchButton = ReduxConnector(({ addBatch }) => (
    BatchesScreenFunction(addBatch)
  )
)



function BatchesScreenFunction(functionToUse) {
  const [modalVisible, setModalVisible] = useState(false);
  const [textValue, setTextValue] = useState('');
  return (
    <>
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter a new batch name:</Text>
            <TextInput
              style={styles.textInputStyle}
              onChangeText={text => setTextValue(text)}
              value={textValue}
              placeholder="New Batch Name"
            />
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: 'red', fontWeight: "bold", }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setTextValue('');
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                disabled={!textValue.length}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  if(textValue.length > 0) {
                    functionToUse(textValue);
                  }
                  setTextValue('');
                }}
              >
                <Text style={styles.textStyle}>Save</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
      <PlusButton onPress={() => {
          setModalVisible(true);
        }}
      />
    </View>
    </>
  );
}

export const BatchesScreenOptions = {
  headerRight: () => <NewBatchButton/>,
}

export function BatchesScreenComponent({ batches, navigation }) {
  if(isIOS) {
    return (
      <View>
        {batches.map(({ BatchId, BatchName }) => (
          <ListItem
            key={BatchId}
            bottomDivider
            onPress={() => navigation.push('Days', { BatchId })}
          >
          <ListItem.Content>
            <ListItem.Title>{BatchName}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
          </ListItem>
        ))}
      </View>
    );
  }
  else {
    return (
      <View>
        {batches.map(({ BatchId, BatchName }) => (
          <ListItem
            key={BatchId}
            bottomDivider
            onPress={() => navigation.push('Days', { BatchId })}
          >
          <ListItem.Content>
            <ListItem.Title>{BatchName}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
          </ListItem>
        ))}
        <View style={{padding: 35}}>
          <AndroidBatchButton/>
        </View>
      </View>
    );
  }
}

export const BatchesScreen = ReduxConnector(BatchesScreenComponent, {addBatch});

const styles = StyleSheet.create ({
  container: {
     alignItems: 'center',
     backgroundColor: '#ede3f2',
     padding: 100
  },
  modal: {
     flex: 1,
     alignItems: 'center',
     backgroundColor: '#f7021a',
     padding: 100
  },
  text: {
     color: '#3f2949',
     marginTop: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 100,
    margin: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  textInputStyle: {
    color: 'black',
    marginBottom: 15,
    fontSize: 20,
    textAlign: "center",
    borderBottomWidth : 1.0,
    borderEndWidth : 200,
  },
  modalText: {
    fontSize: 20,
    color: 'black',
    marginBottom: 15,
    textAlign: "center",
  }
})
// export default BatchesScreen;