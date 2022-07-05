import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { hp, wp } from '../../util/dimension';
import { colors } from '../../constants/colors';
import HeaderLite from '../../components/HeaderLite';
import ImageView from '../../components/ImageView';
import ActionCard from '../../components/ActionCard';
import { AppContext } from '../../context/AppContext';
import { logout } from '../../context/action';
import { deleteFromStorage } from '../../util/storageUtil';
import BookCard from '../../components/BookCard';
import { collection, getFirestore, onSnapshot, query, where } from 'firebase/firestore';

function Profile({ navigation }) {
  const [selectedPill, setSelectedPill] = useState('bookmarks');
  const { state, dispatch } = useContext(AppContext);
  const [data, setData] = useState([]);

  const db = getFirestore();

  const dbRef = collection(db, 'payments');

  useEffect(() => {
    const q = query(dbRef, where('email', '==', state.user.email));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setData(data);
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
      <HeaderLite
        title={'Profile'}
        onPressLogOut={handleLogOut}
        onPress={state.user.role === 'admin' ? () => navigation.goBack() : null} />
      <View style={styles.content}>
        <ImageView width={wp(150)} height={wp(150)} image={{uri: state.user.image}} />
        <View style={{ marginTop: hp(10) }}>
          <Text style={styles.name}>{state.user.firstName} {state.user.lastName}</Text>
        </View>
        <View style={styles.roleContainer}>
          <Text style={styles.description}>{state.user.role}</Text>
        </View>
        {state.user.role !== 'admin' && (
          <>
            <View style={styles.paginationTop}>
              {/* <TouchableOpacity
            style={[
              styles.pill,
              {backgroundColor: selectedPill === 'bookmarks' ? '#ffffff' : '#ffffff00'}
            ]}
            onPress={() => setSelectedPill('bookmarks')}>
            <Text style={styles.pillTitle}>Bookmarks</Text>
          </TouchableOpacity> */}
              <TouchableOpacity
                style={[
                  styles.pill,
                  { backgroundColor: selectedPill === 'myBooks' ? '#ffffff' : '#ffffff00' }
                ]}
                onPress={() => setSelectedPill('myBooks')}>
                <Text style={styles.pillTitle}>My Previous Attendance</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={{ flex: 1, marginHorizontal: -wp(0) }}>
              <View style={styles.myBooks}>
                {data.map((item, index) => (
                  <BookCard
                    key={item.title}
                    title={item.title}
                    image={{ uri: item.image }}
                    price={item.price}
                  // onPress={() => navigateToBook(item)}
                  />
                ))}
              </View>
            </ScrollView>
          </>
        )}
        {/* <View style={{marginTop: hp(30)}}>
          <Text style={styles.name}>Actions</Text>
        </View>
        <View style={styles.actionContainer}>
          <ActionCard color={'#cc5500'} title={'Block User'} />
          <ActionCard color={'#bb0a1e'} title={'Delete User'} />
          <ActionCard color={'#092e20'} title={'Unblock User'} marginTop={hp(20)} width={wp(335)} />
        </View> */}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // marginHorizontal: wp(20),
  },
  content: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp(20),
    paddingHorizontal: wp(20),
  },
  name: {
    fontSize: hp(20),
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
    fontSize: hp(16),
    color: colors.primary,
  },
  paginationTop: {
    flexDirection: 'row',
    marginTop: hp(25),
    width: '100%',
    height: hp(55),
    paddingVertical: hp(10),
    paddingHorizontal: wp(4),
    backgroundColor: colors.primary + '20',
    borderRadius: 999999,
  },
  pill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    backgroundColor: '#ffffff',
    marginHorizontal: hp(10),
  },
  pillTitle: {
    fontSize: hp(16),
    fontWeight: '700',
    color: colors.primary,
  },
  myBooks: {
    flex: 1,
    width: '98%',
    // marginTop: hp(25),
    // paddingHorizontal: wp(20),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: hp(20)
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

export default Profile;