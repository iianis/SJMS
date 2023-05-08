import { StyleSheet, View, ImageBackground, Keyboard, Alert, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CustomTextInput from '../components/CustomTextInput'
import CustomButton from '../components/CustomButton'
import { AuthContext } from './AuthContext'

const Loginv2 = ({ navigation, route }) => {
    const { login } = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const [inputs, setInputs] = useState({
        phone: '9886174607', password: '1234'
    })

    const validate = () => {
        Keyboard.dismiss();
        //console.log('validation..', inputs);
        let valid = true;

        if (!inputs.phone || inputs.phone.length != 10) {
            handleError('phone', 'Please enter 10 digit phone number');
            valid = false;
        }

        if (!inputs.password || inputs.phone.length < 4) {
            handleError('password', 'Please enter valid password. Minimum length of 4');
            valid = false;
        }
        //console.log("validating login token");
        if (valid) login();
    }

    const handleInputChange = (field: string, item: any) => {
        setInputs(prevState => ({ ...prevState, [field]: item }));
    }

    const handleError = (field: string, errorMessage: string) => {
        setErrors(prevState => ({ ...prevState, [field]: errorMessage }))
    }

    useEffect(() => {
    }, []);

    return (
        <View style={styles.container}>
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
                <CustomButton title="Login" onPress={() => validate()} />
                <CustomButton title="Register" bgColor="lightgrey" color="black" onPress={() => navigation.navigate("Register")} />
            </View>
        </View>
    )
}

export default Loginv2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    container2: {
        marginHorizontal: 10,
    }
});
