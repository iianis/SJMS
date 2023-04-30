import { View, Text, StyleSheet, Keyboard, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { ScrollView } from 'react-native-gesture-handler'
import CustomTextInput from '../components/CustomTextInput'
import CustomButton from '../components/CustomButton'
import Loader from '../components/Loader'
import CustomDropdownList from '../components/CustomDropdownList'
import { talukas, villages } from '../data/geography'
import firestore from '@react-native-firebase/firestore';
import { educations, memberPublicTypes, memberTypes, relations, works } from '../data/members';
import DateTimePicker from '@react-native-community/datetimepicker';

const MemberNew = ({ navigation, route }) => {
    const item = route.params?.item;
    const [documentId, setDocumentId] = useState('');
    const [villagesByTaluka, setVillagesByTaluka] = useState([]);
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
        work: 'Other',
        workId: 99,
        education: 'Other',
        educationId: 99,
        memberType: 'Member',
        memberTypeId: 8,
        relation: 'Self',
        relationId: 1,
        familyMembers: 1,
        fees: [],
        requests: [],
        invitations: [],
        certificateIssued: false,
        donations: [],
        active: true,
    });
    //console.log("onrefresh: ", inputs);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [dobToggle, setDOBToggle] = useState(false);
    const [selectedDOB, setSelectedDOB] = useState(new Date());
    const [selectedDOBText, setSelectedDOBText] = useState("");

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
                        //console.log(res);
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
        if (item) {
            loadMember();
        } else setLoading(false);
    }, []);

    const loadMemberDetails = (data, memberId) => {
        setInputs(data);
        handleDOBSet(data.dob.toDate());
        setSelectedDOB(data.dob.toDate());
        handleDDLChange("taluka", { id: data.talukaId, name: data.taluka });
        setDocumentId(memberId);
    };

    const loadMember = async () => {
        setLoading(true);
        await firestore()
            .collection('members')
            .doc(item.id)
            .get()
            .then(memberSnapshot => {
                if (memberSnapshot.exists) {
                    let data = memberSnapshot.data();
                    loadMemberDetails(data, memberSnapshot.id);
                } else {
                    console.log("No matching member found! documentId: ", documentId);
                    setDocumentId('');
                }
                setLoading(false);
            });
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
                                    if (!familyPhone) loadMemberDetails(data, item.id);
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
            setVillagesByTaluka(villagesByFilter);
        }
        if (field === 'memberType') {
            clearFormFields(changedItem);
        }
        //setInputs(prevState => ({ ...prevState, [fieldId]: item.id }));
    }

    const handleError = (field: string, errorMessage: string) => {
        setErrors(prevState => ({ ...prevState, [field]: errorMessage }))
    }

    const handleDOBChange = ((event, dobSelected) => {
        const dobDate = dobSelected || selectedDOB;
        setInputs(prevState => ({ ...prevState, ["dob"]: dobDate }));
        setSelectedDOB(dobDate);
        let dobInText = dobDate.getDate() + '-' + (dobDate.getMonth() + 1) + '-' + dobDate.getFullYear();
        setSelectedDOBText(dobInText);
    });

    const handleDOBSet = ((dobSelected: string) => {
        let dobInText = dobSelected.getDate() + '-' + (dobSelected.getMonth() + 1) + '-' + dobSelected.getFullYear();
        setSelectedDOBText(dobInText);
    });

    const clearFormFields = (member: any) => {
        setInputs({
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
            work: 'Other',
            workId: 99,
            education: 'Other',
            educationId: 99,
            memberType: member.name,
            memberTypeId: member.id,
            relation: (member.name == 'Family' ? 'Other' : 'Self'),
            relationId: (member.name == 'Family' ? 99 : 1),
            familyMembers: 1,
            fees: [],
            requests: [],
            invitations: [],
            certificateIssued: false,
            donations: [],
            active: true,
        });
        setSelectedDOBText('');
    };

    //console.log('inputs - education : ', inputs.education + "== work : " + inputs.work);
    //console.log('errors: ', errors)

    return (
        <View style={{ backgroundColor: Colors.white, flex: 1 }}>
            <Loader visible={loading} />
            <ScrollView contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
                <Text style={{ color: Colors.black, fontSize: 40, fontWeight: 'bold' }}>Member</Text>
                <Text style={{ color: Colors.grey, fontSize: 18, marginVertical: 10 }}>Enter member details</Text>
                <View style={{ marginVertical: 20 }}>

                    <CustomDropdownList
                        data={memberPublicTypes}
                        label="Member Type"
                        error={errors.memberType}
                        selectedId={inputs.memberTypeId || 8}
                        onChange={item => {
                            handleDDLChange('memberType', item)
                        }}
                    />
                    {inputs.memberType == 'Family' && <View>
                        <CustomTextInput
                            label="Family Phone"
                            data={inputs.familyPhone}
                            iconName="phone"
                            error={errors.familyPhone}
                            placeholder="Enter family phone"
                            keyboardType='numeric'
                            onFocus={() => { handleError('familyPhone', null) }}
                            onChangeText={text => handleInputChange('familyPhone', text)}
                        />
                        <CustomDropdownList
                            data={relations}
                            label="Relation"
                            error={errors.relation}
                            selectedId={inputs.relationId || 1}
                            onChange={item => {
                                handleDDLChange('relation', item)
                            }}
                        />
                    </View>}
                    <CustomTextInput
                        label="Member Phone"
                        data={inputs.phone}
                        iconName="phone"
                        error={errors.phone}
                        placeholder="Enter members phone"
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
                    <CustomDropdownList
                        data={educations}
                        label="Education"
                        error={errors.education}
                        selectedId={inputs.educationId || 1}
                        onChange={(item: any) => {
                            handleDDLChange('education', item);
                            //handleDDLChange('work', item);
                        }}
                    />
                    {inputs.education != 'Student' && <View>
                        <CustomDropdownList
                            data={works}
                            label="Work"
                            error={errors.work}
                            selectedId={inputs.workId || 1}
                            onChange={item => {
                                handleDDLChange('work', item)
                            }}
                        />
                    </View>
                    }
                    <View style={{ marginTop: 20 }}>
                        <Text
                            style={{ fontSize: 14, fontWeight: 'bold' }}
                            onPress={() => { setDOBToggle(true); }}>
                            Date of Birth: {selectedDOBText}
                        </Text>
                    </View>
                    {dobToggle && <View><DateTimePicker
                        value={selectedDOB}
                        mode="date"
                        display="default"
                        onChange={(event, data) => {
                            setDOBToggle(false);
                            handleDOBChange(event, data);
                        }}

                    /></View>}
                    <CustomButton title="Save" onPress={() => validate()} />
                </View>
            </ScrollView>
        </View>
    )
}

export default MemberNew

const styles = StyleSheet.create({

})
