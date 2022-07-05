import React, { useContext } from 'react';
import {Platform, Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Home,
  Profile,
} from '../screens';
import { AntDesign, Foundation, Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { hp, wp } from '../util/dimension';
import { AppContext } from '../context/AppContext';

const UserTab = createBottomTabNavigator();

export default function UserNav () {
  return (
    <UserTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarLabel: ({focused, color}) => (
          <Text>Test</Text>
        ),
        tabBarLabelStyle: {
          fontSize: hp(14)
        },
        tabBarStyle: {
          backgroundColor: colors.mainBg,
          height: Platform.select({android: hp(65), ios: hp(78)}),
          shadowColor: 'transparent',
          // shadowOffset: {
          //   width: 0,
          //   height: 1,
          // },
          borderTopWidth: 0,
          shadowOpacity: 0,
          shadowRadius: 5,
          elevation: 0,
        }
      }}>
      <UserTab.Screen component={Home} name={'Home'} options={{
        tabBarIcon: ({focused, color, size}) => {
          if (focused) {
            return <Foundation name={'home'} size={28} color={colors.primary} />
          } else {
            return <AntDesign name={'home'} size={28} color={colors.primaryLighter} />
          }
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
      }} />
      <UserTab.Screen component={Profile} name={'Profile'} options={{
        tabBarIcon: ({focused, color, size}) => {
          if (focused) {
            return <Ionicons name={'person'} size={28} color={colors.primary} />
          } else {
            return <Ionicons name={'person-outline'} size={28} color={colors.primaryLighter} />
          }
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
      }} />
    </UserTab.Navigator>
  )
}
