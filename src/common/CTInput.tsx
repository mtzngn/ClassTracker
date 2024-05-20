// Generic TextInput component.

import React from 'react';
import {TextInput, StyleSheet, TextInputProps} from 'react-native';

type CTInputProps = TextInputProps & {
  customStyle?: object;
};

const CTInput: React.FC<CTInputProps> = ({style, customStyle, ...rest}) => {
  return <TextInput style={[styles.input, customStyle, style]} {...rest} />;
};

const styles = StyleSheet.create({
  input: {
    fontSize: 14,
    fontFamily: 'Avenir-Black',
  },
});

export default CTInput;
