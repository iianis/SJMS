import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import Loader from '../components/Loader';
import Search from '../components/Search';

import firestore from '@react-native-firebase/firestore';
import CustomFlatList from '../components/CustomFlatList';

const Requests = ({ navigation }) => {
    const [selectedId, setSelectedId] = useState(null);
    const [itemsData, setItemsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uiDetails, setUIDetails] = useState({
        dbTable: "requests", redirectComponent: 'RequestsNew'
    });

    useEffect(() => {
        navigation.addListener('focus', async () => {
            console.log('loading...0');
            getItems();
        });
    }, []);

    const getItems = async () => {
        console.log('loading...');
        setLoading(true);
        setItemsData([]);

        await firestore()
            .collection(uiDetails.dbTable)
            .where('deleted', '==', false)
            .orderBy('createdOn', 'desc')
            .limit(50)
            .get()
            .then(itemsSnapshot => {
                itemsSnapshot.forEach(doc => {
                    console.log('loading...2');
                    if (doc?.exists) {
                        console.log('loading...3');
                        let itemDoc = doc.data();
                        itemDoc.id = doc.id;
                        setItemsData(items => [...items, itemDoc]);

                    } else {
                        console.log("Error getRequests: Invalid Document");
                    }
                });
                setLoading(false);
            });
    };

    const handleListSelection = (item: any) => {
        console.log('loading..', item)
        navigation.navigate(uiDetails.redirectComponent, { item: item });
    };

    return (
        <View style={styles.container}>
            <Loader visible={loading} />
            <View>
                <Search item={{ placeHolder: 'Search by any detail' }} />
            </View>
            <CustomButton title="Add New" onPress={() => navigation.navigate(uiDetails.redirectComponent, { item: null })} />
            <CustomFlatList data={itemsData} selectedId={selectedId} onSelect={(item) => { handleListSelection(item); }} />
        </View>
    );
};

export default Requests;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 150,
        height: 500,
    },
    cardContainer: {
        width: '100%'
    },
    tile1: {
        backgroundColor: 'red',
        height: 150,
        width: '50%',
        padding: 5,
    },
    item: {
        padding: 10,
        marginBottom: 5,
        marginHorizontal: 0,
        flexDirection: 'row',
    },
    itemImage: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginRight: 8,
        marginTop: 8,
    },
    title: {
        fontSize: 28,
    },
    title2: {
        fontSize: 18,
    },
    title3: {
        fontSize: 16,
    },
    cardRow2: {
        flex: 1,
        flexDirection: 'row',
        color: 'lightgrey',
    },
    cardRow3: {
        flex: 1,
        flexDirection: 'row',
        color: 'lightgrey',
    },
});

