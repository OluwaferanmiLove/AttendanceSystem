import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../constants/colors';
import { hp, wp } from '../util/dimension';
import moment from 'moment';

function BookCard({
  color = colors.primary,
  backgroundColor,
  indicatorColor,
  dateTime,
  marginTop = hp(25),
  courseTitle,
  lecturer,
  disabled,
  price,
  value,
  onPress,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginTop }} disabled={disabled}>
      <View style={[styles.actionCard, { backgroundColor: color + '10' }]}>
        <View>
          <Text style={[styles.title, { color }]} numberOfLines={1}>
            {courseTitle}
          </Text>
          <Text style={[styles.title, { color, marginTop: hp(8) }]} numberOfLines={1}>
            {lecturer?.firstName} {lecturer?.lastName}
          </Text>
          <View style={styles.valueContainer}>
            <Text style={[styles.value, { color: color + 'aa' }]} numberOfLines={1}>
              {moment(dateTime).format('ddd DD, MMM YYYY, hh:mm A')}
            </Text>
            {/* <Text style={[styles.value, {color: color + 'aa'}]} numberOfLines={1}>
              {moment(dateTime).format('hh:mm A')}
            </Text> */}
          </View>
          <View style={[styles.indicator, { backgroundColor: indicatorColor + 20, marginTop: hp(10) }]}>
            <Text style={[styles.value, { color: indicatorColor, fontSize: wp(12) }]} numberOfLines={1}>
              {value}
            </Text>
          </View>
        </View>
        {/* <View>
          <View style={[styles.indicator, {backgroundColor: indicatorColor + 20}]}>
            <Text style={[styles.value, {color: indicatorColor, fontSize: wp(12)}]} numberOfLines={1}>
              {value}
            </Text>
          </View>
        </View> */}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  actionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: wp(335),
    // height: wp(80),
    borderRadius: wp(10),
    // borderWidth: wp(1),
    backgroundColor: colors.inputBg + '30',
    paddingVertical: hp(15),
    paddingHorizontal: hp(15),
    overflow: 'hidden',
  },
  numContainer: {
    fontSize: wp(16),
    fontWeight: '300',
  },
  title: {
    // marginTop: hp(14),
    fontSize: wp(20),
    fontWeight: '700',
  },
  valueContainer: {
    marginTop: hp(8),
    // borderRadius: 9999,
    // paddingVertical: hp(6),
    // paddingHorizontal: hp(12),
    // backgroundColor: '#ffffff',
  },
  value: {
    fontSize: wp(14),
    // fontWeight: '700',
    color: colors.primaryLighter
  },
  iconContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // position: 'absolute',
    overflow: 'hidden',
  },
  indicator: {
    // width: wp(18),
    // height: wp(10),
    paddingHorizontal: wp(8),
    paddingVertical: hp(8),
    borderRadius: 4,
  },
})

export default BookCard;