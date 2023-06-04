import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from './AuthContext'

export const ProfileIcon = () => {
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        right: 5,
        top: 5,
        flex: 1,
        zIndex: 1,
        backgroundColor: 'white',
        borderRadius: 50,
      }}
    />
  );
};

export const TableRow = ({ item }) => {
  return (
    <View style={styles.tableRow}>
      <View style={styles.tableRowLeft}>
        <Text style={styles.tableRowLeftText}>{item.key}</Text>
      </View>
      <View style={styles.tableRowRight}>
        <Text style={styles.tableRowRightText}>{item.value}</Text>
      </View>
    </View>
  );
};

const Profile = ({ navigation, route }) => {
  const phone = route.params.item;
  const { logout } = useContext(AuthContext);
  const [documentId, setDocumentId] = useState('');
  const [memberData, setMemberData] = useState({
    name: '',
    address: '',
    phone,
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
    //console.log('UseEffect ..');
    getMember();
  }, []);

  const getMember = async () => {
    //let memberDocument = await firestore().collection('members').doc('1').get();
    /*firestore()
      .collection('members')
      .where('phone', '==', phone)
      .onSnapshot(member => {
        //console.log(member._docs[0]._data);
        setMemberData({
          name: member._docs[0]._data.name,
          address: member._docs[0]._data.address,
          phone: member._docs[0]._data.phone,
          taluka: member._docs[0]._data.taluka,
          dob: member._docs[0]._data.dob,
          village: member._docs[0]._data.village,
          occupation: member._docs[0]._data.occupation,
          education: member._docs[0]._data.education,
          memberType: member._docs[0]._data.memberType,
          familyMembers: member._docs[0]._data.familyMembers,
          fees: member._docs[0]._data.fees,
          requests: member._docs[0]._data.requests,
          invitaions: member._docs[0]._data.invitaions,
          certificate: member._docs[0]._data.certificate,
          donations: member._docs[0]._data.donations,
          active: member._docs[0]._data.active,
        });
      });*/

    /*firestore()
      .collection('members')
      .where('phone', '==', phone)
      .onSnapshot(members => {
        console.log(' total records: ' + members.size);
        members.forEach(doc => {
          console.log(' record data: ' , doc.data());
        });
      });*/

    await firestore()
      .collection('members')
      .where('phone', '==', phone)
      .get()
      .then(memberSnapshot => {
        //console.log(' total records: ' + memberSnapshot.size);
        memberSnapshot.forEach(doc => {
          //console.log(' record data: ', doc.data());
          if (doc.exists) {
            setMemberData(doc.data());
            setDocumentId(doc.id);
          } else {
            //console.log(Math.random().toString(36).toString(7));
            setDocumentId(Math.random().toString(36).toString(7));
          }
        });
      });
  };

  const updateMember = async () => {
    await firestore().collection('members').doc(documentId).set(memberData);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => { navigation.navigate('Intro'); logout(); }}
        style={{
          position: 'absolute',
          right: 5,
          top: 5,
          flex: 1,
          zIndex: 1,
        }}>
        <Icon name="logout" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={updateMember}
        style={{
          position: 'absolute',
          left: 5,
          top: 5,
          flex: 1,
          zIndex: 1,
        }}>
        <Icon name="save" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('ServiceAreas')}
        style={{
          position: 'absolute',
          right: 5,
          top: 70,
          flex: 1,
          zIndex: 1,
        }}>
        <Icon name="featured-play-list" size={30} color="#F9D162" />
      </TouchableOpacity>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('ServiceAreas')}>
          <Image
            source={require('../images/members/profile.jpg')}
            style={styles.photo}
          />
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
              value={phone}
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

          <Text style={styles.textFooter}>Member</Text>
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

export default Profile;

const styles = StyleSheet.create({
  tableRow: { flexDirection: 'row', marginBottom: 5 },
  tableRowLeft: { flex: 2 },
  tableRowLeftText: { fontSize: 18, fontWeight: 'bold' },
  tableRowRight: { flex: 4 },
  tableRowRightText: { fontSize: 18 },
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  footer: {
    flex: 4,
    backgroundColor: '#fff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
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
    marginVertical: 10,
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 3,
    height: 35,
    paddingTop: 5,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 90,
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
