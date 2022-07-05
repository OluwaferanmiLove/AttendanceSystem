import React from 'react';
import {Platform, Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  AddLectureSessions,
  AdminHome,
  AdminList,
  LectureSessions,
} from '../screens';
import { colors } from '../constants/colors';


const AdminStack = createStackNavigator();

export default function AdminNav() {
  return (
    <AdminStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: colors.mainBg
        }
      }}>
        {/* <AdminStack.Screen component={AdminLogin} name={'AdminLogin'} /> */}
        <AdminStack.Screen component={AdminHome} name={'AdminHome'} />
        <AdminStack.Screen component={LectureSessions} name={'LectureSessions'} />
        <AdminStack.Screen component={AddLectureSessions} name={'AddLectureSessions'} />
    </AdminStack.Navigator>
  );
}
