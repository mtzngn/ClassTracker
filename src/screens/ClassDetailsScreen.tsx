import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RouteProp} from '@react-navigation/native';

interface ClassDetailsScreenProps {
  route: RouteProp<{params: {studentList: Student[]}}, 'params'>;
}

const ClassDetailsScreen: React.FC<ClassDetailsScreenProps> = ({route}) => {
  const {studentList} = route.params;

  return (
    <View style={styles.container}>
      {studentList.map((student, index) => (
        <View key={index} style={styles.studentContainer}>
          <Text>{`Name: ${student.forname}`}</Text>
          <Text>{`Surname: ${student.surname}`}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  studentContainer: {
    marginBottom: 16,
  },
});

export default ClassDetailsScreen;
