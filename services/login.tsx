import React, { useState } from 'react';
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const Login2 = ({ navigation }) => {
    const [data, setData] = useState({
        mobile: '',
        password: '',
        checkIfInputChanged: false,
        secureTextEntry: true,
    });

    const textInputChange = (val: any) => {
        if (val.length === 0) {
            //array destructuring, ...data get current state and then updates new values
            setData({
                ...data,
                mobile: val,
                checkIfInputChanged: true,
            });
        } else {
            setData({
                ...data,
                mobile: val,
                checkIfInputChanged: false,
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Welcome!</Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.textFooter}>Mobile #</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Enter your mobile number"
                        style={styles.textInput}
                        onChangeText={val => textInputChange(val)}
                    />
                    {data.checkIfInputChanged ? (
                        <Text style={styles.textInvalid}>Invalid Input</Text>
                    ) : null}
                </View>
                <Text style={styles.textFooter}>Password</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Enter your password"
                        style={styles.textInput}
                        secureTextEntry={true}
                        autoCapitalize="none"
                    />
                </View>
                <Button
                    title="Log-in"
                    color="#009387"
                    onPress={() => navigation.navigate('Districts')}
                />
                <TouchableOpacity
                    style={styles.buttonRegister}
                    onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.buttonRegisterText}> REGISTER </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login2;

const fs = { appTitle: 36, blockTitle: 30, groupTitle: 26, title: 18, text: 12 };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    logo: {
        height: 200,
        width: 200,
        borderRadius: 50,
        marginLeft: 80,
        marginTop: 50,
    },
    title: {
        fontSize: fs.title,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    text: {
        fontSize: fs.text,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    button: {
        marginTop: 10,
        alignItems: 'center',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        height: 35,
        paddingTop: 5,
    },
    buttonRegister: {
        marginTop: 10,
        alignItems: 'center',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 3,
        height: 35,
        paddingTop: 5,
        color: 'black',
        fontWeight: 'bold',
    },
    buttonRegisterText: {
        color: 'black',
        //fontWeight: 'bold',
    },
    textHeader: { color: '#fff', fontSize: fs.blockTitle, fontWeight: 'bold' },
    textFooter: { fontSize: 16 },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    textInput: { flex: 1, marginTop: 0, paddingLeft: 10, color: '#05375a' },
    logIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textLogIn: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    textInvalid: { color: 'red', fontSize: 12 },
});
