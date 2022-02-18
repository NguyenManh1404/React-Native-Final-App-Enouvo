import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './Main';
const AppStacks = createStackNavigator();
const AppStack = () => {
  return (
    <NavigationContainer>
      <AppStacks.Navigator>
        <AppStacks.Screen
          name="MainApp"
          component={Main}
          options={{
            headerShown: false,
          }}
        />
      </AppStacks.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
