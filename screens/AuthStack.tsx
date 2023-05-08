import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loginv2 from './Loginv2';
import Register from './Register';

const AuthStack = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Loginv2}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                    headerBackTitle: '',
                }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: true,
                    headerBackTitle: '',
                }}
            />
        </Stack.Navigator>
    )
}

export default AuthStack