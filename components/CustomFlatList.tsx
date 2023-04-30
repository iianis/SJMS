import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'

const CustomFlatList = ({ data, selectedId, onSelect }) => {

    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.cardRow, backgroundColor]}>
            {
                item.donationType && <View style={styles.cardRow2}>
                    <Text style={[styles.title, textColor]}>{item?.donationType}</Text>
                </View>
            }
            {
                item.eventType && <View style={styles.cardRow2}>
                    <Text style={[styles.title, textColor]}>{item?.eventType}</Text>
                </View>
            }
            {
                item.description && <View style={styles.cardRow2}>
                    <Text style={[styles.title2, textColor]}>Description: {item.description}</Text>
                </View>
            }
            {
                item.phone && <View style={styles.cardRow2}>
                    <Text style={[styles.title2, textColor]}>Doner: ******{item.phone.toString().substring(6)}</Text>
                </View>
            }
            {
                item.receiptNumber && <View style={styles.cardRow2}>
                    <Text style={[styles.title2, textColor]}>Receipt#: {item.receiptNumber == '' ? 'In progress' : item.receiptNumber}, Amount: {item.amount}</Text>
                </View>
            }
            {
                item.receivedOn && <View style={styles.cardRow3}>
                    <Text style={[styles.title2, textColor]}>Date: {new Date(item.receivedOn).toLocaleDateString()}, Place: {item.village}</Text>
                </View>
            }
            {
                item.eventDate && <View style={styles.cardRow3}>
                    <Text style={[styles.title2, textColor]}>Date: {new Date(item.eventDate).toLocaleDateString()}, Place: {item.palce}</Text>
                </View>
            }
        </TouchableOpacity>
    );

    const renderItem = ({ item, selectedId }) => {
        const backgroundColor = item.id === selectedId ? '#F9D162' : '#009387';
        const color = item.id === selectedId ? 'white' : 'black';

        return (
            <Item
                item={item}
                onPress={() => {
                    onSelect ? onSelect(item) : null;
                }}

                key={item.id}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };

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

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
    },
    title2: {
        fontSize: 16,
    },
    cardContainer: {
        width: '100%', height: '82%'
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