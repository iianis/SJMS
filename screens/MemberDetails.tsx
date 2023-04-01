import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
} from 'react-native';
//import {member} from './data/members';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MemberDetails = ({ route, navigation }) => {
  const item = route.params.item;
  //console.log('id1 = ', item.id);
  const [documentId, setDocumentId] = useState('');
  const [memberData, setMemberData] = useState({
    name: '',
    address: '',
    phone: '',
    taluka: '',
    dob: '',
    village: '',
    occupation: 'Business',
    education: 'Graduate',
    memberType: 'Member',
    familyMembers: '2',
    fees: '0',
    requests: '',
    invitaions: '',
    certificate: '',
    donations: '0',
    active: true,
  });

  useEffect(() => {
    //console.log('UseEffect ..', item.id);
    if (item) {
      getMember();
    }
  }, []);

  const getMember = async () => {
    //console.log(documentId);
    await firestore()
      .collection('members')
      .doc(item.id)
      .get()
      .then(memberSnapshot => {
        if (memberSnapshot.exists) {
          //console.log(memberSnapshot.data());
          //setMemberData(memberSnapshot.data());
          setDocumentId(memberSnapshot.id);
        } else {
          //console.log(Math.random().toString(36).toString(7));
          setDocumentId(Math.random().toString(36).toString(7));
        }
      });
  };

  const updateMember = async () => {
    console.log('updating..');
    await firestore().collection('members').doc(documentId).set(memberData);
  };

  const addMember = async () => {
    console.log('adding..');
    await firestore()
      .collection('members')
      .add(memberData)
      .then(res => {
        console.log(res);
      });
    navigation.navigate('Members');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Edit Member!</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            right: 80,
            top: 15,
            flex: 1,
            zIndex: 1,
          }}>
          <Icon name="backspace" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={item ? updateMember : addMember}
          style={{
            position: 'absolute',
            right: 15,
            top: 15,
            flex: 1,
            zIndex: 1,
          }}>
          <Icon name="save" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <ScrollView>
          <Text style={styles.textFooter}>Name</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Enter members name"
              style={styles.textInput}
              value={memberData.name}
              onChangeText={val => {
                setMemberData({ ...memberData, name: val });
              }}
            />
          </View>

          <Text style={styles.textFooter}>Mobile #</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Enter your mobile number"
              style={styles.textInput}
              value={memberData.phone}
              onChangeText={val => {
                setMemberData({ ...memberData, phone: val });
              }}
            />
            {memberData == null ? (
              <Text style={styles.textInvalid}>Invalid Input</Text>
            ) : null}
          </View>

          <Text style={styles.textFooter}>Village</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Select Village"
              style={styles.textInput}
              value={memberData.village}
              onChangeText={val => {
                setMemberData({ ...memberData, village: val });
              }}
            />
          </View>

          <Text style={styles.textFooter}>Taluka</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Select Taluka"
              style={styles.textInput}
              value={memberData.taluka}
              onChangeText={val => {
                setMemberData({ ...memberData, taluka: val });
              }}
            />
          </View>
          <Text style={styles.textFooter}>Education</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Enter your Education"
              style={styles.textInput}
              value={memberData.education ? memberData.education : 'Graduate'}
              onChangeText={val => {
                setMemberData({ ...memberData, education: val });
              }}
            />
          </View>
          <Text style={styles.textFooter}>Occupation</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Enter your Occupation"
              style={styles.textInput}
              value={
                memberData.occupation ? memberData.occupation : 'Fabrication'
              }
              onChangeText={val => {
                setMemberData({ ...memberData, occupation: val });
              }}
            />
          </View>
          <Text style={styles.textFooter}>DOB</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="MM/YYYY"
              style={styles.textInput}
              value={memberData.dob}
              onChangeText={val => {
                setMemberData({ ...memberData, dob: val });
              }}
            />
          </View>

          <Text style={styles.textFooter}>Designation</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Select member type"
              style={styles.textInput}
              value={memberData.memberType}
              onChangeText={val => {
                setMemberData({ ...memberData, memberType: val });
              }}
            />
          </View>

          <Text style={styles.textInfo}>
            Family Members:{' '}
            {memberData.familyMembers ? memberData.familyMembers : 2}
          </Text>
          <Text style={styles.textInfo}>
            Fees Received: Rs. {memberData.fees ? memberData.fees : 0}
          </Text>
          <Text style={styles.textInfo}>
            Fees Received: Rs. {memberData.donations ? memberData.donations : 0}
          </Text>
          <Text style={styles.textInfo}>
            Cast Cetificate Issued on 01/01/2024
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default MemberDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  cardHeader: { fontSize: 16, color: 'red', paddingBottom: 5 },
  cardLine1: { fontSize: 16, color: 'red', paddingBottom: 5 },
  cardLine2: { fontSize: 16, color: 'red', paddingBottom: 5 },
  header: {
    flex: 0.8,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  footer: {
    flex: 9,
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
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  text: {
    fontSize: 12,
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
  },
  textHeader: { color: '#fff', fontSize: 30, fontWeight: 'bold' },
  textFooter: { fontSize: 20 },
  textInfo: {
    fontSize: 20,
    fontStyle: 'italic',
    paddingVertical: 10,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: 0,
    paddingLeft: 10,
    fontSize: 18,
    color: '#05375a',
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInvalid: { color: 'red', fontSize: 12 },
});
