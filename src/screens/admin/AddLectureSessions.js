import React, { useState, useContext, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { hp, wp } from '../../util/dimension';
import { colors } from '../../constants/colors';
import HeaderLite from '../../components/HeaderLite';
import ImageView from '../../components/ImageView';
import ActionCard from '../../components/ActionCard';
import { AppContext } from '../../context/AppContext';
import Button from '../../components/Button';
import  { Paystack }  from 'react-native-paystack-webview';
import Input from '../../components/Input';
import * as ImagePicker from 'expo-image-picker';
import { makeid } from '../../util/util';
import { useToast } from 'react-native-toast-notifications';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, doc, getFirestore, onSnapshot, query, setDoc } from 'firebase/firestore';
import Pressable from '../../components/Pressable';
import moment from 'moment';

function AddLectureSessions({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [courseTitle, setCourseTitle] = useState(null);
  const [courseCode, setCourseCode] = useState(null);
  const [dateTime, setDateTime] = useState(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setDateTime(date)
    hideDatePicker();
  };
  
  const { state } = useContext(AppContext);

  const toast = useToast();
  const db = getFirestore();
  // const storage = getStorage();

  const handleAddBook = async () => {
    setLoading(true);
    try {

      let dataId = makeid(20);

      const dbRefStyles = doc(db, 'lectureSessions', dataId);

      const data = {
        lecturer: state.user,
        courseCode,
        courseTitle,
        acceptingAttendance: false,
        dateTime: `${dateTime}`,
        started: false, 
        id: dataId,
      }

      // set user data in firestore
      let dataInfo = await setDoc(dbRefStyles, data);
      console.log(dataInfo);
      toast.show('Lecture session created successfull');
      navigation.goBack();
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.log(e)
    }
  }

  return (
    <SafeAreaView style={styles.main}>
      <HeaderLite title={'Create Lecture Session'} onPress={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
          <View style={{ marginTop: hp(15), flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Input
                label={'Course title'}
                onChangeText={(value) => setCourseTitle(value)}
                value={courseTitle}
                placeholder={'Enter course title'}/>
              <Input
                label={'Course code'}
                onChangeText={(value) => setCourseCode(value)}
                value={courseCode}
                placeholder={'Enter course code'}
                marginTop={hp(20)} />
              <Pressable
                label={'Select date and time'}
                placeholder={'Enter author'}
                value={dateTime ? moment(dateTime).format('ddd DD, MMM YYYY, hh:mm A') : 'Select Date'}
                onPress={showDatePicker} 
                marginTop={hp(20)} />
                {/* <Button title="Show Date Picker" onPress={showDatePicker} /> */}
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                date={dateTime ? new Date(dateTime) : new Date()}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>
          </View>
          {/* <View style={styles.roleContainer}>
          <Text style={styles.description}>{detail.language}</Text>
        </View> */}
          <View style={{ marginTop: hp(25) }}>
            <Button
              title={'Create Lecture session'}
              onPress={handleAddBook}
              loading={loading}
              dark />
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // marginHorizontal: wp(20),
  },
  content: {
    // alignItems: 'center',
    marginTop: hp(20),
    paddingHorizontal: wp(20),
  },
  title: {
    fontSize: hp(25),
    fontWeight: '700',
    color: colors.primary,
  },
  roleContainer: {
    backgroundColor: colors.primary + 20,
    marginTop: hp(8),
    paddingVertical: wp(4),
    paddingHorizontal: wp(25),
    borderRadius: wp(9999)
  },
  description: {
    // fontFamily: 'ApparelDisplayBold',
    marginTop: hp(8),
    fontSize: hp(16),
    color: colors.primary,
  },
  price: {
    fontSize: hp(25),
    fontWeight: '700',
    color: colors.primary,
  },
  actionContainer: {
    // position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: hp(10),
    marginBottom: hp(25),
  },
})

export default AddLectureSessions;