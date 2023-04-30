import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Keyboard, Alert } from 'react-native';
import { eventTypes, IEvent } from '../data/misc';
import firestore from '@react-native-firebase/firestore';
import CustomDropdownList from '../components/CustomDropdownList';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import Loader from '../components/Loader';
import Colors from '../data/colorscheme';
import { talukas, villages } from '../data/geography';

const AlertsNew = ({ navigation, route }) => {
    //const [selectedId, setSelectedId] = useState(1);
    const item = route.params?.item;
    const [documentId, setDocumentId] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    //const [selectedDOB, setSelectedDOB] = useState(new Date());
    //const [selectedDOBText, setSelectedDOBText] = useState("");
    const [villagesByTaluka, setVillagesByTaluka] = useState([]);
    const [inputs, setInputs] = useState<IEvent>({
        name: '',
        description: '',
        eventType: 'Meeting',
        eventTypeId: 1,
        deleted: false,
        eventDate: '',
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

        //console.log('saving event..valid', valid);
        if (valid) {
            console.log('saving event..documentId', documentId);
            if (documentId) update(); else save();
        }
    }

    const save = () => {
        setLoading(true);
        console.log('saving event..');
        setTimeout(async () => {
            setLoading(false);
            try {
                await firestore()
                    .collection('events')
                    .add(inputs)
                    .then(res => {
                        //console.log(res);
                    });
            } catch (error) {
                Alert.alert("Error", "Event Save - Something went wrong.");
                console.log(error);
            } finally {
                navigation.navigate('Alerts', { filter: null });
            }
        }, 3000)
    };

    const update = async () => {
        console.log('updating event..');
        try {
            inputs.updatedBy = '';
            inputs.updatedOn = new Date().toString();
            await firestore().collection('events').doc(documentId).set(inputs);
        } catch (error) {
            Alert.alert("Error", "Event Update - Something went wrong.");
        } finally {
            navigation.navigate('Alerts', { filter: null });
        }

    };

    const deleteEvent = async () => {
        setLoading(true);
        try {
            inputs.deleted = true;
            await firestore().collection('events').doc(documentId).set(inputs);
        } catch (error) {
            Alert.alert("Error", "Event Update - Something went wrong.");
        } finally {
            navigation.navigate('Alerts', { filter: null });
        }
    };

    const clearFormFields = () => {
        console.log('clear event');
        setInputs({
            name: '',
            description: '',
            eventType: 'Meeting',
            eventTypeId: 1,
            deleted: false,
            eventDate: '',
            createdOn: new Date().toString(),
            createdBy: 'Admin',
            updatedOn: '',
            updatedBy: '',
        });
        navigation.navigate('Alerts');
    }

    const handleInputChange = (field: string, item: any) => {
        //console.log('field item:', field, item);
        setInputs(prevState => ({ ...prevState, [field]: item }));
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

    const handleError = (field: string, errorMessage: string) => {
        setErrors(prevState => ({ ...prevState, [field]: errorMessage }))
    }

    return (
        <View style={{ backgroundColor: Colors.white, flex: 1 }}>
            <Loader visible={loading} />
            <ScrollView contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
                <Text style={{ color: Colors.black, fontSize: 40, fontWeight: 'bold' }}>Event Notifications</Text>
                <Text style={{ color: Colors.grey, fontSize: 18, marginVertical: 10 }}>Enter event details.</Text>
                <View style={{ marginVertical: 20 }}>

                    <CustomDropdownList
                        data={eventTypes}
                        label="Event Type"
                        error={errors.eventType}
                        selectedId={inputs.eventTypeId}
                        onChange={item => {
                            handleDDLChange('eventType', item)
                        }}
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
                        label="Date"
                        data={inputs.eventDate}
                        iconName="person"
                        error={errors.eventDate}
                        placeholder="Enter Event Date dd/mm/yy"
                        keyboardType='numeric'
                        onFocus={() => { handleError('eventDate', null) }}
                        onChangeText={text => handleInputChange('eventDate', text)}
                    />
                    <CustomButton title="Save" onPress={() => validate()} />
                    {documentId && <CustomButton title="Delete" onPress={() => deleteEvent()} />}
                </View>
            </ScrollView>
        </View>
    );
}

export default AlertsNew

const styles = StyleSheet.create({

})
