// Generic TextInput component.

import React from 'react';
import {TextInput, StyleSheet, TextInputProps} from 'react-native';

type CTInputProps = TextInputProps & {
  customStyle?: object;
  maxLength?: number;
};

const CTInput: React.FC<CTInputProps> = ({
  style,
  customStyle,
  maxLength,
  onChangeText,
  ...rest
}) => {
  const handleTextChange = (text: string) => {
    const filteredText = text.replace(/[^a-zA-Z0-9\s]/g, '');
    onChangeText?.(filteredText);
  };
  return (
    <TextInput
      style={[styles.input, customStyle, style]}
      onChangeText={handleTextChange}
      {...rest}
      maxLength={maxLength}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 14,
    fontFamily: 'Avenir-Black',
    height: 40,
    borderColor: '#dcdfe6',
    borderWidth: 1,
    borderRadius: 4,
  },
});

export default CTInput;
