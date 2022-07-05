import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { hp, wp } from '../../util/dimension';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AppContext } from '../../context/AppContext';
import HeaderLite from '../../components/HeaderLite';
import ImageView from '../../components/ImageView';
import BookCard from '../../components/BookCard';
import Input from '../../components/Input';
import { colors } from '../../constants/colors';
import { books } from '../../constants/mockData';
import Userlist from '../../components/Userlist';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import Button from '../../components/Button';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, doc, getFirestore, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { makeid } from '../../util/util';
import { useToast } from 'react-native-toast-notifications';

function EnrollFace({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const { state } = useContext(AppContext);

  const toast = useToast();

  const db = getFirestore();

  const cameraRef = useRef(null)

  const dbRef = collection(db, 'users');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const navigateToLectureSessions = (detail) => {
    navigation.navigate('Lectureression', detail)
  }

  // const handleFacesDetected = ({ faces }) => {
  //   console.log(faces)
  // }; 

  const uploadImage = async (uri) => {
    try {
      // const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const filename = makeid(64);
      console.log(filename);

      const storage = getStorage();
      const storageRef = ref(storage, `images/${filename}`);

      // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      const image = await fetch(uri);
      const imageBlob = await image.blob();

      // 'file' comes from the Blob or File API
      let imageUploadInfo = await uploadBytes(storageRef, imageBlob);

      let imageUrl = await getDownloadURL(imageUploadInfo.ref);
      console.log('File available at', imageUrl);
      // setImage(imageUrl);
      return imageUrl;
    } catch (error) {
      console.log(error)
    }
  };

  const handleUploaded = async () => {
    setLoading(true);
    try {

      const dbRefStyles = doc(db, 'users', state.user.userId);

      console.log('--------------------- db ref done');
      console.log(image);
      const coverUrl = await uploadImage(image);
      console.log(coverUrl);
      console.log('--------------------- uploadImage done');

      const data = {
        image: coverUrl,
        faceEnrolled: true,
      }

      // set user data in firestore
      let dataInfo = await setDoc(dbRefStyles, data, { merge: true });
      console.log(dataInfo);
      toast.show('Face enrolled successfull');
      navigation.replace('UserNav');
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.log(e)
    }
  }

  const takePicture = async () => {
    let photo = await cameraRef.current.takePictureAsync({
      quality: 1,
      // base64: true
    });

    console.log(photo);
    setImage(photo.uri);

    // let base64Data = `data:image/jpeg;base64,${photo.base64}`
    // let photoData = {
    //   data: base64Data,
    //   height: photo.height,
    //   width: photo.width,
    // }
    // console.log(photoData)
    // setImage(photoData)
  }

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'} />
      <View style={styles.header}>
        <View style={styles.userInfoContainer}>
          <Text style={styles.name}>Hi, {state.user.firstName} 👋</Text>
          <Text style={[styles.name, { fontSize: wp(18) }]}>You need to enroll your face to continue</Text>
        </View>
      </View>
      <View style={{ width: wp(335), height: wp(335), borderRadius: 9999, overflow: 'hidden', marginTop: hp(80), marginHorizontal: wp(20), }}>
        {!image && (
          <Camera
            // other props
            autoFocus={true}
            ref={cameraRef}
            style={{ flex: 1, width: wp(335), height: wp(335) }}
            ratio={'1:1'}
            // onFacesDetected={handleFacesDetected}
            flashMode={FlashMode.on}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.accurate,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
              runClassifications: FaceDetector.FaceDetectorClassifications.none,
              minDetectionInterval: 100,
              tracking: true,
            }}
            type={CameraType.front}
          />
        )}
        {image && (
          <Image
            source={{uri: image}}
            style={{ width: wp(335), height: wp(335), borderRadius: 999999 }}
          />
        )}
      </View>
      <View style={{ marginTop: hp(80), marginHorizontal: wp(20), }}>
        <Text style={[styles.name, { fontSize: wp(18) }]}>Make sure you take the picture where there is light and your face show very clearly</Text>
        {!image && (
          <Button
            style={{ marginTop: hp(50) }}
            dark
            onPress={() => takePicture()}
            title={'Capture Image'}
          />
        )}
        {image && (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button
              style={{ marginTop: hp(50) }}
              dark
              width={wp(160)}
              onPress={() => setImage(null)}
              title={'Retake Picture'}
            />
            <Button
              style={{ marginTop: hp(50) }}
              dark
              width={wp(160)}
              onPress={() => handleUploaded()}
              title={'Save'}
            />
          </View>
        )}
      </View>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size={'small'} color={colors.white} />
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // marginHorizontal: wp(20),
  },
  header: {
    marginTop: hp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfoContainer: {
    flex: 1,
    alignItems: 'center',
    marginLeft: wp(10)
  },
  name: {
    fontSize: wp(30),
    textAlign: 'center',
    fontWeight: '500',
    color: colors.primary
  },
  description: {
    fontSize: wp(14),
    textAlign: 'center',
    textTransform: 'capitalize',
    fontWeight: '300',
    color: colors.primary
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(35),
    height: wp(35),
    borderRadius: 7,
    backgroundColor: colors.secondaryLighter + '30',
  },
  infoContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: hp(20),
    paddingVertical: hp(22),
    borderRadius: wp(10),
    backgroundColor: colors.primary,
  },
  infoTitle: {
    fontSize: wp(16),
    fontWeight: '300',
    color: '#ffffff90',
  },
  infoValue: {
    fontSize: wp(35),
    fontWeight: '700',
    marginTop: hp(10),
    color: '#ffffff'
  },
  sectionTitleContainer: {
    marginTop: hp(25),
  },
  sectionTitle: {
    fontSize: wp(22),
    fontWeight: '700',
    color: colors.primary
  },
  content: {
    // marginTop: hp(25),
    paddingHorizontal: wp(20),
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'space-between',
    paddingBottom: hp(20)
  },
  loading: {
    flex: 1,
    // marginHorizontal: -wp(20),
    position: 'absolute',
    height: hp(812),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000090',
  },
})

export default EnrollFace;