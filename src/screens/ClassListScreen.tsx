// ClassListScreen.tsx
import React from 'react';
import {View, Alert, ScrollView, StyleSheet} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import ClassCard from '../components/ClassCard';
import CTText from '../common/CTText';
import {getClassDetails} from '../api/api';
import {StackNavigationProp} from '@react-navigation/stack';
import {bg} from '../themes/colors';

type RootStackParamList = {
  ClassList: {classList: ClassList[]};
  ClassDetails: {studentList: Student[]; startTime: string; endTime: string};
};

interface ClassListScreenProps {
  route: RouteProp<{params: {classList: ClassList[]}}, 'params'>;
  navigation: StackNavigationProp<RootStackParamList, 'ClassList'>;
}

const ClassListScreen: React.FC<ClassListScreenProps> = ({
  navigation,
  route,
}: ClassListScreenProps) => {
  const {classList} = route.params;

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const extractStudentList = (studentData: Class) => {
    const students = studentData?.data?.students?.data || [];
    return students.map(student => ({
      forename: student.forename,
      surname: student.surname,
    }));
  };

  // Extract the classes that are happening for a given day.
  const classesForDay = (details: ClassList[], day: string) => {
    const filteredArray: ClassList[] = [];
    details.forEach(detail => {
      detail.lessons.forEach(lesson => {
        if (lesson.day === day.toLowerCase()) {
          filteredArray.push({
            id: detail.id,
            name: detail.name,
            lessons: [lesson],
          });
        }
      });
    });

    return filteredArray;
  };

  const handleCardPress = async (
    classId: string,
    startTime: string,
    endTime: string,
  ) => {
    try {
      const classData: Class = await getClassDetails(classId);
      const studentList = extractStudentList(classData);
      navigation.navigate('ClassDetails', {studentList, startTime, endTime});
    } catch (error) {
      Alert.alert(
        'Error',
        'Employee details are not found. Make sure you have entered correct ID',
        [{text: 'OK'}],
      );
    }
  };

  const renderClassesForDay = (day: string) => {
    return classesForDay(classList, day).map(item => (
      <ClassCard
        id={item.id}
        name={item.name}
        key={`${item.name}${item.lessons[0].endTime}`}
        onPress={() =>
          handleCardPress(
            item.id,
            item.lessons[0].startTime,
            item.lessons[0].endTime,
          )
        }
      />
    ));
  };

  return (
    <ScrollView style={styles.container}>
      {classList && classList.length > 0 ? (
        days.map(
          (day, index) =>
            classesForDay(classList, day).length > 0 && (
              <View key={index}>
                <CTText style={styles.dayText} key={day}>
                  {day}
                </CTText>
                {renderClassesForDay(day)}
              </View>
            ),
        )
      ) : (
        <CTText>No classes to show</CTText>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: bg,
  },
  dayText: {
    fontSize: 28,
    fontWeight: 'normal',
    paddingLeft: 16,
  },
  listContainer: {
    padding: 16,
  },
});

export default ClassListScreen;
