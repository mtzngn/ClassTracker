import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ClassCard from '../ClassCard';

describe('ClassCard Component', () => {
  const onPressMock = jest.fn();
  const testName = 'Test Class';
  const testId = 'test-id';

  it('renders correctly with provided name', () => {
    const {getByText} = render(
      <ClassCard id={testId} name={testName} onPress={onPressMock} />,
    );
    expect(getByText(testName)).toBeTruthy();
  });

  it('calls onPress callback when pressed', () => {
    const {getByText} = render(
      <ClassCard id={testId} name={testName} onPress={onPressMock} />,
    );
    const cardElement = getByText(testName);
    fireEvent.press(cardElement);
    expect(onPressMock).toHaveBeenCalled();
  });
});
