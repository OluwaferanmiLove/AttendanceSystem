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
import { login, signUp } from '../../context/action';
import { AppContext } from '../../context/AppContext';
import { hp, wp } from '../../util/dimension';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDocs, getFirestore, collection, getDoc, setDoc } from 'firebase/firestore';
import { useToast } from 'react-native-toast-notifications'

let statusBarHeight = Platform.select({ios: hp(45), android: StatusBar.currentHeight});
function SignUp({navigation}) {
  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [matricNumber, setMatricNumber] = useState(null);
  const [password, setPassWord] = useState(null);
  const [comPassword, setComPassWord] = useState(null);
  const [loading, setLoading] = useState(false);

  const {state, dispatch} = useContext(AppContext);

  const auth = getAuth();
  const db = getFirestore();
  // const userRef = collection(db, 'users')
  const userRef = collection(db, 'users')

  const toast = useToast()

  const handleSignUp = async () => {
    try {
      setLoading(true);

      if(firstName === null || lastName === null || matricNumber === null) {
        toast.show('Please review your input, all field must be filed')
        setLoading(false);
        return;
      }

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

      let userData = {
        firstName,
        lastName,
        matricNumber,
        email,
        role: 'student',
        faceEnrolled: false,
      }

      //signin with firebase
      let signUpRequest = await createUserWithEmailAndPassword(auth, email, password);
      const userRef = doc(db, 'users', signUpRequest.user.uid);
      console.log(signUpRequest)
      console.log(signUpRequest.user.uid)

      // set user data in firestore
      let userInfo = await setDoc(userRef, userData);
      toast.show('SignUp successfull');
      navigation.navigate('Login');
      setLoading(false)
    } catch (e) {
      toast.show(e.message)
      console.log(e.message)
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.main} behavior={Platform.select({ios: 'padding'})} >
      <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'} />
      <ScrollView style={{flex: 1}} keyboardShouldPersistTaps={'always'}>
        <View style={styles.mainContent}>
          <View style={styles.header}>
            {/* <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.backBtnContainer}>
                <Ionicons name={'arrow-back'} color={colors.secondaryDarker} size={wp(30)} />
              </View>
            </TouchableOpacity> */}
            <View>
              <Text style={styles.title}>Sign Up</Text>
              <Text style={styles.description}>Sign up now to get in.</Text>
            </View>
          </View>
          <Input
            label={'First name'}
            marginTop={hp(25)}
            placeholder={'First name'}
            onChangeText={(text) => setFirstName(text)}
          />
          <Input
            label={'Last name'}
            marginTop={hp(25)}
            placeholder={'Last name'}
            onChangeText={(text) => setLastName(text)}
          />
          <Input
            label={'Email'}
            marginTop={hp(25)}
            placeholder={'Email'}
            keyboardType={'email-address'}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            label={'Matric Number'}
            marginTop={hp(25)}
            placeholder={'Matric Number'}
            onChangeText={(text) => setMatricNumber(text)}
          />
          <Input
            label={'Password'}
            marginTop={hp(26)}
            placeholder={'**********'}
            secureTextEntry
            onChangeText={(text) => setPassWord(text)}
          />
          <Input
            label={'Confirm Password'}
            marginTop={hp(26)}
            placeholder={'**********'}
            secureTextEntry
            onChangeText={(text) => setComPassWord(text)}
          />
          <Button
            marginTop={hp(46)}
            dark
            loading={loading}
            title={'SignUp'}
            onPress={() => handleSignUp()}
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
    paddingBottom: hp(20),
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
    flex: 1,
    paddingBottom: hp(30),
    // height: hp(812),
    // justifyContent: 'center',
    marginHorizontal: wp(20),
  },
})

export default SignUp;