import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { directors } from '../data/directors';

const Directors2 = () => {
  return (
    <View style={styles.container}>
      <View>
        <FlatList
          style={styles.fl}
          data={directors}
          renderItem={() => {
            return (
              <View style={styles.carditem}><Text>Hello..</Text></View>
            )
          }}
        />
      </View>
    </View>
  )
}

export default Directors2;


import { Image, ScrollView, TouchableOpacity } from 'react-native';
import Membersv2 from './Membersv2';
import IntroCards from './IntroCards';
//import Dropdown from 'react-native-material-dropdown';

const Intro = ({ navigation }) => {
  useEffect(() => {
    //setFilteredTalukas(talukas);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled>
        <View style={styles.sectionMain}>
          <Image
            source={require('../images/logo.jpg')}
            style={styles.logoImage}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>We SHIKALGARs</Text>
        </View>
        <View style={styles.sectionMain}>
          <Text style={styles.sectionText}>
            This organization was formed on 22nd March 1996 to help our
            community to get benefits from different Government Schemes and
            spread message of how important education is to our society.
          </Text>
        </View>
        <View style={styles.sectionMain}>
          <Text style={styles.sectionText}>
            Our main focus is on Education, HealthCare, and Other needs of our
            people. We try to reachout to our members who are blessed and doing
            well by the grace of Allah, to come forward and donate at different
            occasions & causes like Jakat, Qurbani, Sadaka, and many other
            voluntary reasons. We use these fund to help our people in need.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Founder</Text>
        </View>
        <View style={styles.sectionMain}>
          <Image
            source={require('../images/members/founder.jpg')}
            style={styles.logoImage}
          />
          <Text style={styles.sectionText}>
            Late Mr. Nijamuddin Shaikhdin, Satara
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Schemes</Text>
        </View>
        <View style={styles.sectionMain}>
          <Text style={styles.sectionText}>
            Maulana Azad Finance Corporation - Education Loan
          </Text>
          <Text style={styles.sectionText}>
            Nationalized Bank - Education Loan
          </Text>
          <Text style={styles.sectionText}>
            Maulana Azad Education Trust - Scholarship For Girls
          </Text>
          <Text style={styles.sectionText}>
            Sanjay Gandhi Yojana - for Disabled, Widow, and Underpriviledged
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Members</Text>
        </View>
        <View style={styles.sectionMain}>
          <Membersv2 />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Our Team</Text>
        </View>
        <TouchableOpacity style={styles.sectionMain}
          onPress={() => { navigation.navigate('Directors', { filter: 'director' }); }}>
          <Image
            source={require('../images/5.jpg')}
            style={styles.cardImage}
          />
          <Text style={styles.sectionText}>
            Board of Director's
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionMain}
          onPress={() => { navigation.navigate('Volunteers', { filter: 'volunteer' }); }}>
          <Image
            source={require('../images/members.jpg')}
            style={styles.cardImage}
          />
          <Text style={styles.sectionText}>
            Taluka Commitee
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionMain}
          onPress={() => { navigation.navigate('Founders', { filter: 'founder' }); }}>
          <Image
            source={require('../images/4.jpg')}
            style={styles.cardImage}
          />
          <Text style={styles.sectionText}>
            Founder Member's
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionMain}
          onPress={() => { navigation.navigate('Donations'); }}>
          <Image
            source={require('../images/8.jpg')}
            style={styles.cardImage}
          />
          <Text style={styles.sectionText}>
            Donations
          </Text>
        </TouchableOpacity>
        <View style={styles.sectionMain}>
          <Text style={styles.sectionHeader}></Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Our Family</Text>
        </View>
        <View style={styles.sectionMain}>
          <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.cardMain} onPress={() => { navigation.navigate('Members', { filter: "Founder Member" }) }}>
              <View style={styles.cardBody}>
                <Text style={styles.cardText}>
                  Founder Members
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardMain} onPress={() => { navigation.navigate('Members', { filter: "Director" }) }}>
              <View style={styles.cardBody}>
                <Text style={styles.cardText}>
                  Directors
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardMain} onPress={() => { navigation.navigate('MemberNew') }}>
              <View style={styles.cardBody}>
                <Text style={styles.cardText}>
                  Taluka Committee
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardMain} onPress={() => { navigation.navigate('Members', { filter: "Member" }) }}>
              <View style={styles.cardBody}>
                <Text style={styles.cardText}>
                  Members
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>At your service</Text>
        </View>
        <View style={styles.sectionMain}>
          <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.cardMain} onPress={() => { navigation.navigate('ServiceAreas') }}>
              <View style={styles.cardBody}>
                <Text style={styles.cardText}>
                  Education
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardMain} onPress={() => { navigation.navigate('Donations') }}>
              <View style={styles.cardBody}>
                <Text style={styles.cardText}>
                  Fees & Donations
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardMain}>
              <View style={styles.cardBody}>
                <Text style={styles.cardText}>
                  Meetings
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardMain}>
              <View style={styles.cardBody}>
                <Text style={styles.cardText}>
                  Need Help?
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View >
  );
};


const styles = StyleSheet.create({
  carditem: {
    width: '90%', height: '150'
  },
  fl: {
    height: 150, width: '90%'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: { width: 250, height: 250, borderRadius: 120, marginVertical: 20 },
  cardImage: { width: 100, height: 100, borderRadius: 120, marginVertical: 20 },
  sectionMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 15,
    backgroundColor: '#009387',
    borderRadius: 20,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    borderTopWidth: 0,
    borderTopColor: 'white',
  },
  sectionText: {
    fontSize: 20,
    paddingHorizontal: 30,
    paddingVertical: 3,
    textAlign: 'justify',
  },
});


