import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext("MyAppContext");

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);

    const login = async () => {
        //console.log("validating login 1");
        setIsLoading(true);
        //console.log("validating login 2");
        setUserToken(null);

        await firestore()
            .collection('members')
            .where('phone', '==', "9886174607")
            .where('secureKey', '==', "1236")
            .get()
            .then(memberSnapshot => {
                console.log("validating login 3");
                memberSnapshot.forEach(async (item) => {
                    //console.log("validating login 4 -success");
                    //console.log('member details', item.id, item.data().name, item.data().secureKey);
                    setUserToken("thisisahighlysecurejwtoken");
                    await AsyncStorage.setItem('userToken', "thisisahighlysecurejwtoken");
                })
                //console.log("validating login 5");
                setIsLoading(false);
            });

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };
    const logout = async () => {
        setUserToken(null);
        setIsLoading(false);
        //console.log('userToken 11', userToken);
        await AsyncStorage.removeItem('userToken');
        setUserToken(null);
        //console.log('userToken 12', userToken);
    };
    const isLoggedin = async () => {
        try {
            let userToken = await AsyncStorage.getItem('userToken');
            console.log('userToken 13', userToken);
            setUserToken(userToken);
        } catch (ex) {
            console.log('Error while reading AsyncStorage.getItem(userToken)', ex);
        }
    };

    useEffect(() => {
        isLoggedin();
    }, []);

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
            {children}
        </AuthContext.Provider>
    );
}