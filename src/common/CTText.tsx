// Generic Text component. Global styling can be applied to this component.

import React from 'react';
import {Text, StyleSheet, TextProps} from 'react-native';

type CTTextProps = TextProps & {
  children: React.ReactNode;
};

const CTText: React.FC<CTTextProps> = ({style, children, ...rest}) => {
  return (
    <Text style={[styles.text, style]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontFamily: 'Avenir-Black',
  },
});

export default CTText;
