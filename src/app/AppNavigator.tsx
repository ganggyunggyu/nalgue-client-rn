import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import Log from './screens/Log';

import Profile from './screens/Profile';

import { Ionicons } from '@expo/vector-icons';
import MyLogs from './screens/MyLog';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeMain"
      component={Home}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const LogStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="LogMain"
      component={Log}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const MyLogsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MyLogsMain"
      component={MyLogs}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ProfileMain"
      component={Profile}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#F8F4E3',
        borderTopWidth: 0,
        height: 70,
      },
      tabBarActiveTintColor: '#3B3A36',
      tabBarInactiveTintColor: '#9E9E9E',
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home-outline" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Log"
      component={LogStack}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="create-outline" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="MyLogs"
      component={MyLogsStack}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="book-outline" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStack}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person-outline" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);
