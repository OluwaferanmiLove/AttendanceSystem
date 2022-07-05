import React, {useState} from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../util/dimension';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { login } from '../../../context/action';
import { useToast } from 'react-native-toast-notifications';
import { getApp, initializeApp } from "firebase/app";

function AddAdminModal({ isVisible, onPressCancel }) {
  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [password, setPassWord] = useState(null);
  const [loading, setLoading] = useState(false);
    
  const config = {
    apiKey: "AIzaSyBaeGV7OramapCPlnYr7uoZBsYCHZmEkf8",
    authDomain: "attendancesystem-8bf6d.firebaseapp.com",
    projectId: "attendancesystem-8bf6d",
    storageBucket: "attendancesystem-8bf6d.appspot.com",
    messagingSenderId: "804701387660",
    appId: "1:804701387660:web:3f18ee5e3e9a2cf12f74a9"
  };
  
  let secondaryApp;
  let auth;

  try {
    const SecondaryApp = getApp('Secondary');
    if(SecondaryApp) {
      auth = getAuth(SecondaryApp);
    }
  } catch (error) {
    secondaryApp = initializeApp(config, "Secondary");
    auth = getAuth(secondaryApp);
  }

  const db = getFirestore();
  const userRef = collection(db, 'users')

  const toast = useToast()

  const handleAddAdmin = async () => {
    // dispatch(login({role: 'student'}))
    try {
      setLoading(true);

      if(firstName === null || lastName === null) {
        toast.show('Please review your input, all field must be filed');
        setLoading(false);
        return;
      }

      if(email === null) {
        toast.show('Email cannot be empty, please enter your email');
        setLoading(false);
        return;
      }

      if(password === null) {
        toast.show('Please enter password');
        setLoading(false);
        return;
      }

      let userData = {
        firstName,
        lastName,
        email,
        role: 'lecturer',
      }

      //signin with firebase
      let signUpRequest = await createUserWithEmailAndPassword(auth, email, password);
      const userRef = doc(db, 'users', signUpRequest.user.uid);
      console.log(signUpRequest.user.uid)

      // set user data in firestore
      let userInfo = await setDoc(userRef, userData);
      toast.show('Admin added successfull');
      setEmail(null);
      setFirstName(null);
      setLastName(null);
      setPassWord(null);
      setLoading(false);
      onPressCancel();
    } catch (e) {
      toast.show(e.message)
      console.log(e.message)
      setLoading(false)
    }
  }

  return (
    <Modal
      isVisible={isVisible}
      coverScreen={false}
      hasBackdrop={true}
      backdropOpacity={0.5}
      swipeDirection={'down'}
      onSwipeComplete={onPressCancel}
      onBackdropPress={onPressCancel}
      animationIn="slideInUp"
      style={{
        // width: '100%',
        // bottom: 0,
        margin: 0,
        height: '100%',
        justifyContent: 'flex-end',
        // backgroundColor: colors.mainBg,

      }}>
      <View style={styles.main}>
        <View style={{ marginTop: hp(20), alignItems: 'center', paddingHorizontal: wp(20) }}>
          <View style={{width: wp(120), height: hp(4), backgroundColor: '#eee', borderRadius: 999}} />
        </View>
        <View style={styles.header}>
          <View style={{ marginLeft: wp(15), marginTop: hp(25) }}>
            <Text style={styles.title}>Add new admin</Text>
          </View>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ marginTop: hp(10) }}>
            {/* <View style={styles.content}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: 'https://nwsid.net/wp-content/uploads/2015/05/dummy-profile-pic.png' }} style={styles.image} />
                <TouchableOpacity style={{
                  position: 'absolute',
                  backgroundColor: colors.primary + 30,
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Text style={{ fontSize: wp(14), color: colors.primary }}> + Add picture</Text>
                </TouchableOpacity>
              </View>
            </View> */}
            <View style={{ marginTop: hp(25) }}>
              {/* <View style={{ marginLeft: wp(20) }}>
                <Text style={styles.title}>Enter admin details</Text>
              </View> */}
              <View style={styles.content}>
                <Input
                  label={'First name'}
                  placeholder={'Enter first name'}
                  onChangeText={(text) => setFirstName(text)}
                  value={firstName}
                  marginTop={hp(15)}
                />
                <Input
                  label={'Last name'}
                  placeholder={'Enter last name'}
                  marginTop={hp(15)}
                  value={lastName}
                  onChangeText={(text) => setLastName(text)}
                />
                <Input
                  label={'Lecturer email'}
                  placeholder={'Enter email'}
                  keyboardType={'email-address'}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  marginTop={hp(15)}
                />
                <Input
                  label={'Password'}
                  marginTop={hp(26)}
                  placeholder={'**********'}
                  secureTextEntry
                  value={password}
                  onChangeText={(text) => setPassWord(text)}
                />
              </View>
            </View>
            <View style={[styles.content, { marginTop: hp(35), paddingBottom: hp(30) }]}>
              <Button
                dark
                loading={loading}
                onPress={handleAddAdmin}
                title={'Add Lecturer'} />
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // height: hp(460),
    backgroundColor: '#ffffff',
    borderTopRightRadius: wp(10),
    borderTopLeftRadius: wp(10),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: hp(20),
    color: colors.primary,
    fontWeight: '700',
  },
  description: {
    // fontFamily: 'ApparelDisplayBold',
    fontSize: hp(16),
    color: colors.secondaryDarker,
    marginTop: hp(4)
  },
  content: {
    alignItems: 'center',
    // marginTop: hp(20)
    // marginHorizontal: wp(20),
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    height: wp(130),
    width: wp(130),
    borderRadius: 9999,
    backgroundColor: colors.primary + 20,
  },
  image: {
    height: wp(130),
    width: wp(130),
    borderRadius: 9999,
    resizeMode: 'cover',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: hp(5)
  },
})

export default AddAdminModal;