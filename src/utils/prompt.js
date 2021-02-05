import React from 'react';
import { Alert } from 'react-native';

const Prompt = ({ prompt, onSuccess }) => Alert.prompt(
      prompt,
      null,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Save",
          onPress: onSuccess
        }
      ],
      "plain-text"
    )

export default Prompt;