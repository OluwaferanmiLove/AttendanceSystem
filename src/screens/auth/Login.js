import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { colors } from '../../constants/colors';
import { login } from '../../context/action';
import { AppContext } from '../../context/AppContext';
import { hp, wp } from '../../util/dimension';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDocs, getFirestore, collection, getDoc } from 'firebase/firestore';
import { useToast } from 'react-native-toast-notifications'
import { saveToStorage } from '../../util/storageUtil';

let statusBarHeight = Platform.select({ios: hp(45), android: StatusBar.currentHeight});
function Login({navigation}) {
  const [email, setEmail] = useState(null);
  const [password, setPassWord] = useState(null);
  const [loading, setLoading] = useState(false);

  const {state, dispatch} = useContext(AppContext);

  const auth = getAuth();
  const db = getFirestore();
  // const userRef = collection(db, 'users')
  const userRef = collection(db, 'users')

  const toast = useToast()

  const handleLogin = async () => {
    // if(email === 'admin@gmail.com') {
    //   dispatch(login({role: 'admin'}))
    // } else {
    //   dispatch(login({role: 'user'}))
    // }
    try {
      setLoading(true);

      if(email === null) {
        toast.show('Email cannot be empty, please enter your email')
        setLoading(false);
        return;
      }

      if(password === null) {
        toast.show('Please enter password')
        setLoading(false);
        return;
      }

      //signin with firebase
      let loginRequest = await signInWithEmailAndPassword(auth, email, password);
      const userRef = doc(db, 'users', loginRequest.user.uid);

      //get user data in firestore
      let userInfo = await getDoc(userRef);
      let userData = {
        ...userInfo.data(),
        userId: loginRequest.user.uid
      };

      dispatch(login(userData))
      saveToStorage('userData', JSON.stringify(userData))
      
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })

      toast.show('Login successfull');
      setLoading(false)
    } catch (e) {
      toast.show(e.message)
      console.log(e.message)
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.main} behavior={Platform.select({ios: 'padding'})} keyb>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'} />
      <ScrollView style={{flex: 1}} keyboardShouldPersistTaps={true}>
        <View style={styles.mainContent}>
          <View style={styles.header}>
            {/* <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.backBtnContainer}>
                <Ionicons name={'arrow-back'} color={colors.secondaryDarker} size={wp(30)} />
              </View>
            </TouchableOpacity> */}
            <View>
              <Text style={styles.title}>Log in</Text>
              <Text style={styles.description}>get in again.</Text>
            </View>
          </View>
          <Input
            label={'Email'}
            marginTop={hp(25)}
            placeholder={'Email'}
            keyboardType={'email-address'}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            label={'Password'}
            marginTop={hp(26)}
            placeholder={'**********'}
            secureTextEntry
            onChangeText={(text) => setPassWord(text)}
          />
          <Button
            marginTop={hp(46)}
            dark
            loading={loading}
            title={'Login'}
            onPress={() => handleLogin()}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    // height: hp(812),
    width: wp(375),
    backgroundColor: colors.mainBg
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: hp(55),
    // paddingHorizontal: wp(20),
    width: wp(375),
  },
  backBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: wp(45),
    width: wp(45),
    borderRadius: 9999,
    backgroundColor: colors.secondary
  },
  title: {
    fontSize: hp(35),
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    fontSize: hp(16),
    color: '#00000050',
    marginTop: hp(4)
  },
  mainContent: {
    height: hp(812),
    // justifyContent: 'center',
    marginHorizontal: wp(20),
  },
})

export default Login;