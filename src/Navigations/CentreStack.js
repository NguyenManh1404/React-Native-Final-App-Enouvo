import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CentreScreen from '../Screens/CentreScreen';
import AddCentreScreen from '../Screens/AddCentreScreen';
import CentreDetailStack from './CentreDetailStack';
const CentreStacks = createStackNavigator();

const CentreStack = ({ navigation }) => (
  <CentreStacks.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      },
    }}
  >
    <CentreStacks.Screen
      name="SiteEvents"
      component={CentreScreen}
      options={{
        headerShown: false,
      }}
    />
    <CentreStacks.Screen name="AddCentre" component={AddCentreScreen} />
    <CentreStacks.Screen
      name="CentreDetail"
      component={CentreDetailStack}
      options={{
        headerTitle: 'Centre Details',
        headerTitleAlign: 'center',
      }}
    />
  </CentreStacks.Navigator>
);
export default CentreStack;
