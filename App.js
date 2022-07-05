import AppContextProvider from './src/context/AppContext';
import AttendanceSystem from './src/navigation';
import { initializeApp } from "firebase/app";
import { ToastProvider } from 'react-native-toast-notifications';
import { colors } from './src/constants/colors';
import { hp } from './src/util/dimension';

export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyBaeGV7OramapCPlnYr7uoZBsYCHZmEkf8",
    authDomain: "attendancesystem-8bf6d.firebaseapp.com",
    projectId: "attendancesystem-8bf6d",
    storageBucket: "attendancesystem-8bf6d.appspot.com",
    messagingSenderId: "804701387660",
    appId: "1:804701387660:web:3f18ee5e3e9a2cf12f74a9"
  };

  initializeApp(firebaseConfig);

  return (
    <AppContextProvider>
      <ToastProvider
        placement="top"
        duration={2500}
        // successColor="green"
        // dangerColor="red"
        // warningColor="orange"
        // normalColor="#6610F2"
        normalColor={colors.primary}
        offsetTop={hp(40)}
        // renderType={{
        //   normal: (toast) => (
        //     <Toast text={toast.message} bgColor="#6610F2" />
        //   ),
        //   danger: (toast) => (
        //     <Toast text={toast.message} bgColor="#F83C33" />
        //   ),
        //   success: (toast) => (
        //     <Toast text={toast.message} bgColor="#45D988" />
        //   ),
        // }}
        swipeEnabled={true}>

        <AttendanceSystem />
      </ToastProvider>
    </AppContextProvider>
  );
}
