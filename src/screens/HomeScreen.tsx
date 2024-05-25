import React, {useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CTText from '../common/CTText';
import CTInput from '../common/CTInput';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getEmployeeDetails} from '../api/api';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  ClassList: {filteredEmployee: FilteredEmployeeDetails[]};
};

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [employeeID, setEmployeeID] = useState('A2082387062');

  const filteredEmployeeDetails = (employeeData: Employee) => {
    const classes = employeeData?.data?.classes?.data || [];
    return classes.map((classItem: Class) => ({
      id: classItem.id,
      name: classItem.name,
      lessons: classItem.lessons.data.map(lessonItem => ({
        id: lessonItem.id,
        day: lessonItem.period.data.day,
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
      const filteredEmployee: FilteredEmployeeDetails[] =
        filteredEmployeeDetails(employeeData);
      navigation.navigate('ClassList', {filteredEmployee});
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
    <SafeAreaView style={styles.container}>
      <CTText>Please enter your teacher ID</CTText>
      <CTInput
        style={styles.idInput}
        value={employeeID}
        maxLength={11}
        onChangeText={setEmployeeID}
      />
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <CTText style={styles.continueText}>Continue</CTText>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  idInput: {
    width: '80%',
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  continueButton: {
    height: 40,
    width: 80,
    marginBottom: '10%',
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
