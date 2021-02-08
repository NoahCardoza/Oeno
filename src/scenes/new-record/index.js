import React from 'react';
import Prompt from '@/utils/prompt';
import { View, TextInput, StyleSheet, Modal, TouchableHighlight, Picker, Text } from 'react-native';
import { ListItem, Input, Button, BottomSheet } from 'react-native-elements'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addRecord, addTag } from '@/store';
import RecordInputList from '@/components/RecordInputList'

const mapDispatchToProps = dispatch => bindActionCreators({ addRecord }, dispatch);
const isIOS = require('react-native').Platform.OS === 'ios';
const MultiLineTextInput = (props) => (
  <TextInput multiline numberOfLines={4} {...props}></TextInput>
)

const SELECT_ONE = 'Select One'

  
const TagPicker = connect(({ tags }) => ({ tags }))(({ onValueChange, tags, ...props }) => {
  const generatedTags = [SELECT_ONE, ...tags]
  return (
    <Picker {...props} onValueChange={onValueChange}>
      {
        generatedTags.map((TagName, i) => (
          <Picker.Item key={i} value={TagName} label={TagName} />
        ))
      }
    </Picker>
  )
})

const AddNewInput = connect(null, dispatch => bindActionCreators({ addTag }, dispatch))(({
  isVisible,
  setIsVisible,
  onCancel,
  onSuccess,
  navigation,
  addTag
}) => {
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [value, setValue] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [textValue, setTextValue] = React.useState('');

  return (
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
            <Text style={styles.modalText}>New tag name:</Text>
            <TextInput
              style={styles.textInputStyle}
              onChangeText={text => setTextValue(text)}
              value={textValue}
              placeholder="New Tag Name"
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
                    addTag(textValue);
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

      <BottomSheet isVisible={isVisible}>
        <TagPicker
          selectedValue={selectedValue}
          onValueChange={(value) => {
            setSelectedValue(value);
          }}
        />
        <Input placeholder="New Tag Name" onChangeText={setValue} />
        <Button
            style={{ margin: 10, marginTop: 100 }}
            buttonStyle={{backgroundColor: 'blue'}}
            title="Add New Tag" 
            onPress={ () => {
              if(isIOS) {
                Prompt({
                      prompt: 'New tag name:',
                      onSuccess: addTag
                    })
              }
              else {
                setModalVisible(true);
              }
            }
          } />
        <Button
            style={{ margin: 10, marginTop: 10 }}
            buttonStyle={{backgroundColor: 'red'}}
            title="Cancel" onPress={onCancel} />
        <Button
          disabled={!value.length}
          style={{ margin: 10, marginBottom: 30 }}
          title="Record"
          onPress={() => onSuccess({
            InputValue: value,
            InputTag: selectedValue
          })}
        />
      </BottomSheet>
    </View>
  );
})

export default connect(null, mapDispatchToProps)(function NewRecordScreen({ addRecord, route, navigation }) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [observation, setObservation] = React.useState('');
  const [inputs, setInputs] = React.useState([]);
  return (
    <View>
      <Input
        style={{ marginTop: 10 }}
        InputComponent={MultiLineTextInput}
        onChangeText={setObservation}
      />
      <Button style={{ margin: 10 }} title="Record Value" onPress={() => setIsVisible(true)} />
      <AddNewInput
        {...{ isVisible, setIsVisible, navigation }}
        onCancel={() => {setIsVisible(false)}}
        onSuccess={input => {
          setIsVisible(false)
          setInputs([...inputs, input])
        }}
      />
      {
        RecordInputList(inputs)
      }
      <Button style={{ margin: 10 }} title="Save"
        onPress={
          () => {
            navigation.pop();
            addRecord({
              BatchId: route.params.BatchId,
              RecordObservation: observation,
              RecordInputs: inputs
            })
          }
        } />
    </View>
  );
})

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
