import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Animated from 'react-native-reanimated';
import { ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { colors } from '../global/styles';
import { CentreDetailTab } from '../global/routes';
const { width, height } = Dimensions.get('window');
function MyTabBar({ state, descriptors, navigation, position }) {
  return (
    <View style={{ height: '10%' }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabs}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                styles.tab,
                { backgroundColor: isFocused ? 'white' : '#E5E5E5' },
              ]}
            >
              <Animated.Text
                style={{
                  color: isFocused ? '#DB147F' : colors.grey2,
                  fontWeight: 'bold',
                }}
              >
                {label}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
const Tab = createMaterialTopTabNavigator();

export default function CentreDetailStack() {
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      {CentreDetailTab.map((e, index) => {
        const { name, component, options } = e;
        return (
          <Tab.Screen
            key={index}
            name={name}
            component={component}
            options={options}
          />
        );
      })}
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  tabs: {
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    paddingLeft: 15,
    paddingRight: 15,
  },
  tab: {
    width: 'auto',
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
