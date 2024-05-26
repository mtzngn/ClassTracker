import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import CTText from '../common/CTText';

interface Student {
  forename: string;
  surname: string;
}

interface ClassDetailsScreenProps {
  route: RouteProp<
    {params: {studentList: Student[]; startTime: string; endTime: string}},
    'params'
  >;
}

const ClassDetailsScreen: React.FC<ClassDetailsScreenProps> = ({route}) => {
  const {studentList, startTime, endTime} = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <CTText style={styles.title}>Attendees</CTText>
        <CTText style={styles.time}>{`${startTime} - ${endTime}`}</CTText>
      </View>
      <View style={styles.separator} />
      {studentList.map((student, index) => (
        <View key={index} style={styles.studentContainer}>
          <CTText style={styles.studentName}>
            {student.forename} {student.surname}
          </CTText>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9', // Light background color
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 16,
    color: '#666',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginBottom: 16,
  },
  studentContainer: {
    marginBottom: 8,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
  },
  studentName: {
    fontSize: 18,
  },
});

export default ClassDetailsScreen;
