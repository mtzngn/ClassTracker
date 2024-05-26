import React, {useState} from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CTText from '../common/CTText';
import CTInput from '../common/CTInput';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getEmployeeDetails} from '../api/api';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  ClassList: {classList: ClassList[]};
};

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [employeeID, setEmployeeID] = useState('A2082387062');

  const extractClassList = (employeeData: Employee) => {
    // We don't need all the data that is available, filter here whats needed.
    const classes = employeeData?.data?.classes?.data || [];
    return classes.map((classItem: Class) => ({
      id: classItem.id,
      name: classItem.name,
      lessons: classItem.lessons.data
        .filter(lessonItem => lessonItem.employee === employeeID)
        .map(lessonItem => ({
          id: lessonItem.id,
          day: lessonItem.period.data.day,
          startTime: lessonItem.period.data.start_time,
          endTime: lessonItem.period.data.end_time,
        })),
    }));
  };

  const handleContinue = async () => {
    if (!employeeID) {
      Alert.alert('Error', 'Pleae enter your employee ID to continue', [
        {text: 'OK'},
      ]);
      return;
    }
    try {
      const employeeData: Employee = await getEmployeeDetails(employeeID);
      const classList: ClassList[] = extractClassList(employeeData);

      navigation.navigate('ClassList', {classList});
    } catch (error) {
      Alert.alert(
        'Error',
        'Employee details are not found. Make sure you have entered correct ID',
        [{text: 'OK'}],
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CTText style={styles.label}>Please enter your teacher ID</CTText>
      <CTInput
        style={styles.idInput}
        value={employeeID}
        maxLength={11}
        onChangeText={setEmployeeID}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}>
          <CTText style={styles.continueText}>Continue</CTText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
  },
  label: {
    width: '80%',
    fontWeight: 'normal',
  },
  idInput: {
    width: '80%',
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
  },
  continueButton: {
    height: 40,
    width: '100%',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4368FA',
  },
  continueText: {
    color: '#fff',
  },
});

export default HomeScreen;
