import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import ClassListScreen from './src/screens/ClassListScreen';

const MainStack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen name="Home" component={HomeScreen} />
        <MainStack.Screen name="ClassList" component={ClassListScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
