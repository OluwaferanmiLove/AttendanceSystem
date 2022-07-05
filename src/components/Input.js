import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
// import { colors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { hp, wp } from '../util/dimension';
import { colors } from '../constants/colors';

function Input({
  // ref,
  label,
  labelColor = '#000000',
  backgroundColor = colors.inputBg + 'aa',
  height = hp(60),
  width = wp(335),
  paddingLeft = wp(21.5),
  iconName,
  iconColor,
  marginTop,
  placeholder,
  value,
  keyboardType,
  onChangeText,
  secureTextEntry,
  onSubmitEditing,
  textColor = colors.primary,
  multiline = false,
  numberOfLines,
  textAlignVertical,
  alignItems = 'center',
  inputMarginTop,
  editable = true,
  onFocus,
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
      <View style={[styles.input, style]}>
        <Ionicons name={iconName} size={hp(16)} color={iconColor} style={{ marginTop: inputMarginTop }} />
        <TextInput
          // ref={ref}
          style={[styles.textInput, { color: textColor, height, textAlignVertical, marginTop: inputMarginTop }]}
          placeholder={placeholder}
          value={value}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          onSubmitEditing={onSubmitEditing}
          blurOnSubmit={false}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
          onFocus={onFocus}
        />
      </View>
    </View>
  );
}

export default React.memo(Input);
