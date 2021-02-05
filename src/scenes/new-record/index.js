import React from 'react';
import Prompt from '@/utils/prompt';
import { View, TextInput, Picker } from 'react-native';
import { ListItem, Input, Button, BottomSheet } from 'react-native-elements'

import { getAllTags } from '@/database';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addRecord, addTag } from '@/store';
import RecordInputList from '@/components/RecordInputList'

const mapDispatchToProps = dispatch => bindActionCreators({ addRecord }, dispatch);


const MultiLineTextInput = (props) => (
  <TextInput multiline numberOfLines={4} {...props}></TextInput>
)

const SELECT_ONE = 'Select One'
const NEW_TAG = 'New Tag'

  
const TagPicker = connect(({ tags }) => ({ tags }))(({ onValueChange, tags, ...props }) => {
  const generatedTags = [SELECT_ONE, ...tags, NEW_TAG]
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
  onCancle,
  onSuccess,
  navigation,
  addTag
}) => {
  const [inputIsDisabled, setInputIsDisabled] = React.useState(true);
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [value, setValue] = React.useState('');

  return (
    <BottomSheet isVisible={isVisible}>
      <TagPicker
        selectedValue={selectedValue}
        onValueChange={(value) => {
          if (value === NEW_TAG) {
            Prompt({
              prompt: 'New tag name:',
              onSuccess: addTag
            })
            setSelectedValue(0)
            setInputIsDisabled(true)
          } else {
            setInputIsDisabled(value === SELECT_ONE)
            setSelectedValue(value)
          }
        }}
      />
      <Input placeholder="Value" disabled={inputIsDisabled} onChangeText={setValue} />
      <Button
          style={{ margin: 10, marginTop: 100 }}
          buttonStyle={{backgroundColor: 'red'}}
          title="Cancle" onPress={onCancle} />
      <Button
        disabled={inputIsDisabled}
        style={{ margin: 10, marginBottom: 30 }}
        title="Record"
        onPress={() => onSuccess({
          InputValue: value,
          InputTag: selectedValue
        })}
      />
    </BottomSheet>
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
        onCancle={() => {setIsVisible(false)}}
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