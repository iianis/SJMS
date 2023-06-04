import React, { useEffect } from 'react';
import { Alert } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './screens/AuthContext';
import AppNav from './screens/AppNav';
import messaging from '@react-native-firebase/messaging';
//import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';
import { PermissionsAndroid } from 'react-native';


const App = () => {
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    //getDeviceToken();
    console.log("requesting Messaging permission");
    //requestUserPermission();
    //PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  }, []);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async pushMessage => {
      Alert.alert('SJMSS Notification!', pushMessage.notification?.body);
    });
    return unsubscribe;
  }, [])

  const getDeviceToken = async () => {
    let token = await messaging().getToken();
    console.log('token', token);
  };

  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
};

export default App;

//token - fJwMeCgdQvmW-z30d8XRrX:APA91bHN2fBhrzieAuZLeVi_4wMx55JUoNXMyWlUyutK3RodP3UKnTGlKqnFwTfYLNtaaDbMoTSdOM51ARkGatnOusOEqO8_tUSYSuIJOYbjEeqiU5vIR-zwyZpuYZIvZqOS4DRFEu2n
//server token - AAAA9AIxHoU:APA91bEvtTqzmp85UFKEk1j0l8JRalAYzemvh-ZPC0w-isHWvKnTdC5MPVQ4n3II21ajNd8TsUtJe35xvqJ5Lxf_JZNFUaVi_u0F8B3yUmBImE4_NC_v9pXw4W2G1wfBgu801OtXbsNM

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}