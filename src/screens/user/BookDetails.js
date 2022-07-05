import React, { useState, useContext, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator, Switch } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { hp, wp } from '../../util/dimension';
import { colors } from '../../constants/colors';
import HeaderLite from '../../components/HeaderLite';
import ImageView from '../../components/ImageView';
import ActionCard from '../../components/ActionCard';
import { AppContext } from '../../context/AppContext';
import Button from '../../components/Button';
import { collection, doc, getFirestore, setDoc, onSnapshot, query, where } from 'firebase/firestore';
import { makeid } from '../../util/util';
import { useToast } from 'react-native-toast-notifications';
import moment from 'moment'

function BookDetails({ navigation, route }) {
  const [addAdminModal, setAddAdminModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [attendance, setAttendances] = useState([]);

  const { state } = useContext(AppContext);

  const toast = useToast();

  const { detail } = route.params;
  console.log(detail)

  const paystackWebViewRef = useRef();

  const db = getFirestore();

  const dbRef = collection(db, 'attendances');

  useEffect(() => {
    const q = query(dbRef, where('email', '==', state.user.email), where('id', '==', detail.id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      console.log(data);
      setData(data);
    },
      (error) => {
        console.log(error.message);
      });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const attendanceRef = collection(db, 'attendances');
    const q = query(attendanceRef, where('courseCode', '==', detail.courseCode), where('id', '==', detail.id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      console.log(data);
      setAttendances(data);
    },
      (error) => {
        console.log(error.message);
      });

    return () => unsubscribe();
  }, []);

  const toggleSwitch = async () => {
    try {
      setLoading(true);

      let data = {
        acceptingAttendance: !detail.acceptingAttendance,
      };
      // console.log(data);

      const dataRef = doc(db, 'lectureSessions', detail.id);

      // set data in firestore
      let Info = await setDoc(dataRef, data, { merge: true });
      toast.show('Attendance status change successfull');
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <HeaderLite title={detail.courseTitle} onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={{ marginTop: hp(15), flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flex: 0.8 }}>
            <Text style={styles.title}>{detail.courseCode}</Text>
            <Text style={styles.description}>Lecturer: {detail.lecturer.firstName} {detail.lecturer.lastName}</Text>
            <Text style={styles.description}>{moment(detail.dateTime).format('ddd DD, MMM YYYY, hh:mm A')}</Text>
          </View>
          {/* <Text style={styles.price}>N {detail.price}</Text> */}
          {state.user.role === 'lecturer' && (
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[styles.title, { fontSize: wp(13) }]}>Activate</Text>
              <Text style={[styles.title, { fontSize: wp(13) }]}>Attendance</Text>
              <Switch
                // trackColor={{ false: "#767577", true: "#81b0ff" }}
                // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                // ios_backgroundColor="#3e3e3e"
                style={{ marginTop: hp(10) }}
                onValueChange={toggleSwitch}
                value={detail.acceptingAttendance} />
            </View>
          )}
        </View>
        {state.user.role === 'student' && data.length === 0 && (
          <View style={{ alignItems: 'flex-end' }}>
            <Button
              title={'Submit attendance'}
              marginTop={hp(25)}
              onPress={() => navigation.navigate('SubmitAttendance', detail)}
              dark />
          </View>
        )}
        {state.user.role === 'student' && data.length > 0 && (
          <View style={{ marginTop: hp(25) }}>
            <Text style={[styles.title, { fontSize: wp(15), textAlign: 'center' }]}>You have already submitted your attendance</Text>
          </View>
        )}
        {state.user.role === 'lecturer' && (
          <>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp(25) }}>
            <Text style={[styles.title, { fontSize: wp(18) }]}>Stuent's Attendance</Text>
          </View>
          <View>
            {attendance.map((item, index) => (
              <View style={{flexDirection: 'row', marginTop: hp(25), alignItems: 'center'}}>
                <ImageView image={{uri: item.image}} />
                <View>
                  <Text style={[styles.title, {marginLeft: wp(15), fontSize: wp(18)}]}>{item.firstName} {item.lastName}</Text>
                  <Text style={[styles.title, {marginLeft: wp(15), fontSize: wp(14)}]}>Submitted: {moment(item.submittedAt).format('DD MMM YYYY, hh:mm a')}</Text>
                </View>
              </View>
            ))}
          </View>
          </>
        )}
        {/* <View style={styles.roleContainer}>
          <Text style={styles.description}>{detail.language}</Text>
        </View> */}
      </View>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size={'small'} color={colors.white} />
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // marginHorizontal: wp(20),
  },
  imageContainer: {
    // width: wp(55),
    // height: wp(55),
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#eee',
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
  loading: {
    flex: 1,
    position: 'absolute',
    height: hp(812),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000090',
  }
})

export default BookDetails;