import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import { serviceAreas } from './ServiceAreas';

const Login = ({ navigation }) => {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const [logerror, setLogError] = useState('');
  const [valid, setValid] = useState(true);

  const onAuthStateChanged = user => {
    console.log(user);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //console.log('Subscriber: ', subscriber);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    try {
      setValid(true);
      //console.log('signInWithPhoneNumber.');
      if (
        phoneNumber == null ||
        phoneNumber === '+91 ' ||
        phoneNumber.length <= 13 ||
        phoneNumber.length > 14
      ) {
        //console.log('phoneNumber = ' + phoneNumber.length);
        setValid(false);
        return;
      }
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      //console.log('confirmation ', confirmation);
    } catch (err) {
      console.log('Error at Google Phone Auth. =>> ' + err.message);
    }
  }

  async function confirmCode() {
    try {
      if (code == null || code === '' || code.length < 6 || code.length > 6) {
        setValid(false);
        return;
      }
      await confirm.confirm(code);
      //console.log('Valid code entered.');
      setValid(true);
      navigation.navigate('Profile', { item: phone });
    } catch (error) {
      console.log('Invalid code.');
      setLogError(error);
      setValid(false);
    }
  }

  if (!confirm) {
    return (
      <>
        <TextInput
          value={phone}
          onChangeText={text => setPhone(text)}
          placeholder="Enter phone number"
          style={styles.phoneTextInput}
        />
        <Button
          title="Submit"
          onPress={() => signInWithPhoneNumber('+91 ' + phone)}
        />
        <Text style={styles.submitText}>{logerror}</Text>
        {!valid ? (
          <Text style={styles.submitText}>Invalid Phone Number</Text>
        ) : (
          ''
        )}
      </>
    );
  }

  return (
    <>
      <TextInput
        placeholder="Enter confirmation code"
        value={code}
        onChangeText={text => setCode(text)}
        style={{
          fontSize: 18,
          paddingHorizontal: 10,
          backgroundColor: 'white',
        }}
      />
      <Button title="Confirm Code" onPress={() => confirmCode()} />

      <Text style={styles.submitText}>{logerror}</Text>
      {!valid ? (
        <Text
          style={{
            color: 'red',
            fontSize: 18,
            marginTop: 20,
            textAlign: 'center',
          }}>
          Invalid confirmation code
        </Text>
      ) : (
        ''
      )}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  submitText: {
    color: 'red',
    fontSize: 11,
    marginTop: 20,
    textAlign: 'center',
  },
  phoneTextInput: {
    fontSize: 18,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
});
