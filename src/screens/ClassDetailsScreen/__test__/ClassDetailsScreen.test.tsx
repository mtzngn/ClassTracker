import React from 'react';
import {render} from '@testing-library/react-native';
import ClassDetailsScreen from '../ClassDetailsScreen';

describe('ClassDetailsScreen Component', () => {
  it('displays the correct attendees and time', () => {
    const studentList = [
      {forename: 'Frodo', surname: 'Baggins'},
      {forename: 'Gollum', surname: 'Smeagol'},
    ];
    const startTime = '9:00';
    const endTime = '10:00';
    const {getByText} = render(
      <ClassDetailsScreen
        route={{params: {studentList, startTime, endTime}}}
      />,
    );
    expect(getByText('Frodo Baggins')).toBeTruthy();
    expect(getByText('Gollum Smeagol')).toBeTruthy();
    expect(getByText('9:00 - 10:00')).toBeTruthy();
  });

  // Add more test cases as needed
});
