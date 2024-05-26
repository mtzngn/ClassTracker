import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CTInput from '../CTInput';

describe('CTInput Component', () => {
  it('renders TextInput correctly', () => {
    const {getByPlaceholderText} = render(<CTInput placeholder="Enter text" />);
    const inputElement = getByPlaceholderText('Enter text');
    expect(inputElement).toBeTruthy();
  });

  it('filters input correctly', () => {
    const onChangeTextMock = jest.fn();
    const {getByPlaceholderText} = render(
      <CTInput placeholder="Enter text" onChangeText={onChangeTextMock} />,
    );
    const inputElement = getByPlaceholderText('Enter text');

    fireEvent.changeText(inputElement, 'abc123$%^');

    expect(onChangeTextMock).toHaveBeenCalledWith('abc123');
  });

  it('applies custom styles correctly', () => {
    const customStyle = {backgroundColor: 'red'};
    const {getByPlaceholderText} = render(
      <CTInput placeholder="Enter text" customStyle={customStyle} />,
    );
    const inputElement = getByPlaceholderText('Enter text');
    expect(inputElement.props.style).toContainEqual(customStyle);
  });

  it('applies maxLength correctly', () => {
    const maxLength = 10;
    const {getByPlaceholderText} = render(
      <CTInput placeholder="Enter text" maxLength={maxLength} />,
    );
    const inputElement = getByPlaceholderText('Enter text');
    expect(inputElement.props.maxLength).toBe(maxLength);
  });
});
