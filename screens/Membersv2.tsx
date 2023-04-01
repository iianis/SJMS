import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const districts = [
    { label: 'Satara', value: '1' },
    { label: 'Pune', value: '2' },
    { label: 'Mumbai', value: '3' },
    { label: 'Sangli', value: '4' },
    { label: 'Solapur', value: '5' },
];

const talukas = [
    { label: 'Satara', value: '1', district: 'Satara' },
    { label: 'Karad', value: '2', district: 'Satara' },
    { label: 'Koregaon', value: '3', district: 'Satara' },
    { label: 'Khatav', value: '4', district: 'Satara' },
    { label: 'Maan', value: '5', district: 'Satara' },
    { label: 'Wai', value: '6', district: 'Satara' },
    { label: 'Khandala', value: '7', district: 'Satara' },
    { label: 'Phaltan', value: '8', district: 'Satara' },
    { label: 'Patan', value: '9', district: 'Satara' },
];

const villages = [
    {
        label: 'Satara',
        value: '1',
        taluka: 'Satara',
        district: 'Satara',
        families: 53,
        population: 268,
    },
    {
        label: 'Nagthane',
        value: '2',
        taluka: 'Satara',
        district: 'Satara',
        families: 28,
        population: 161,
    },
    {
        label: 'Tasgaon',
        value: '3',
        taluka: 'Satara',
        district: 'Satara',
        families: 1,
        population: 8,
    },
    {
        label: 'Phaltan',
        value: '4',
        taluka: 'Phaltan',
        district: 'Satara',
        families: 7,
        population: 38,
    },
    {
        label: 'Wai',
        value: '5',
        taluka: 'Wai',
        district: 'Satara',
        families: 4,
        population: 17,
    },
    {
        label: 'Khandala',
        value: '6',
        taluka: 'Khandala',
        district: 'Satara',
        families: 4,
        population: 35,
    },
    {
        label: 'Patan',
        value: '7',
        taluka: 'Patan',
        district: 'Satara',
        families: 1,
        population: 9,
    },
    {
        label: 'Janugdewadi',
        value: '8',
        taluka: 'Patan',
        district: 'Satara',
        families: 1,
        population: 4,
    },
    {
        label: 'Virali',
        value: '9',
        taluka: 'Maan',
        district: 'Satara',
        families: 10,
        population: 62,
    },
    {
        label: 'Kulakjai',
        value: '10',
        taluka: 'Maan',
        district: 'Satara',
        families: 12,
        population: 64,
    },
    {
        label: 'Mahimangad',
        value: '11',
        taluka: 'Maan',
        district: 'Satara',
        families: 14,
        population: 73,
    },
    {
        label: 'Diwadi',
        value: '12',
        taluka: 'Maan',
        district: 'Satara',
        families: 2,
        population: 14,
    },
    {
        label: 'Pandharwadi',
        value: '13',
        taluka: 'Maan',
        district: 'Satara',
        families: 10,
        population: 62,
    },
    {
        label: 'Koregaon',
        value: '14',
        taluka: 'Koregaon',
        district: 'Satara',
        families: 25,
        population: 153,
    },
    {
        label: 'Chimangaon',
        value: '15',
        taluka: 'Koregaon',
        district: 'Satara',
        families: 4,
        population: 14,
    },
    {
        label: 'Satara Road',
        value: '16',
        taluka: 'Koregaon',
        district: 'Satara',
        families: 6,
        population: 24,
    },
    {
        label: 'Bhadale',
        value: '17',
        taluka: 'Koregaon',
        district: 'Satara',
        families: 8,
        population: 52,
    },
    {
        label: 'Velu',
        value: '18',
        taluka: 'Koregaon',
        district: 'Satara',
        families: 11,
        population: 54,
    },
    {
        label: 'Saap',
        value: '19',
        taluka: 'Koregaon',
        district: 'Satara',
        families: 4,
        population: 30,
    },
    {
        label: 'Peth Kinhai',
        value: '20',
        taluka: 'Koregaon',
        district: 'Satara',
        families: 4,
        population: 12,
    },
    {
        label: 'Pimpode Budruk',
        value: '21',
        taluka: 'Koregaon',
        district: 'Satara',
        families: 2,
        population: 12,
    },
    {
        label: 'Circlewadi',
        value: '22',
        taluka: 'Koregaon',
        district: 'Satara',
        families: 1,
        population: 8,
    },
    {
        label: 'Bodhewadi',
        value: '23',
        taluka: 'Koregaon',
        district: 'Satara',
        families: 1,
        population: 1,
    },
    {
        label: 'Borjaiwadi',
        value: '24',
        taluka: 'Koregaon',
        district: 'Satara',
        families: 1,
        population: 6,
    },
    {
        label: 'Khatav',
        value: '25',
        taluka: 'Khatav',
        district: 'Satara',
        families: 19,
        population: 105,
    },
    {
        label: 'Vardhangad',
        value: '26',
        taluka: 'Khatav',
        district: 'Satara',
        families: 47,
        population: 258,
    },
    {
        label: 'Pusegaon',
        value: '27',
        taluka: 'Khatav',
        district: 'Satara',
        families: 5,
        population: 32,
    },
    {
        label: 'Ner',
        value: '28',
        taluka: 'Khatav',
        district: 'Satara',
        families: 4,
        population: 34,
    },
    {
        label: 'Daruj',
        value: '29',
        taluka: 'Khatav',
        district: 'Satara',
        families: 5,
        population: 41,
    },
    {
        label: 'Pedgaon',
        value: '30',
        taluka: 'Khatav',
        district: 'Satara',
        families: 2,
        population: 19,
    },
    {
        label: 'Bhurkavdi',
        value: '31',
        taluka: 'Khatav',
        district: 'Satara',
        families: 1,
        population: 2,
    },
    {
        label: 'Wakeshwar',
        value: '32',
        taluka: 'Khatav',
        district: 'Satara',
        families: 1,
        population: 10,
    },
    {
        label: 'Waduj',
        value: '33',
        taluka: 'Khatav',
        district: 'Satara',
        families: 7,
        population: 50,
    },
    {
        label: 'Gursale',
        value: '34',
        taluka: 'Khatav',
        district: 'Satara',
        families: 13,
        population: 96,
    },
    {
        label: 'Wadgaon J.Swami',
        value: '35',
        taluka: 'Khatav',
        district: 'Satara',
        families: 5,
        population: 35,
    },
    {
        label: 'Aundh',
        value: '36',
        taluka: 'Khatav',
        district: 'Satara',
        families: 2,
        population: 16,
    },
    {
        label: 'Kaledhon',
        value: '37',
        taluka: 'Khatav',
        district: 'Satara',
        families: 19,
        population: 125,
    },
    {
        label: 'Budh',
        value: '38',
        taluka: 'Khatav',
        district: 'Satara',
        families: 1,
        population: 3,
    },
    {
        label: 'Jakhangaon',
        value: '39',
        taluka: 'Khatav',
        district: 'Satara',
        families: 1,
        population: 17,
    },
    {
        label: 'Kalambi',
        value: '40',
        taluka: 'Khatav',
        district: 'Satara',
        families: 2,
        population: 15,
    },
    {
        label: 'Mayani',
        value: '41',
        taluka: 'Khatav',
        district: 'Satara',
        families: 5,
        population: 20,
    },
    {
        label: 'Karad',
        value: '42',
        taluka: 'Karad',
        district: 'Satara',
        families: 61,
        population: 351,
    },
    {
        label: 'Malkapur',
        value: '43',
        taluka: 'Karad',
        district: 'Satara',
        families: 37,
        population: 162,
    },
    {
        label: 'Wathar',
        value: '44',
        taluka: 'Karad',
        district: 'Satara',
        families: 11,
        population: 41,
    },
    {
        label: 'Kalwade',
        value: '45',
        taluka: 'Karad',
        district: 'Satara',
        families: 1,
        population: 7,
    },
    {
        label: 'Kaletake',
        value: '46',
        taluka: 'Karad',
        district: 'Satara',
        families: 1,
        population: 5,
    },
    {
        label: 'Rethare Budruk',
        value: '47',
        taluka: 'Karad',
        district: 'Satara',
        families: 23,
        population: 118,
    },
    {
        label: 'Shivnagar',
        value: '48',
        taluka: 'Karad',
        district: 'Satara',
        families: 7,
        population: 34,
    },
    {
        label: 'Julewadi',
        value: '49',
        taluka: 'Karad',
        district: 'Satara',
        families: 5,
        population: 26,
    },
    {
        label: 'Gondi',
        value: '50',
        taluka: 'Karad',
        district: 'Satara',
        families: 6,
        population: 35,
    },
    {
        label: 'Shenoli Station',
        value: '51',
        taluka: 'Karad',
        district: 'Satara',
        families: 18,
        population: 139,
    },
    {
        label: 'Shenoli',
        value: '52',
        taluka: 'Karad',
        district: 'Satara',
        families: 19,
        population: 109,
    },
    {
        label: 'Wadgaon Haveli',
        value: '53',
        taluka: 'Karad',
        district: 'Satara',
        families: 20,
        population: 114,
    },
    {
        label: 'Kodoli',
        value: '54',
        taluka: 'Karad',
        district: 'Satara',
        families: 5,
        population: 38,
    },
    {
        label: 'Karve',
        value: '55',
        taluka: 'Karad',
        district: 'Satara',
        families: 10,
        population: 56,
    },
    {
        label: 'Goleshwar',
        value: '56',
        taluka: 'Karad',
        district: 'Satara',
        families: 14,
        population: 63,
    },
    {
        label: 'Kese Padli',
        value: '57',
        taluka: 'Karad',
        district: 'Satara',
        families: 10,
        population: 64,
    },
    {
        label: 'Munde',
        value: '58',
        taluka: 'Karad',
        district: 'Satara', families: 10,
        population: 45,
    },
    {
        label: 'Banwadi',
        value: '59',
        taluka: 'Karad',
        district: 'Satara',
        families: 6,
        population: 21,
    },
    {
        label: 'Ogalewadi',
        value: '60',
        taluka: 'Karad',
        district: 'Satara',
        families: 4,
        population: 25,
    },
    {
        label: 'Umbraj',
        value: '61',
        taluka: 'Karad',
        district: 'Satara',
        families: 7,
        population: 33,
    },
    {
        label: 'Masur',
        value: '62',
        taluka: 'Karad',
        district: 'Satara',
        families: 2,
        population: 10,
    },
    {
        label: 'Kambirwadi - Masur',
        value: '63',
        taluka: 'Karad',
        district: 'Satara',
        families: 3,
        population: 10,
    },
    {
        label: 'Surali',
        value: '64',
        taluka: 'Karad',
        district: 'Satara',
        families: 12,
        population: 59,
    },
];

const Membersv2 = () => {
    const [districtData, setDistrictData] = useState([]);
    const [talukaData, setTalukaData] = useState([]);
    const [villageData, setVillageData] = useState([]);
    const [district, setDistrict] = useState(null);
    const [taluka, setTaluka] = useState(null);
    const [village, setVillage] = useState(null);
    const [villageSelected, setVillageSelected] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [families, setFamilies] = useState(0);
    const [population, setPopulation] = useState(0);

    useEffect(() => {
        console.log('inside usereffect ..');
        setDistrictData(districts);
    }, []);

    onDistrictChange = value => {
        console.log('district changed ..:' + value);

        let filterTalukas = talukas.filter(taluka => {
            //console.log(taluka.district + ' > ' + taluka.label);
            return taluka.district === value;
        });

        if (filterTalukas?.length > 0) {
            console.log('Talukas: ' + filterTalukas.length);
            setTalukaData(filterTalukas);
            console.log('Taluka Selected: ' + filterTalukas[0].label);
            setTaluka(filterTalukas[0].value);
            onTalukaChange(filterTalukas[0].label);
        } else {
            this.clearData();
        }
    };

    onTalukaChange = value => {
        console.log('taluka changed ..:' + value);

        let filterVillages = villages.filter(village => {
            //console.log(village.taluka + ' > ' + village.label);
            return village.taluka === value;
        });

        if (filterVillages?.length > 0) {
            console.log('Villages: ' + filterVillages.length);
            setVillageData(filterVillages);
            console.log('Village Selected: ' + filterVillages[0].label);
            setVillage(filterVillages[0].value);
            setVillageSelected(filterVillages[0]);
            setFamilies(filterVillages[0].families);
            setPopulation(filterVillages[0].population);
        } else {
            setVillageData([]);
            setVillage(null);
            setVillageSelected(null);
            setFamilies(0);
            setPopulation(0);
        }
    };

    onVillageChange = value => {
        console.log('village changed ..:' + value);
        let filterVillages = villages.filter(village => {
            //console.log(village.taluka + ' > ' + village.label);
            return village.label === value;
        });

        console.log(
            'Villages: ' +
            filterVillages.length +
            ', ' +
            filterVillages[0].families +
            ', ' +
            filterVillages[0].population,
        );
        setVillage(filterVillages[0].value);
        setVillageSelected(filterVillages[0]);
        setFamilies(filterVillages[0].families);
        setPopulation(filterVillages[0].population);
    };

    clearData = () => {
        setTalukaData([]);
        setTaluka(null);
        setVillageData([]);
        setVillage(null);
        setFamilies(0);
        setPopulation(0);
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerdrop}>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={districtData}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select District' : '...'}
                    searchPlaceholder="Search..."
                    value={district}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setDistrict(item.value);
                        onDistrictChange(item.label);
                        setIsFocus(false);
                    }}
                />
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={talukaData}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select Taluka' : '...'}
                    searchPlaceholder="Search..."
                    value={taluka}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setTaluka(item.value);
                        onTalukaChange(item.label);
                        setIsFocus(false);
                    }}
                />
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={villageData}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select Village' : '...'}
                    searchPlaceholder="Search..."
                    value={village}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setVillage(item.value);
                        onVillageChange(item.label);
                        setIsFocus(false);
                    }}
                />
            </View>
            <View style={styles.sectionMain}>
                <Text style={styles.sectionText}>
                    Families: {families ? families : 0}
                </Text>
                <Text style={styles.sectionText}>
                    Population: {population ? population : 0}
                </Text>
            </View>
        </View>
    );
};

export default Membersv2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    containerdrop: {
        padding: 20,
    },
    dropdown: {
        height: 50,
        width: 300,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 15,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    sectionMain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
        backgroundColor: 'white',
        borderRadius: 20,
    },
    section: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 5,
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
        paddingHorizontal: 8,
        paddingVertical: 1,
        textAlign: 'justify',
    },
});
