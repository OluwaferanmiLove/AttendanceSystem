import React from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../constants/colors';
import { hp, wp } from '../util/dimension';
import { generateColor } from '../util/randomColor';
import ImageView from './ImageView';
import Ionicons from '@expo/vector-icons/Ionicons';

function ActionCard({ marginTop, onPress, title, color, width = wp(160)}) {
  return (
    <TouchableOpacity onPress={onPress} style={{marginTop}}>
      <View style={[styles.actionCardContainer, {backgroundColor: color + 30, width}]}>
        {/* <Ionicons name={'ios-arrow-forward'} size={wp(20)} color={colors.primary} /> */}
        <Text style={[styles.name, {color}]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  actionCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // width: wp(160),
    paddingVertical: hp(16),
    borderRadius: wp(8)
  },
  name: {
    fontSize: hp(18),
    fontWeight: '600',
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

export default ActionCard;