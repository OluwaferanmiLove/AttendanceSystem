import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AdminNav from './AdminNav';
import { createStackNavigator } from '@react-navigation/stack';
import { BookDetails, EnrollFace, Lectureression, LectureSessions, Login, OnBoarding, PaymentHistory, Profile, Questions, SignUp, SubmitAttendance } from '../screens';
import { AppContext } from '../context/AppContext';
import { colors } from '../constants/colors';
import UserNav from './UserNav';
import AdminList from '../screens/admin/AdminList';

const MainStack = createStackNavigator()


export default function AttendanceSystem() {
  const {state} = useContext(AppContext);

  return (
    <NavigationContainer>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: colors.mainBg
          }
        }}>
          {!state.loggedin ? (
            <>
              <MainStack.Screen component={OnBoarding} name={'OnBoarding'} />
              <MainStack.Screen component={Login} name={'Login'} />
              <MainStack.Screen component={SignUp} name={'SignUp'} />
            </>
          ) : (
            <>
              {state.user.role === 'lecturer' && (
              <MainStack.Screen component={AdminNav} name={'AdminNav'} />
              )}
              {state.user.role === 'student' && (
                <MainStack.Screen component={UserNav} name={'UserNav'} />
              )}
                <MainStack.Screen component={Profile} name={'Profile'} />
                <MainStack.Screen component={EnrollFace} name={'EnrollFace'} />
                <MainStack.Screen component={SubmitAttendance} name={'SubmitAttendance'} />
                <MainStack.Screen component={Lectureression} name={'Lectureression'} />
                <MainStack.Screen component={AdminList} name={'AdminList'} />
                <MainStack.Screen component={PaymentHistory} name={'PaymentHistory'} />
                <MainStack.Screen component={BookDetails} name={'BookDetails'} />
            </>
          )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
