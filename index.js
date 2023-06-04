/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

// Register background handler
messaging().setBackgroundMessageHandler(async pushMessage => {
    console.log('SJMSS notification - Background!', pushMessage.notification?.body);
});

messaging().getInitialNotification(async pushMessage => {
    console.log('SJMSS notification - Kill State', pushMessage.notification?.body);
});

console.log('log at index.js');
AppRegistry.registerComponent(appName, () => App);
