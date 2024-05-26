import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import ClassListScreen from '../ClassListScreen';

jest.mock('../../../api/api', () => ({
  getClassDetails: jest.fn(() =>
    Promise.resolve({data: {students: {data: []}}}),
  ),
}));

describe('ClassListScreen Component', () => {
  it('displays the day text and class cards for each day', () => {
    const classList = [
      {
        id: '1',
        name: 'Class A',
        lessons: [{day: 'monday', startTime: '9:00', endTime: '10:00'}],
      },
      {
        id: '2',
        name: 'Class B',
        lessons: [{day: 'tuesday', startTime: '10:00', endTime: '11:00'}],
      },
    ];
    const {getByText} = render(
      <ClassListScreen route={{params: {classList}}} />,
    );
    expect(getByText('Monday')).toBeTruthy();
    expect(getByText('Tuesday')).toBeTruthy();
    expect(getByText('Class A')).toBeTruthy();
    expect(getByText('Class B')).toBeTruthy();
  });

  it('displays "No classes to show" message when classList is empty', () => {
    const {getByText} = render(
      <ClassListScreen route={{params: {classList: []}}} />,
    );
    expect(getByText('No classes to show')).toBeTruthy();
  });

  it('navigates to ClassDetails screen when a class card is pressed', async () => {
    const navigationMock = {
      navigate: jest.fn(),
    };
    const classList = [
      {
        id: '1',
        name: 'Class A',
        lessons: [{day: 'monday', startTime: '9:00', endTime: '10:00'}],
      },
    ];
    const {getByText} = render(
      <ClassListScreen
        navigation={navigationMock}
        route={{params: {classList}}}
      />,
    );
    fireEvent.press(getByText('Class A'));
    await waitFor(() => {
      expect(navigationMock.navigate).toHaveBeenCalledWith('ClassDetails', {
        studentList: [],
        startTime: '9:00',
        endTime: '10:00',
      });
    });
  });
});
