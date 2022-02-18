import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
const HomeStack = createStackNavigator();

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <HomeStack.Screen
      name="Dashboard"
      component={Home}
      options={{ headerShown: false }}
    />
  </HomeStack.Navigator>
);
export default HomeStackScreen;
