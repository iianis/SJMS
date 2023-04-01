import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';

//import {Members} from ''

import { founders } from '../data/directors';

const Founders = ({ navigation, route }) => {
    const [selectedId, setSelectedId] = useState(null);
    const item = route.params.filter;

    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
            <View>
                <Image
                    source={require('../images/members/profile.jpg')}
                    style={styles.itemImage}
                />
            </View>
            <View>
                <Text style={[styles.title, textColor]}>{item.name}</Text>
                <View style={styles.cardRow2}>
                    <Text style={[styles.title2, textColor]}>Taluka: {item.taluka}</Text>
                    <Text style={[styles.title2, textColor]}>, {item.memberType}</Text>
                </View>
                <View style={styles.cardRow3}>
                    <Text style={[styles.title3, textColor]}>Phone: {item.phone}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? '#F9D162' : '#009387';
        const color = item.id === selectedId ? 'white' : 'black';

        return (
            <Item
                item={item}
                onPress={() => {
                    setSelectedId(item.id);
                    navigation.navigate(
                        item.component ? item.component : 'WorkInProgress',
                        { item: item },
                    );
                }}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={founders}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
            />
        </View>
    );
};

export default Founders;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
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
    itemImage: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginRight: 8,
        marginTop: 8,
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
