import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'

const CustomFlatList = ({ data, selectedId }) => {
    return (
        <View style={styles.cardContainer}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
            />
        </View>
    )
}

export default CustomFlatList

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.cardRow, backgroundColor]}>
        <View style={styles.cardRow2}>
            <Text style={[styles.title, textColor]}>{item?.donationType}</Text>
        </View>
        {
            item.desc && <View style={styles.cardRow2}>
                <Text style={[styles.title2, textColor]}>Description: {item.desc}</Text>
            </View>
        }
        <View style={styles.cardRow2}>
            <Text style={[styles.title2, textColor]}>Amount: {item.amount}</Text>
        </View>
        <View style={styles.cardRow3}>
            <Text style={[styles.title2, textColor]}>Date: {new Date(item.date).toLocaleDateString()}</Text>
        </View>
    </TouchableOpacity>
);

const renderItem = ({ item, selectedId, onClick }) => {
    const backgroundColor = item.id === selectedId ? '#F9D162' : '#009387';
    const color = item.id === selectedId ? 'white' : 'black';
    //console.log('rendering Item');

    return (
        <Item
            item={item}
            onPress={() => {
                onClick ? onClick(item.id) : null;
                console.log('selected item id: ', item.id);
                //navigation.navigate('MemberDetails', {item: item});
            }}
            backgroundColor={{ backgroundColor }}
            textColor={{ color }}
        />
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
    },
    title2: {
        fontSize: 16,
    },
    cardContainer: {
        width: '100%'
    },
    cardRow: {
        padding: 10,
        marginTop: 5,
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