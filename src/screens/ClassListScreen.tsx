// ClassListScreen.tsx
import React from 'react';
import {Alert, ScrollView} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import ClassCard from '../components/ClassCard';
import CTText from '../common/CTText';
import {getClassDetails} from '../api/api';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  ClassList: {filteredEmployee: FilteredEmployeeDetails[]};
  ClassDetails: {studentList: Student[]};
};

interface ClassListScreenProps {
  route: RouteProp<
    {params: {filteredEmployee: FilteredEmployeeDetails[]}},
    'params'
  >;
  navigation: StackNavigationProp<RootStackParamList, 'ClassList'>;
}

const ClassListScreen: React.FC<ClassListScreenProps> = ({
  navigation,
  route,
}: ClassListScreenProps) => {
  const {filteredEmployee} = route.params;

  const extractStudentList = (studentData: Class) => {
    const students = studentData?.data?.students?.data || [];
    return students.map(student => ({
      forname: student.forname,
      surname: student.surname,
    }));
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  const classesForDay = (details: FilteredEmployeeDetails[], day: string) => {
    const filteredArray: FilteredEmployeeDetails[] = [];
    details.forEach(detail => {
      detail.lessons.forEach(lesson => {
        if (lesson.day === day) {
          filteredArray.push(detail);
        }
      });
    });
    return filteredArray;
  };

  const handleCardPress = async (classId: string) => {
    try {
      const classData: Class = await getClassDetails(classId);
      const studentList = extractStudentList(classData);
      navigation.navigate('ClassDetails', {studentList});
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Error',
        'Employee details are not found. Make sure you have entered correct ID',
        [{text: 'OK'}],
      );
    }
  };

  return (
    <ScrollView>
      {days.map(day => (
        <>
          <CTText>{day}</CTText>
          {classesForDay(filteredEmployee, day).map(item => (
            <ClassCard
              id={item.id}
              name={item.name}
              onPress={() => handleCardPress(item.id)}
            />
          ))}
        </>
      ))}
    </ScrollView>
  );
};

// const styles = StyleSheet.create({
//   listContainer: {
//     padding: 16,
//   },
// });

export default ClassListScreen;
