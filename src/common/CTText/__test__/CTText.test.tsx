import React from 'react';
import {render} from '@testing-library/react-native';
import CTText from '../CTText';

describe('CTText Component', () => {
  it('renders text correctly', () => {
    const {getByText} = render(<CTText>Hello, World!</CTText>);
    const textElement = getByText('Hello, World!');
    expect(textElement).toBeTruthy();
  });

  it('applies default styles correctly', () => {
    const {getByText} = render(<CTText>Hello, World!</CTText>);
    const textElement = getByText('Hello, World!');
    expect(textElement.props.style).toEqual([
      {
        fontSize: 14,
        fontWeight: 'normal',
        fontFamily: 'Avenir-Black',
      },
      undefined,
    ]);
  });

  it('applies custom styles correctly', () => {
    const customStyle = {color: 'red'};
    const {getByText} = render(
      <CTText style={customStyle}>Hello, World!</CTText>,
    );
    const textElement = getByText('Hello, World!');
    expect(textElement.props.style).toContainEqual(customStyle);
  });
});
