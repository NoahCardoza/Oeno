import React from 'react';
import Prompt from '@/utils/prompt';
import { View, TextInput, Picker } from 'react-native';
import { ListItem, Input, Button, BottomSheet } from 'react-native-elements'

import { getAllTags } from '@/database';


const MultiLineTextInput = (props) => (
  <TextInput multiline numberOfLines={4} {...props}></TextInput>
)

const selectTagsForPicker = () =>  [{id: 0, name: 'Select One' }, ...getAllTags(), {id: -1, name: 'New Tag'}]
  
const TagPicker = ({onValueChange, ...props}) => {
  const [tags, setTags] = React.useState(selectTagsForPicker())

  return (
    <Picker {...props} onValueChange={value => onValueChange({
      value,
      tags,
      setTags
    })}>
      {
        tags.map(({ id, name }) => (
          <Picker.Item key={id} value={id} label={name} />
        ))
      }
    </Picker>
  )
}

const AddNewInput = ({
  isVisible,
  setIsVisible,
  onCancle,
  onSuccess,
  navigation
}) => {
  const [inputIsDisabled, setInputIsDisabled] = React.useState(true);
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [value, setValue] = React.useState('');

  return (
    <BottomSheet isVisible={isVisible}>
      <TagPicker
        selectedValue={selectedValue}
        onValueChange={({ value, tags, setTags }) => {
          if (value === -1) {
            Prompt({
              prompt: 'New tag name:',
              onSuccess: tag => {
                setTags([{id: 20, name: tag }, ...tags])
              } 
            })
            setSelectedValue(0)
            setInputIsDisabled(true)
          } else {
            setInputIsDisabled(value === 0)
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
          tagId: selectedValue,
          value: value
        })}
      />
    </BottomSheet>
  );
}

export default function NewRecordScreen({ route, navigation }) {
  const [isVisible, setIsVisible] = React.useState(false);
  return (
    <View>
      <Input
        style={{ marginTop: 10 }}
        InputComponent={MultiLineTextInput}
      />
      <Button style={{ marginHorizontal: 10 }} title="Record Value" onPress={() => setIsVisible(true)} />
      <AddNewInput
        {...{ isVisible, setIsVisible, navigation }}
        onCancle={() => {setIsVisible(false)}}
        onSuccess={input => {
          setIsVisible(false)
          console.log(input)
        }}
      />
    </View>
  );
}