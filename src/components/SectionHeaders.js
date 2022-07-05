import React from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../constants/colors';
import { hp, wp } from '../util/dimension';
import { generateColor } from '../util/randomColor';

let statusBarHeight = Platform.select({ios: hp(45), android: StatusBar.currentHeight});
function SectionHeaders({title, subTitle, actionTitle, backgroundColor, onPressAction}) {
  return (
    <View style={styles.sectionTitleContainer}>
      <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionSubTitle}>{subTitle}</Text>
      </View>
      {actionTitle && (
        <TouchableOpacity onPress={onPressAction}>
          <View style={[styles.actionBtnContainer, {backgroundColor}]}>
            <Text style={styles.title}>{actionTitle}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>  
  );
}

export const styles = StyleSheet.create({
  sectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(20),
    marginBottom: hp(16),
  },
  sectionTitle: {
    fontFamily: 'ApparelDisplayBold',
    fontSize: hp(22),
    color: colors.primaryLighter,
  },
  sectionSubTitle: {
    // fontFamily: 'ApparelDisplayBold',
    fontSize: hp(16),
    color: colors.primaryLighter,
  },
  actionBtnContainer: {
    paddingHorizontal: wp(16),
    paddingVertical:  hp(6),
    borderRadius: wp(999),
    // backgroundColor: generateColor()
  },
  title: {
    fontFamily: 'ApparelDisplayBold',
    fontSize: hp(12),
    color: colors.primary,
  },
})

export default SectionHeaders;