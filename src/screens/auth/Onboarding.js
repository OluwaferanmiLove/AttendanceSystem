import React, {useEffect, useContext} from 'react';
import {View, FlatList, StyleSheet, Text, TouchableOpacity, ImageBackground, Image, StatusBar} from 'react-native';
// import { StatusBar } from 'expo-status-bar';
import { hp, wp } from '../../util/dimension';
import { getFromStorage } from '../../util/storageUtil';
import {AppContext} from '../../context/AppContext'
import { login } from '../../context/action';
import Button from '../../components/Button';
import { colors } from '../../constants/colors';
function OnBoarding({navigation}) {
  const onboardingRef = React.useRef(null);

  const {dispatch} = useContext(AppContext);

  useEffect(() => {
    getFromStorage('userData')
    .then(res => {
      if(res) {
        dispatch(login(JSON.parse(res)));
      }
    })
  }, []);

  return (
    // <SafeAreaView style={styles.main}>
    <View style={styles.main} source={require('../../assets/bg.png')}>
        <StatusBar barStyle={'dark-content'} translucent backgroundColor={'#ffffff00'} />
        <View style={{ marginTop: hp(150), alignItems: 'center', justifyContent: 'center'}}>
          <Image
            // source={require('../../assets/logo.png')}
            source={require('../../assets/onBoardImage.png')}
            style={{width: wp(300), height: hp(260), resizeMode: 'contain'}}/>
        </View>
        <View style={{ marginTop: hp(80), alignItems: 'center', justifyContent: 'center', marginHorizontal: wp(25)}}>
          <Text style={styles.title}>Attendance System</Text>
          <Text style={styles.title}>With Facial Recognition</Text>
        </View>
        <View style={styles.button}>
          <Button
            title={'Get Started'}
            // bgColor={'#ffffff'}
            // textColor={colors.primary}
            dark
            onPress={() => navigation.navigate('Login')} />
          <View style={{marginTop: hp(15)}}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text
                style={{color: colors.primary, fontSize: wp(16)}}>
                  Don't have an account yet? Sign up now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    // </SafeAreaView>
  )
}

const styles=StyleSheet.create({
  main: {
    flex: 1,
    // backgroundColor: colors.primary
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: hp(40),
    width: wp(375),
  },
  title:{
    fontSize: wp(30),
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.primary,
  },
  button: {
    marginTop: hp(85),
    width: wp(375),
    alignItems: 'center',
    // position: 'absolute',
    // marginBottom: hp(60),
  }
})

export default OnBoarding;