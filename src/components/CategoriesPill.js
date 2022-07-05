import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/colors';
import { hp, wp } from '../util/dimension';

function CategoriesPill({onPress, index, marginTop, backgroundColor, category}) {
  return (
    <TouchableOpacity onPress={onPress} style={{marginLeft: index === 0 ? wp(20) : 0, marginTop}}>
      <View style={[styles.main, {backgroundColor}]}>
        <Text style={styles.title}>{category}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: wp(15),
    marginRight: wp(15),
    paddingVertical:  hp(10),
    borderRadius: wp(999),
  },
  title: {
    fontFamily: 'ApparelDisplayBold',
    fontSize: hp(16),
    color: colors.primary,
  },
})

export default CategoriesPill;