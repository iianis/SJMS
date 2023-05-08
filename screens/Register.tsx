import { StyleSheet, Text, View, ImageBackground, Keyboard, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CustomTextInput from '../components/CustomTextInput'
import CustomButton from '../components/CustomButton'
import Loader from '../components/Loader'
import firestore from '@react-native-firebase/firestore';

const Register = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({
    phone: '', password: '', confirmPassword: ''
  })

  const validate = () => {
    Keyboard.dismiss();
    //console.log('validation..', inputs);
    let valid = true;

    if (!inputs.phone || inputs.phone.length != 10) {
      handleError('phone', 'Please enter 10 digit phone number');
      valid = false;
    }

    if (!inputs.password || inputs.password.length < 4) {
      handleError('password', 'Please enter valid password. Minimum length of 4');
      valid = false;
    }

    if (!inputs.confirmPassword || (inputs.password != inputs.confirmPassword)) {
      handleError('confirmPassword', 'Please enter a matching password');
      valid = false;
    }
    //console.log("validating login token");
    if (valid) save(); //register
  }

  const save = () => {
    setLoading(true);
    console.log('adding..');
    setTimeout(async () => {
      setLoading(false);
      try {
        //AsyncStorage.setItem('user', JSON.stringify(inputs));
        await firestore()
          .collection('members')
          .add(inputs)
          .then(res => {
            Alert.alert("Success", "Registration was successful.");
          });
      } catch (error) {
        Alert.alert("Error", "Member Registration - Something went wrong.");
      } finally {
        navigation.navigate('Loginv2');
      }
    }, 3000)
  }

  const loadMemberByPhone = async (phone: string, familyPhone: boolean = false) => {
    setLoading(true);
    await firestore()
      .collection('members')
      .where('phone', '==', phone)
      .get()
      .then(memberSnapshot => {
        memberSnapshot.forEach(item => {
          Alert.alert("Mobile already Registered!", "Please check the phone number.",
            [
              {
                text: 'Ok', onPress: () => {
                  console.log('Try different Phone Number');
                }
              },
              { text: 'Cancel', onPress: () => console.log('Try different Phone Number') },
            ],
            {
              cancelable: false
            });
        })
        setLoading(false);
      });
  };

  const handleInputChange = (field: string, item: any) => {
    setInputs(prevState => ({ ...prevState, [field]: item }));
  };

  const handleError = (field: string, errorMessage: string) => {
    setErrors(prevState => ({ ...prevState, [field]: errorMessage }))
  };

  useEffect(() => {
  }, []);

  return (
    <View style={styles.container}>
      <Loader visible={isLoading} />
      <ImageBackground
        source={require('../images/appbackground.jpeg')}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.6 }}>
      </ImageBackground>
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', top: 50 }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#009387' }}>SJMSS</Text>
      </View>
      <View style={styles.container2}>
        <CustomTextInput
          label="Phone number"
          data={inputs.phone}
          iconName="phone"
          error={errors.phone}
          placeholder="Enter phone number"
          keyboardType='numeric'
          onFocus={() => { handleError('phone', null) }}
          onChangeText={text => handleInputChange('phone', text)}
        />
        <CustomTextInput
          label="Password"
          data={inputs.password}
          iconName="lock"
          password
          error={errors.password}
          placeholder="Enter Password"
          onFocus={() => { handleError('password', null) }}
          onChangeText={text => handleInputChange('password', text)}
        />
        <CustomTextInput
          label="Confirm Password"
          data={inputs.confirmPassword}
          iconName="lock"
          password
          error={errors.confirmPassword}
          placeholder="Confirm Password"
          onFocus={() => { handleError('confirmPassword', null) }}
          onChangeText={text => handleInputChange('confirmPassword', text)}
        />
        <CustomButton title="Register" onPress={() => validate()} />
        <CustomButton title="Login" bgColor="lightgrey" color="black" onPress={() => navigation.navigate("Login")} />
      </View>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container2: {
    marginHorizontal: 10,
  }
});
