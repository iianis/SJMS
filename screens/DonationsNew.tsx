//Member, Registration, Education, Widow Empowerment, Qurbani, Jakat,
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text, Button, TextInput, ScrollView, LogBox } from 'react-native';
import Search from '../components/Search';
import { Dropdown } from 'react-native-element-dropdown';
import { DonationTypes, getDonationType, IDonation } from '../data/misc';
import firestore from '@react-native-firebase/firestore';
import CustomDropdownList from '../components/CustomDropdownList';
import CustomTextInput from '../components/CustomTextInput';

const DonationsNew = ({ navigation }) => {
    const [selectedId, setSelectedId] = useState(1);
    const [donationNew, setDonationNew] = useState(false);
    const [donationData, setDonationData] = useState<IDonation>({
        name: '',
        phone: '',
        amount: 0,
        donationType: 'Education',
        date: '',
        enteredBy: 'Admin',
        taluka: '',
        village: '',
        desc: '',
    });

    useEffect(() => {
        //console.log('UseEffect ..', item.id);
        //LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        if (true) {
            //getDonations();
        }
    }, []);

    const saveData = async () => {
        console.log('save donation', donationData);
        console.log('adding..');
        donationData.date = new Date().toDateString();
        await firestore()
            .collection('donations')
            .add(donationData)
            .then(res => {
                console.log(res);
            });
        //navigation.navigate('Members');
        console.log('added..');
        clearData();
    }

    const clearData = () => {
        console.log('clear donation');
        setDonationData({
            name: '',
            phone: '',
            amount: 0,
            donationType: 'Education',
            date: '',
            enteredBy: 'Admin',
            taluka: '',
            village: '',
        });
        navigation.navigate('Donations');
    }

    return (
        <View style={styles.container}>
            <View>
                <CustomTextInput label="Mobile" placeholder="Enter phone number" data="" onChange={(value) => {
                    setDonationData({ ...donationData, phone: value });
                }} />
                <CustomTextInput label="Name" placeholder="Enter donors name" data="" onChange={(value) => {
                    setDonationData({ ...donationData, name: value });
                }} />
                <CustomTextInput label="Type" placeholder="Enter donation amount" data="0" onChange={(value) => {
                    setDonationData({ ...donationData, amount: +value });
                }} />
                <CustomDropdownList data={DonationTypes} label="Type" selectedId="1" placeholder="Select.." onChange={(value) => {
                    setDonationData({ ...donationData, donationType: value });
                }} />

            </View>

            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                <TouchableOpacity style={styles.button} onPress={() => { saveData(); }}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => { clearData(); }}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DonationsNew;

const styles = StyleSheet.create({
    textHeader: { color: '#fff', fontSize: 30, fontWeight: 'bold' },
    textFooter: { fontSize: 16 },
    textInfo: {
        fontSize: 20,
        fontStyle: 'italic',
        paddingVertical: 10,
    },
    button: {
        fontSize: 16, fontWeight: 'bold',
        borderRadius: 5,
        width: 80,
        height: 30,
        backgroundColor: 'lightgreen',
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 16, fontWeight: 'bold',
    },
    formHeader: {
        fontSize: 20,
        marginVertical: 10,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    tile1: {
        backgroundColor: 'red',
        height: 150,
        width: '50%',
        padding: 5,
    },
    item: {
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 10,
    },
    title: {
        fontSize: 30,
    },
    title2: {
        fontSize: 16,
    },
    cardRow2: {
        flex: 1,
        flexDirection: 'row',
        color: 'lightgrey',
    },
    cardRow3: {
        flex: 1,
        flexDirection: 'row',
        color: 'lightgrey',
    },
    textInput: {
        borderBottomColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
    },
    dropdown: {
        height: 50,
        width: 300,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginTop: 10,
        marginBottom: 15,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});
