import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { hp, wp } from '../../util/dimension';
import { colors } from '../../constants/colors';
import Input from '../../components/Input';
import HeaderLite from '../../components/HeaderLite';
import Userlist from '../../components/Userlist';
import { users } from '../../constants/mockData';
import Button from '../../components/Button';
import { useToast } from 'react-native-toast-notifications';
import { collection, getDocs, getFirestore, onSnapshot, query, where } from 'firebase/firestore';
import { AppContext } from '../../context/AppContext';
import PayHistoryCard from '../../components/PayHistoryCard';

function PaymentHistory({ navigation }) {
  const { state, dispatch } = useContext(AppContext);

  const [addAdminModal, setAddAdminModal] = useState(false);
  const [subJects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);

  const toast = useToast();

  const db = getFirestore();

  const dataRef = query(collection(db, "payments"));

  useEffect(() => {
    const unsubscribe = onSnapshot(dataRef, (querySnapshot) => {
      const allData = [];
      querySnapshot.forEach((doc) => {
        let singleData = {...doc.data(), id: doc.id};
        allData.push(singleData);
      });
      console.log(allData);
      setPayments(allData);
    },
    (error) => {
      console.log(error);
    });
    
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <HeaderLite title={'Payment History'} onPress={() => navigation.goBack()} />
      {/* <View style={styles.searchContainer}>
        <Input height={hp(48)} placeholder={'Search the list'} />
      </View> */}
      <ScrollView style={styles.content}>
        {payments.map((item) => (
          <PayHistoryCard
            // onPress={print}
            name={item.email}
            description={item.reference}
            amount={parseInt(item.price).toLocaleString('en-US', { minimumFractionDigits: 2})}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // marginHorizontal: wp(20),
  },
  searchContainer: {
    marginTop: hp(20),
    marginHorizontal: wp(20),
  },
  content: {
    marginTop: hp(20),
    paddingHorizontal: wp(20),
  },
  buttonContainer: {
    // position: 'absolute',
    paddingHorizontal: wp(20),
    paddingTop: hp(10),
    marginBottom: hp(25),
  },
})

export default PaymentHistory;