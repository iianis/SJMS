import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import InternetConnected from '../components/InternetConnected';

const Intro = ({ navigation }: { navigation: any }) => {
    useEffect(() => {
        //setFilteredTalukas(talukas);
    }, []);

    const cardSelected = (cardName: string) => {
        switch (cardName) {
            case "feesdonations": navigation.navigate("Donations"); break;
            case "alerts": navigation.navigate("Alerts"); break;
            case "schemes": navigation.navigate("Schemes"); break;
            case "requests": navigation.navigate("Requests"); break;
            case "members": navigation.navigate("Members", { filter: "Member" }); break;
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.sectionMain}>
                    <Image
                        source={require('../images/logo.jpg')}
                        style={styles.logoImage}
                    />
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>THE SHIKALGAR's</Text>
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
                        community. We try to reachout to our members who are blessed and doing
                        well by the grace of Allah, to come forward and contribute for different
                        causes/occasions like Education, Jaqat, Sadaqa, Qurbani, and other
                        voluntary reasons.
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Founder</Text>
                </View>
                <View style={styles.sectionMain}>
                    <Image
                        source={require('../images/members/founder.jpg')}
                        style={styles.cardImage}
                    />
                    <Text style={styles.sectionText}>
                        Late Mr. Nijamuddin S. Shikalgar
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Be part of our Journey</Text>
                </View>
                <View style={styles.sectionMain}>
                    <Text style={styles.sectionText}>
                        Please join us on this journey to help our brothers and sisters to achieve their dreams. This would definitely give you a feel of satisfaction in the cause of Almighty.
                    </Text>
                </View>
                <TouchableOpacity onPress={() => { cardSelected("members"); }} style={[styles.item, { backgroundColor: '#009387' }]}>
                    <Text style={[styles.title, { color: 'white' }]}>Members</Text>
                    <Image source={require('../images/members.jpg')} style={{ height: 200, width: '100%' }} />
                    <View style={styles.cardRow2}>
                        <Text style={[styles.title2, { backgroundColor: '#009387', color: 'white' }]}>Contribute and be a part of the change.</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { cardSelected("alerts"); }} style={[styles.item, { backgroundColor: '#F9D162' }]}>
                    <Text style={[styles.title, { color: 'white' }]}>Alerts & Notifications</Text>
                    <Image source={require('../images/alerts.png')} style={{ height: 200, width: '100%' }} />
                    <View style={styles.cardRow2}>
                        <Text style={[styles.title2, { backgroundColor: '#F9D162', color: 'white' }]}>Alerts and Notifications for Meetings, Activities, & unforseen Events.</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { cardSelected("requests"); }} style={[styles.item, { backgroundColor: '#009387' }]}>
                    <Text style={[styles.title, { color: 'white' }]}>Need Help?</Text>
                    <Image source={require('../images/requests.png')} style={{ height: 200, width: '100%' }} />
                    <View style={styles.cardRow2}>
                        <Text style={[styles.title2, { backgroundColor: '#009387', color: 'white' }]}>
                            If you are in a need, please reach out to us by posting a request with due details.
                            Which inturn would be reviewed by our senior members.</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { cardSelected("feesdonations"); }} style={[styles.item, { backgroundColor: '#F9D162' }]}>
                    <Text style={[styles.title, { color: 'white' }]}>Fees & Donations</Text>
                    <Image source={require('../images/donations.jpg')} style={{ height: 200, width: '100%' }} />
                    <View style={styles.cardRow2}>
                        <Text style={[styles.title2, { backgroundColor: '#F9D162', color: 'white' }]}>List of community members.</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { cardSelected("education"); }} style={[styles.item, { backgroundColor: '#009387' }]}>
                    <Text style={[styles.title, { color: 'white' }]}>Govt. and Other Schemes</Text>
                    <Image source={require('../images/scholarships.jpg')} style={{ height: 200, width: '100%' }} />
                    <View style={styles.cardRow2}>
                        <Text style={[styles.title2, { backgroundColor: '#009387', color: 'white' }]}>
                            Please be informed about government and other private organization schemes for Education, Higher Education, Businesses, and Needy people.
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
            <InternetConnected />
        </View >
    );
};

export default Intro;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: { width: 250, height: 250, borderRadius: 120, marginVertical: 20 },
    cardImage: { width: 200, height: 200, borderRadius: 120, marginBottom: 10 },
    sectionMain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 20,
    },
    section: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 5,
        backgroundColor: '#009387',
        borderRadius: 5,
        borderWidth: 1, borderColor: 'grey', height: 50,
    },
    sectionHeader: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    sectionText: {
        fontSize: 20,
        paddingHorizontal: 30,
        marginBottom: 10,
        textAlign: 'justify',
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', padding: 5, width: '100%'

    }, cardMain: {
        width: '48.5%', height: 120, margin: 3, backgroundColor: 'pink',

    }, cardBody: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, cardText: {
        fontSize: 20,
    },
    item: {
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 10,
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
});
