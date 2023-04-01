import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

const Intro = ({ navigation }: { navigation: any }) => {
    useEffect(() => {
        //setFilteredTalukas(talukas);
    }, []);

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
                        Our organization was formed on 22nd March 1996 to help our
                        community to get benefits from different Government Schemes and
                        spread message of how important education is to our society.
                    </Text>
                </View>
                <View style={styles.sectionMain}>
                    <Text style={styles.sectionText}>
                        Our main focus is on Education, HealthCare, and Other needs of our
                        people. We try to reachout to our members who are blessed and doing
                        well by the grace of Allah, to come forward and contribute at different
                        occasions/causes like Jakat, Qurbani, Sadaka, and other
                        voluntary reasons. We use these fund to help our people in need.
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
                                    Taluka Commitee
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
                        <TouchableOpacity style={styles.cardMain} onPress={() => { navigation.navigate('MemberNew') }}>
                            <View style={styles.cardBody}>
                                <Text style={styles.cardText}>
                                    Education
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cardMain} onPress={() => { navigation.navigate('Donations') }}>
                            <View style={styles.cardBody}>
                                <Text style={styles.cardText}>
                                    Donations
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
    }
});
