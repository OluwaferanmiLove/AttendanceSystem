import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../util/dimension';
import Ionicons from '@expo/vector-icons/Ionicons';

function ActionCards({
  color = colors.primary,
  marginTop,
  title,
  value,
  onPress,
  iconName,
  fontSize = wp(37),
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.actionCard, {borderColor: color, marginTop}]}>
        <View>
          <Text style={[styles.title, {color: color + 'aa'}]}>
            {title}
          </Text>
          <Text style={[styles.value, {color, fontSize}]}>
            {value}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <Ionicons name={iconName} color={color + '30'} size={wp(90)} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  actionCard: {
    width: wp(335),
    height: hp(160),
    flexDirection: 'row',
    borderRadius: wp(10),
    // borderWidth: wp(1),
    backgroundColor: colors.inputBg + '30',
    paddingVertical: hp(20),
    paddingHorizontal: hp(15),
    overflow: 'hidden',
  },
  title: {
    fontSize: wp(18),
    fontWeight: '300',
    color: colors.primary
  },
  value: {
    fontSize: wp(37),
    fontWeight: '700',
    color: colors.primaryLighter
  },
  iconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
})

export default ActionCards;