import React from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../constants/colors';
import { hp, wp } from '../util/dimension';
import { generateColor } from '../util/randomColor';
import ImageView from './ImageView';
import Ionicons from '@expo/vector-icons/Ionicons';

function Userlist({ onPress, name, image, description }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.userListContainer}>
        <View>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        {/* <View style={styles.iconContainer}>
          <Ionicons name={'ios-arrow-forward'} size={wp(20)} color={colors.primary} />
        </View> */}
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
    marginLeft: wp(10),
  },
  name: {
    fontSize: hp(18),
    fontWeight: '600',
    color: colors.primaryLighter,
  },
  description: {
    // fontFamily: 'ApparelDisplayBold',
    fontSize: hp(16),
    color: colors.primaryLighter,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(35),
    height: wp(35),
    borderRadius: 7,
    backgroundColor: colors.primary + '30',
  },
})

export default Userlist;