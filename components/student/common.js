import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, StyleSheet, Platform, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("student_activity.db");

var student_list = [];
const Item = ({ title, phone, email }) => (
    <View style={styles.list_item}>
        <Text>{title}</Text>
        <Text>{phone}</Text>
        <Text>{email}</Text>
    </View>
);

const renderMyItem = (item, obj) => {    
    // console.log(item);
    return (
        <TouchableOpacity>            
            <Item title={item.student_name} phone={item.student_phone_number} email={item.student_email} />
                <button onClick={() => {
                    let params = { callback: obj.callback.bind(obj), student: item }
                    obj.props.navigation.navigate('EditStudent', params);
                }}>Click</button>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    list_item: {
        padding: 5,
        margin: 5,
    },
    MainContainer: {
        alignItems: 'center',
        flex: 1,
        paddingTop: 30,
        backgroundColor: '#fff'
    },
    MainContainer_For_Show_StudentList_Activity: {
        flex: 1,
        paddingTop: (Platform.OS == 'ios') ? 20 : 0,
        marginLeft: 5,
        marginRight: 5
    },
    TextInputStyleClass: {
        textAlign: 'center',
        width: '90%',
        marginBottom: 7,
        height: 40,
        borderWidth: 1,
        borderColor: '#FF5722',
        borderRadius: 5,
    },
    TouchableOpacityStyle: {
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        marginBottom: 7,
        width: '90%',
        backgroundColor: '#00BCD4'
    },
    TextStyle: {
        color: '#fff',
        textAlign: 'center',
    },

    rowViewContainer: {
        fontSize: 20,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
    }
});

export {
    db,
    styles,
    renderMyItem,
    student_list
}
