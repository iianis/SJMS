
import firestore from '@react-native-firebase/firestore';

const getDirectors = async () => {
  //console.log(documentId);
  await firestore()
    .collection('members')
    .where('memberType', '==', 'Director')
    .get()
    .then(snapShot => {
      let items: string[] = [];
      if (snapShot && snapShot.docs) {
        snapShot.docs.map(item => {
          items.push(item);
        })
      }
      return items;
    });
};

const getMember = async (documentId) => {
  //console.log(documentId);
  await firestore()
    .collection('members')
    .doc(documentId)
    .get()
    .then(memberSnapshot => {
      if (memberSnapshot.exists) {
        //console.log(memberSnapshot.data());
        //setMemberData(memberSnapshot.data());
        //setDocumentId(memberSnapshot.id);
      } else {
        //console.log(Math.random().toString(36).toString(7));
        //setDocumentId(Math.random().toString(36).toString(7));
      }
    });
};

const updateMember = async (documentId, memberData) => {
  console.log('updating..');
  await firestore().collection('members').doc(documentId).set(memberData);
};
const addMember = async (memberData) => {
  console.log('adding..');
  await firestore()
    .collection('members')
    .add(memberData)
    .then(res => {
      console.log(res);
    });
};