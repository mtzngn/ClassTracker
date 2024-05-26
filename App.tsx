import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import ClassListScreen from './src/screens/ClassListScreen/ClassListScreen';
import ClassDetailsScreen from './src/screens/ClassDetailsScreen/ClassDetailsScreen';

const MainStack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="ClassList"
          component={ClassListScreen}
          options={{headerTitle: 'Class List'}}
        />
        <MainStack.Screen
          name="ClassDetails"
          component={ClassDetailsScreen}
          options={{headerTitle: 'Class Details'}}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
