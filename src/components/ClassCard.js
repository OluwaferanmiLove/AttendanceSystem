import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../constants/colors';
import { hp, wp } from '../util/dimension';

function ClassCard({
  color = colors.primary,
  backgroundColor,
  marginTop,
  title,
  value,
  onPress,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={{marginTop}}>
      <View style={[styles.actionCard, {backgroundColor: color + '10'}]}>
        <View style={styles.iconContainer}>
          <Ionicons name={'people-outline'} color={color + '30'} size={wp(38)} />
          <View
            style={{
              width: wp(30),
              height: wp(30),
              borderRadius: 9999,
              backgroundColor: color + '30',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={[styles.numContainer, {color: color + 'aa'}]}>
              {value}
            </Text>
          </View>
        </View>
        <View>
          <Text style={[styles.title, {color: color + 'aa'}]}>
            {title}
          </Text>
          <View style={styles.valueContainer}>
            <Text style={[styles.value, {color}]} numberOfLines={1}>
              {value} past questions
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  actionCard: {
    width: wp(160),
    height: wp(160),
    borderRadius: wp(10),
    justifyContent: 'space-between',
    // borderWidth: wp(1),
    backgroundColor: colors.inputBg + '30',
    paddingVertical: hp(10),
    paddingHorizontal: hp(15),
    overflow: 'hidden',
  },
  numContainer: {
    fontSize: wp(16),
    fontWeight: '300',
  },
  title: {
    fontSize: wp(20),
    fontWeight: '700',
  },
  valueContainer: {
    marginTop: hp(8),
    width: '100%',
    borderRadius: 9999,
    paddingVertical: hp(6),
    paddingHorizontal: hp(12),
    backgroundColor: '#ffffff',
  },
  value: {
    fontSize: wp(14),
    fontWeight: '700',
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
})

export default ClassCard;