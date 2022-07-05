import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';
import { wp } from '../util/dimension';

function ImageView({
  image,
  onPressUpload,
  width = wp(55),
  borderRadius = 99999,
  height =  wp(55)}) {
  return (
    <View style={[styles.imageContainer, {width, height, borderRadius}]}>
      {image &&(
        <Image
          source={image}
          style={[styles.image, {width, height}]}
        />
      )}
      {/* {!image && onPressUpload && ( */}
        {/* <TouchableOpacity
          onPress={onPressUpload}
          style={{height: '100%', width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center', position: 'absolute'}}>
          <Text style={{color: colors.primary, fontSize: wp(16)}}>+ Click to upload Image</Text>
        </TouchableOpacity> */}
      {/* )} */}
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    // width: wp(55),
    // height: wp(55),
    // borderRadius: 99999,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  image: {
    // width: wp(55),
    // height: wp(55),
  },
})

export default ImageView;
