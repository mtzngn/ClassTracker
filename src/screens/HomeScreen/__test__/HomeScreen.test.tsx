import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';

jest.mock('../../../api/api', () => ({
  getEmployeeDetails: jest.fn(() =>
    Promise.resolve({data: {classes: {data: []}}}),
  ),
}));

describe('HomeScreen Component', () => {
  it('displays the label and input field', () => {
    const {getByText} = render(<HomeScreen />);
    expect(getByText('Please enter your teacher ID')).toBeTruthy();
    expect(getByText('Continue')).toBeTruthy();
  });

  it('updates employeeID state when input value changes', () => {
    const {getByPlaceholderText} = render(<HomeScreen />);
    const input = getByPlaceholderText('e.g. A2082387062');
    fireEvent.changeText(input, 'A1234567890');
    expect(input.props.value).toBe('A1234567890');
  });

  it('navigates to ClassList screen when Continue button is pressed with valid employeeID', async () => {
    const navigationMock = {
      navigate: jest.fn(),
    };
    const {getByText, getByPlaceholderText} = render(
      <HomeScreen navigation={navigationMock} />,
    );
    const input = getByPlaceholderText('e.g. A2082387062');
    fireEvent.changeText(input, 'A2082387062');
    fireEvent.press(getByText('Continue'));
    await waitFor(() => {
      expect(navigationMock.navigate).toHaveBeenCalledWith('ClassList', {
        classList: [],
      });
    });
  });
});
