import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../data/colorscheme';

const CustomButton = ({ title, bgColor, color, onPress = () => { } }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            style={{
                height: 55,
                width: '100%',
                backgroundColor: bgColor ? bgColor : Colors.blue,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 20
            }}>
            <Text style={{ color: (color ? color : Colors.white), fontWeight: 'bold', fontSize: 18 }}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButton