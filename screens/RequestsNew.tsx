import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Keyboard, Alert } from 'react-native';
import { IRequest, requestTypes } from '../data/misc';
import firestore from '@react-native-firebase/firestore';
import CustomDropdownList from '../components/CustomDropdownList';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import Loader from '../components/Loader';
import Colors from '../data/colorscheme';
import { talukas, villages } from '../data/geography';
import DateTimePicker from '@react-native-community/datetimepicker';
import SwitchSelector from "react-native-switch-selector";

const RequestsNew = ({ navigation, route }) => {
    //const [selectedId, setSelectedId] = useState(1);
    const item = route.params?.item;
    const [documentId, setDocumentId] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedDOB, setSelectedDOB] = useState(new Date());
    const [selectedDOBText, setSelectedDOBText] = useState("");
    const [villagesByTaluka, setVillagesByTaluka] = useState([]);
    const [uiDetails, setUIDetails] = useState({
        dbTable: "requests", redirectComponent: 'Requests'
    });
    const [inputs, setInputs] = useState<IRequest>({
        name: '',
        description: '',
        requestType: 'Education',
        requestTypeId: 1,
        amount: 0,
        phone: '',
        taluka: '',
        village: '',
        talukaId: 0,
        villageId: 0,
        district: 'Satara',
        deleted: false,
        approvedOn: '',
        approved: false,
        paid: false,
        createdOn: new Date().toString(),
        createdBy: 'Admin',
        updatedOn: '',
        updatedBy: '',
    });

    //console.log('data', inputs);

    useEffect(() => {
        if (item) {
            setInputs(item);
            handleDDLChange("taluka", { id: item.talukaId, name: item.taluka });
            setDocumentId(item.id);
        } else {
            setLoading(false);
        }
    }, []);

    const validate = () => {
        Keyboard.dismiss();
        console.log('validation..', inputs);
        let valid = true;

        if (!inputs.description) {
            handleError('description', 'Please enter description');
            valid = false;
        }
        if (!inputs.amount) {
            handleError('amount', 'Please enter amount');
            valid = false;
        }
        if (!inputs.name) {
            handleError('name', 'Please enter name');
            valid = false;
        }
        if (!inputs.phone) {
            handleError('phone', 'Please enter phone');
            valid = false;
        }

        //console.log('saving record..valid', valid);
        if (valid) {
            console.log('saving request..documentId', documentId);
            if (documentId) update(); else save();
        }
    }

    const save = () => {
        setLoading(true);
        console.log('saving record..');
        setTimeout(async () => {
            setLoading(false);
            try {
                await firestore()
                    .collection(uiDetails.dbTable)
                    .add(inputs)
                    .then(res => {
                        //console.log(res);
                    });
            } catch (error) {
                Alert.alert("Error", "Request Save - Something went wrong.");
                console.log(error);
            } finally {
                navigation.navigate(uiDetails.redirectComponent, { filter: null });
            }
        }, 3000)
    };

    const update = async () => {
        console.log('updating record..');
        try {
            inputs.updatedBy = '';
            inputs.updatedOn = new Date().toString();
            await firestore().collection(uiDetails.dbTable).doc(documentId).set(inputs);
        } catch (error) {
            Alert.alert("Error", "Request Update - Something went wrong.");
        } finally {
            navigation.navigate(uiDetails.redirectComponent, { filter: null });
        }

    };

    const deleteRequest = async () => {
        setLoading(true);
        try {
            inputs.deleted = true;
            await firestore().collection(uiDetails.dbTable).doc(documentId).set(inputs);
        } catch (error) {
            Alert.alert("Error", "Request Update - Something went wrong.");
        } finally {
            navigation.navigate(uiDetails.redirectComponent, { filter: null });
        }
    };

    const loadMemberDetails = (data) => {
        setInputs(prevState => ({ ...prevState, ['taluka']: data.taluka }));
        setInputs(prevState => ({ ...prevState, ['talukaId']: data.talukaId }));
        setInputs(prevState => ({ ...prevState, ['village']: data.village }));
        setInputs(prevState => ({ ...prevState, ['villageId']: data.villageId }));
        setInputs(prevState => ({ ...prevState, ['name']: data.name }));
        handleDOBSet(data.createdOn?.toDate());
        setSelectedDOB(data.createdOn?.toDate());
        handleDDLChange("taluka", { id: data.talukaId, name: data.taluka });
    };

    const loadMemberByPhone = async (phone: string, familyPhone: boolean = false) => {
        setLoading(true);
        console.log('getMember > by phone: ', phone);
        await firestore()
            .collection('members')
            .where('phone', '==', phone)
            .get()
            .then(memberSnapshot => {
                memberSnapshot.forEach(item => {
                    Alert.alert(familyPhone ? "Head of Family!" : "Registered Member!", item.data().name + ", " + item.data().village + ", Phone - " + item.data().phone,
                        [
                            {
                                text: 'Ok', onPress: () => {
                                    console.log('Go ahead and load this Member Information');
                                    let data = item.data();
                                    if (!familyPhone) loadMemberDetails(data);
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

    const handleInputChange = (field: string, item: any) => {
        //console.log('field item:', field, item);
        setInputs(prevState => ({ ...prevState, [field]: item }));
        if ((field === 'phone' || field == 'familyPhone') && item.toString().length == 10) {
            loadMemberByPhone(item, field == 'familyPhone'); //name == 'Student' ? name : 'Business'
        }
    }

    const handleDDLChange = (field: string, changedItem: any) => {
        let fieldId = field + 'Id';
        setInputs(prevState => ({ ...prevState, [field]: changedItem.name }));
        setInputs(prevState => ({ ...prevState, [fieldId]: changedItem.id }));
        if (field === 'taluka') {
            let villagesByFilter = villages.filter(item => { return item.taluka == changedItem.name; });
            //console.log('set village as per taluka', villagesByFilter);
            setVillagesByTaluka(villagesByFilter);
        }
    }
    const handleDOBChange = ((event, dobSelected) => {
        const dobDate = dobSelected || selectedDOB;
        setInputs(prevState => ({ ...prevState, ["dob"]: dobDate }));
        setSelectedDOB(dobDate);
        let dobInText = dobDate.getDate() + '-' + (dobDate.getMonth() + 1) + '-' + dobDate.getFullYear();
        setSelectedDOBText(dobInText);
    });

    const handleDOBSet = ((dobSelected: string) => {
        if (!dobSelected) return;
        let dobInText = dobSelected.getDate() + '-' + (dobSelected.getMonth() + 1) + '-' + dobSelected.getFullYear();
        setSelectedDOBText(dobInText);
    });
    const handleError = (field: string, errorMessage: string) => {
        setErrors(prevState => ({ ...prevState, [field]: errorMessage }))
    }
    const switchOptions = [
        { label: "In progress", value: "1" },
        { label: "Approved", value: "2" },
    ];
    return (
        <View style={{ backgroundColor: Colors.white, flex: 1 }}>
            <Loader visible={loading} />
            <ScrollView contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
                <Text style={{ color: Colors.black, fontSize: 40, fontWeight: 'bold' }}>Requests</Text>
                <Text style={{ color: Colors.grey, fontSize: 18, marginVertical: 10 }}>Enter requests details.</Text>
                <View style={{ marginVertical: 20 }}>

                    <CustomDropdownList
                        data={requestTypes}
                        label="Request Type"
                        error={errors.requestType}
                        selectedId={inputs.requestTypeId}
                        onChange={item => {
                            handleDDLChange('requestType', item)
                        }}
                    />
                    <CustomTextInput
                        label="Amount"
                        data={inputs.amount}
                        iconName="person"
                        error={errors.amount}
                        placeholder="Enter amount"
                        keyboardType='numeric'
                        onFocus={() => { handleError('amount', null) }}
                        onChangeText={text => handleInputChange('amount', text)}
                    />
                    <CustomTextInput
                        label="Description"
                        data={inputs.description}
                        iconName="person"
                        error={errors.description}
                        placeholder="Enter description"
                        onFocus={() => { handleError('description', null) }}
                        onChangeText={text => handleInputChange('description', text)}
                    />
                    <CustomTextInput
                        label="Request By - Phone"
                        data={inputs.phone}
                        iconName="phone"
                        error={errors.phone}
                        placeholder="Enter member phone"
                        keyboardType='numeric'
                        onFocus={() => { handleError('phone', null) }}
                        onChangeText={text => handleInputChange('phone', text)}
                    />
                    <CustomTextInput
                        label="Name"
                        data={inputs.name}
                        iconName="person"
                        error={errors.name}
                        placeholder="Enter name"
                        onFocus={() => { handleError('name', null) }}
                        onChangeText={text => handleInputChange('name', text)}
                    />
                    <CustomDropdownList
                        data={talukas}
                        label="Taluka"
                        error={errors.taluka}
                        selectedId={inputs.talukaId}
                        onChange={item => {
                            handleDDLChange('taluka', item)
                        }}
                    />
                    <CustomDropdownList
                        data={villagesByTaluka}
                        label="Village"
                        error={errors.village}
                        selectedId={inputs.villageId}
                        onChange={item => {
                            handleDDLChange('village', item)
                        }}
                    />
                    {documentId && inputs.approved == true &&
                        <CustomTextInput
                            label="Approved Date"
                            data={inputs.approvedOn}
                            iconName="person"
                            error={errors.approvedOn}
                            placeholder="Enter approved On"
                            onFocus={() => { handleError('approvedOn', null) }}
                            onChangeText={text => handleInputChange('approvedOn', text)}
                        />}

                    {documentId &&
                        <SwitchSelector
                            options={switchOptions}
                            initial={0}
                            selectedColor={Colors.white}
                            buttonColor={Colors.lightgreen}
                            onPress={value => console.log(`Call onPress with value: ${value}`)}
                        />}

                    <CustomButton title="Save" onPress={() => validate()} />
                    {documentId && <CustomButton title="Delete" bgColor="lightgrey" color="black" onPress={() => deleteRequest()} />}
                </View>
            </ScrollView>
        </View>
    );
}

export default RequestsNew

const styles = StyleSheet.create({

})
