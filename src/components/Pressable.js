import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
// import { colors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { hp, wp } from '../util/dimension';
import { colors } from '../constants/colors';

function Pressable({
  // ref,
  label,
  labelColor = '#000000',
  backgroundColor = colors.inputBg + 'aa',
  height = hp(60),
  width = wp(335),
  paddingLeft = wp(21.5),
  marginTop,
  value,
  onPress,
  alignItems = 'center',
  style,
}) {

  const styles = StyleSheet.create({
    main: {
      marginTop,
    },
    labelContainer: {
    },
    labelText: {
      fontSize: wp(18),
      fontWeight: 'bold',
      color: labelColor,
    },
    input: {
      flexDirection: 'row',
      borderRadius: wp(20),
      backgroundColor,
      // borderWidth: wp(1),
      // borderColor: colors.primary,
      height,
      width,
      marginTop: label && hp(14),
      paddingLeft,
      paddingRight: paddingLeft,
      alignItems,
    },
    textInput: {
      flex: 1,
      alignItems: 'flex-start',
      // marginLeft: wp(13.5),
      fontSize: hp(15),
      fontWeight: '300',
      textAlign: 'left',
    },
  })
  return (
    <View style={[styles.main, style]}>
      {label &&
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{label}</Text>
        </View>
      }
      <TouchableOpacity style={[styles.input, style]} onPress={onPress}>
        <Text style={styles.textInput}>{value}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(Pressable);
