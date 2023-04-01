import { View, Text, StyleSheet, Keyboard, Alert, AsyncStorage } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { ScrollView } from 'react-native-gesture-handler'
import CustomTextInput from '../components/CustomTextInput'
import CustomButton from '../components/CustomButton'
import Loader from '../components/Loader'
//import { NavigationContainer } from '@react-navigation/native'
import CustomDropdownList from '../components/CustomDropdownList'
import { getTalukaId, getVillageId, getWorkId, talukas, villages, works } from '../data/geography'
import firestore, { collection, query, where } from '@react-native-firebase/firestore';
import { member } from './Members'

const MemberNew = ({ navigation, route }) => {
    const [documentId, setDocumentId] = useState('');
    //const [talukaId, setTalukaId] = useState(1);
    //const [villageId, setVillageId] = useState(1);
    const [villagesByTaluka, setVillagesByTaluka] = useState([]);
    const item = route.params?.item;
    const [inputs, setInputs] = useState({
        phone: '',
        name: '',
        taluka: '',
        village: '',
        talukaId: 0,
        villageId: 0,
        district: 'Satara',
        address: '',
        pin: '',
        dob: '',
        work: 'Business',
        workId: 1,
        education: 'Graduate',
        memberType: 'Member',
        familyMembers: 2,
        fees: 0,
        requests: [],
        invitaions: [],
        certificate: false,
        donations: 0,
        active: true,
    });
    //console.log("onrefresh: ", inputs);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    const validate = () => {
        Keyboard.dismiss();
        //console.log('validation..', inputs);
        let valid = true;

        if (!inputs.name) {
            handleError('name', 'Please enter Name');
            valid = false;
        }
        if (!inputs.phone) {
            handleError('phone', 'Please enter Phone');
            valid = false;
        }
        if (inputs.taluka == '') {
            handleError('taluka', 'Please select Taluka');
            valid = false;
        }
        if (inputs.village == '') {
            handleError('village', 'Please select Village');
            valid = false;
        }
        if (inputs.work == '') {
            handleError('work', 'Please select Work');
            valid = false;
        }

        if (valid) {
            if (documentId) update(); else save();
        }
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
                        console.log(res);
                    });
                //navigation.navigate('Members', { filter: null });
                //navigation.navigate("Intro");
            } catch (error) {
                Alert.alert("Error", "Member Save - Something went wrong.");
            } finally {
                navigation.navigate('Members', { filter: null });
            }
        }, 3000)
    }
    const update = async () => {
        console.log('updating..');
        try {
            await firestore().collection('members').doc(documentId).set(inputs);
        } catch (error) {
            Alert.alert("Error", "Member Update - Something went wrong.");
        } finally {
            navigation.navigate('Members', { filter: null });
        }

    };

    useEffect(() => {
        //console.log("useeffect 1");
        if (item) {
            //console.log("useeffect 2");
            getMember();
        } else setLoading(false);
    }, []);

    const getMember = async () => {
        setLoading(true);
        console.log('getMember > get item: ' + item.id);
        await firestore()
            .collection('members')
            .doc(item.id)
            .get()
            .then(memberSnapshot => {
                if (memberSnapshot.exists) {
                    let data = memberSnapshot.data();
                    setInputs(data);
                    handleOnChange("taluka", data.taluka);
                    setDocumentId(memberSnapshot.id);
                } else {
                    console.log("No matching member found! documentId: ", documentId);
                    setDocumentId('');
                }
                setLoading(false);
            });
    };

    const getMemberByPhone = async (phone: string) => {
        setLoading(true);
        console.log('getMember > by phone: ', phone);
        await firestore()
            .collection('members')
            .where('phone', '==', phone)
            .get()
            .then(memberSnapshot => {
                console.log("No matching member found! memberSnapshot: ", memberSnapshot.size);
                memberSnapshot.forEach(item => {
                    console.log('data: ', item.id, item.data());
                    Alert.alert("Already a Member!", item.data().name + ", " + item.data().taluka + ", " + item.data().village + ", Phone - " + item.data().phone,
                        [
                            {
                                text: 'Ok', onPress: () => {
                                    console.log('Go ahead and load this Member Information');
                                    let data = item.data();
                                    setDocumentId(item.id);
                                    setInputs(data);
                                    handleOnChange("taluka", data.taluka);
                                }
                            },
                            { text: 'Cancel', onPress: () => console.log('Cancel and try different Phone Number') },
                        ],
                        {
                            cancelable: false
                        });
                })
                setLoading(false);
            });
    };
    const handleOnChange = (field: string, value: number) => {
        let fieldId = field + 'Id';
        //console.log('inputs: ' + field + ":" + value);
        setInputs(prevState => ({ ...prevState, [field]: value }));
        if (field === 'taluka') {
            setInputs(prevState => ({ ...prevState, [fieldId]: getTalukaId(value) }));
            let villagesByFilter = villages.filter(item => { return item.taluka == value; });
            setVillagesByTaluka(villagesByFilter);
            //console.log("villagesByTaluka: ", villagesByFilter);
        }
        if (field === 'village')
            setInputs(prevState => ({ ...prevState, [fieldId]: getVillageId(value) }));
        if (field === 'work')
            setInputs(prevState => ({ ...prevState, [fieldId]: getWorkId(value) }));

        if (field === 'phone' && value.toString().length == 10) {
            console.log('inputs: search by phone');
            let member = getMemberByPhone(value);
        }
    }

    const handleError = (field, errorMessage) => {
        setErrors(prevState => ({ ...prevState, [field]: errorMessage }))
    }

    //console.log('inputs: ', inputs);
    //console.log('errors: ', errors)

    return (
        <View style={{ backgroundColor: Colors.white, flex: 1 }}>
            <Loader visible={loading} />
            <ScrollView contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
                <Text style={{ color: Colors.black, fontSize: 40, fontWeight: 'bold' }}>Member</Text>
                <Text style={{ color: Colors.grey, fontSize: 18, marginVertical: 10 }}>Enter member details</Text>
                <View style={{ marginVertical: 20 }}>
                    <CustomTextInput
                        label="Phone"
                        data={inputs.phone}
                        iconName="phone"
                        error={errors.phone}
                        placeholder="Enter phone"
                        keyboardType='numeric'
                        onFocus={() => { handleError('phone', null) }}
                        onChangeText={text => handleOnChange('phone', text)}
                    />
                    <CustomTextInput
                        label="Name"
                        data={inputs.name}
                        iconName="person"
                        error={errors.name}
                        placeholder="Enter name"
                        onFocus={() => { handleError('name', null) }}
                        onChangeText={text => handleOnChange('name', text)}
                    />
                    <CustomDropdownList
                        data={talukas}
                        label="Taluka"
                        error={errors.taluka}
                        selectedId={inputs.talukaId}
                        onChange={item => {
                            handleOnChange('taluka', item)
                        }}
                    />
                    <CustomDropdownList
                        data={villagesByTaluka}
                        label="Village"
                        error={errors.village}
                        selectedId={inputs.villageId}
                        onChange={item => {
                            handleOnChange('village', item)
                        }}
                    />
                    <CustomDropdownList
                        data={works}
                        label="Work"
                        error={errors.work}
                        selectedId={inputs.workId || 1}
                        onChange={item => {
                            handleOnChange('work', item)
                        }}
                    />
                    <CustomButton title="Save" onPress={() => validate()} />
                </View>
            </ScrollView>
        </View>
    )
}

export default MemberNew

const styles = StyleSheet.create({

})
