import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MoreScreen from '../Screens/MoreScreen';
import Profile from '../Screens/Profile';

const MoreStacks = createStackNavigator();

const MoreStack = ({ navigation }) => (
  <MoreStacks.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <MoreStacks.Screen name="More" component={MoreScreen} />
    <MoreStacks.Screen name="UserProfile" component={Profile} />
  </MoreStacks.Navigator>
);
export default MoreStack;
