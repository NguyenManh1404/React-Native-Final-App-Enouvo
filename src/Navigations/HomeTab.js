import React, { useEffect } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../global/styles';
import { Text } from 'react-native';
import HomeStackScreen from './HomeStacks';
import CentreStack from './CentreStack';
import MoreStack from './MoreStack';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeData } from '../global/actions/centreData';
import { getDatabase, onValue, ref } from 'firebase/database';
const HomeTabs = createBottomTabNavigator();

const HomeTab = (props) => {
  const { actions } = props;
  useEffect(async () => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const db = getDatabase();
      const reference = await ref(db, `Centres`);
      onValue(reference, (snapshot) => {
        actions.changeData(snapshot.val());
      });
    } catch (error) {}
  };
  return (
    <HomeTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.buttons,
        tabBarStyle: [{ display: 'flex' }, null],
      }}
    >
      <HomeTabs.Screen
        name="HomeScreen"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({ color, size, focused }) => (
            <Text
              style={{
                color: focused ? '#DB147F' : colors.grey2,
                fontSize: 15,
                fontWeight: focused ? 'bold' : 'normal',
              }}
            >
              Dashboard
            </Text>
          ),
          tabBarColor: '#fff',
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5
              name="home"
              size={size}
              color={focused ? '#DB147F' : colors.grey2}
            />
          ),
        }}
      />
      <HomeTabs.Screen
        name="CentreScreen"
        component={CentreStack}
        options={{
          headerShown: false,
          tabBarLabel: ({ color, size, focused }) => (
            <Text
              style={{
                color: focused ? '#DB147F' : colors.grey2,
                fontSize: 15,
                fontWeight: focused ? 'bold' : 'normal',
              }}
            >
              Centres
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5
              name="store"
              size={size}
              color={focused ? '#DB147F' : colors.grey2}
            />
          ),
        }}
      />
      <HomeTabs.Screen
        name="MoreScreen"
        component={MoreStack}
        options={{
          headerTitle: 'More',
          headerTitleAlign: 'center',
          headerStyle: {
            borderBottomWidth: 1,
          },
          tabBarLabel: ({ color, size, focused }) => (
            <Text
              style={{
                color: focused ? '#DB147F' : colors.grey2,
                fontSize: 15,
                fontWeight: focused ? 'bold' : 'normal',
              }}
            >
              More
            </Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome
              name="ellipsis-h"
              size={size}
              color={focused ? '#DB147F' : colors.grey2}
            />
          ),
        }}
      />
    </HomeTabs.Navigator>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const ActionCreators = Object.assign({ changeData: changeData });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeTab);
