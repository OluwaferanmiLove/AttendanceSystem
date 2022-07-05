import React, {useContext, useState, useEffect} from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import Header from '../../components/Header';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../util/dimension';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AppContext } from '../../context/AppContext';
import ActionCards from './components/ActionCards';
import { generateColor } from '../../util/randomColor';
import ImageView from '../../components/ImageView';
import { logout } from '../../context/action';
import { collection, getFirestore, onSnapshot, query } from 'firebase/firestore';
import { deleteFromStorage } from '../../util/storageUtil';

function AdminHome ({navigation}) {
  const {state, dispatch} = useContext(AppContext);
  const [dataLength, setDataLength] = useState(0);

  const db = getFirestore();

  const dbRef = collection(db, 'books');

  useEffect(() => {
    const q = query(dbRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
          data.push(doc.data());
      });
      setDataLength(data.length);
    },
    (error) => {
      console.log(error.message);
    });
    
    return () => unsubscribe();
  }, []);

  const handleLogOut = () => {
    deleteFromStorage('userData')
    .then(() => {
      dispatch(logout())
    })
  }

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'} />
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.userInfoContainer}>
            <Text style={styles.name}>{state.user.firstName} {state.user.lastName}</Text>
            <Text style={styles.description}>{state.user.role}</Text>
          </View>
          <TouchableOpacity onPress={handleLogOut}>
            <View  style={styles.iconContainer}>
              <Ionicons name={'log-out-outline'} size={wp(20)} color={colors.primary} />
            </View>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>
            Total number of books
          </Text>
          <Text style={styles.infoValue}>
            {dataLength}
          </Text>
        </View> */}
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Actions</Text>
        </View>
        <View style={styles.content}>
          <ActionCards
            marginTop={hp(25)}
            onPress={() => navigation.navigate('LectureSessions')}
            title={'View and Create'}
            iconName={'book-outline'}
            value={'Lectures Classes'}
          />
          {/* <ActionCards
            marginTop={hp(25)}
            onPress={() => navigation.navigate('PaymentHistory')}
            iconName={'cash-outline'}
            title={'Previous'}
            value={'Attendance'}
          /> */}
          <ActionCards
            marginTop={hp(25)}
            onPress={() => navigation.navigate('AdminList')}
            title={'Add'}
            iconName={'person-outline'}
            value={'Lecturer'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginHorizontal: wp(20),
  },
  header: {
    marginTop: hp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfoContainer: {
    flex: 1,
  },
  name: {
    fontSize: wp(26),
    fontWeight: '500',
    color: colors.primary
  },
  description: {
    fontSize: wp(16),
    textTransform: 'capitalize',
    fontWeight: '300',
    color: colors.primary
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(40),
    height: wp(40),
    borderRadius: 7,
    backgroundColor: colors.primary + '15',
  },
  infoContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: hp(20),
    paddingVertical: hp(22),
    borderRadius: wp(10),
    backgroundColor: colors.primary,
  },
  infoTitle: {
    fontSize: wp(16),
    fontWeight: '300',
    color: '#ffffff90',
  },
  infoValue: {
    fontSize: wp(35),
    fontWeight: '700',
    marginTop: hp(10),
    color: '#ffffff'
  },
  sectionTitleContainer: {
    marginTop: hp(25),
  },
  sectionTitle: {
    fontSize: wp(22),
    fontWeight: '700',
    color: colors.primary
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: hp(20)
  }
})

export default AdminHome;