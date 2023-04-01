import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Colors from '../data/colorscheme';
//import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialIcons';
//import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomTextInput = ({ label, data, iconName, error, password, onFocus = () => { }, ...props }) => {

    const [isFocused, setIsFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(password);
    //console.log('textinput ', label, hidePassword, error);

    return (
        <View style={{ marginBottom: 20 }}>
            <Text style={styles.label}>{label}</Text>
            <View style={[styles.inputContainer, { borderColor: error && error != "" ? Colors.red : isFocused ? Colors.blue : Colors.light }]}>
                <Icon
                    name={iconName}
                    style={{ color: Colors.darkblue, fontSize: 22, marginRight: 10 }}
                />
                <TextInput
                    value={data}
                    secureTextEntry={hidePassword}
                    autoCorrect={false}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                    }}
                    style={{ color: Colors.darkblue, flex: 1 }}
                    {...props}
                />
                {password && (<Feather
                    name={hidePassword ? "eye-off" : "eye"}
                    style={{ color: Colors.darkblue, fontSize: 22 }}
                    onPress={() => setHidePassword(!hidePassword)}
                />)}
            </View>
            {error && error != "" &&
                <Text style={{ color: Colors.red, fontSize: 12, marginTop: 7 }}>{error}</Text>
            }
        </View>
    )
}

export default CustomTextInput

const styles = StyleSheet.create({

    label: {
        marginVertical: 5,
        fontSize: 14,
        color: Colors.grey,
    },
    inputContainer: {
        height: 55,
        backgroundColor: Colors.light,
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: .8,
        alignItems: 'center'
    },
});
