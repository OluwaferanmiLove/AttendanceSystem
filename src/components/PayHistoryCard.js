import React from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../constants/colors';
import { hp, wp } from '../util/dimension';
import { generateColor } from '../util/randomColor';
import ImageView from './ImageView';
import Ionicons from '@expo/vector-icons/Ionicons';

function PayHistoryCard({ onPress, name, amount, description }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.userListContainer}>
        <View>
          {/* <ImageView
            image={image}
          /> */}
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Text style={styles.name}>N {amount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  userListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(17),
    borderBottomColor: '#eee',
    borderBottomWidth: wp(1)
  },
  nameContainer: {
    flex: 1,
    // marginLeft: wp(10),
  },
  name: {
    fontSize: hp(18),
    fontWeight: '600',
    color: colors.primary,
  },
  description: {
    // // fontFamily: 'ApparelDisplayBold',
    fontSize: hp(16),
    color: colors.primary,
    textTransform: 'capitalize',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // width: wp(35),
    // height: wp(35),
    paddingVertical: hp(4),
    paddingHorizontal: hp(8),
    borderRadius: 7,
    backgroundColor: colors.primary + '30',
  },
})

export default PayHistoryCard;