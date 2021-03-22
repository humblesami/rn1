import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

import {db, styles } from './common';

class AddStudentActivity extends React.Component {
    static navigationOptions =
        {
            title: 'AddActivity',
        };

    constructor(props) {
        super(props)

        this.state = {
            TextInput_Student_Name: '',
            TextInput_Student_PhoneNumber: '',
            TextInput_Student_Email: '',
        }
    }


    InsertStudentRecordsToServer = () => {
        let obj = this;
        let form_data = {};
        form_data.student_name = this.state.TextInput_Student_Name;
        form_data.student_phone_number = this.state.TextInput_Student_PhoneNumber;
        form_data.student_email = this.state.TextInput_Student_Email;

        let errors = [];
        for (let key in form_data) {
            if (!form_data[key]) {
                errors.push(key + ' is required');
            }
        }
        if (errors.length) {
            errors = errors.join(',');
            alert(errors);
            return;
        }

        db.transaction(
            tx => {
                tx.executeSql(
                    "insert into students (student_name, student_phone_number,student_email) values (?, ?, ?)",
                    [
                        form_data.student_name,
                        form_data.student_phone_number,
                        form_data.student_email
                    ]
                )
            }, null, ()=>{
                obj.props.navigation.navigate('ShowStudents');
            }
        );

        // (async () => {
        //     await AsyncStorage.setItem(
        //         'students/list',
        //         JSON.stringify(student_list)
        //     );
        //     obj.GoTo_Show_StudentListActivity_Function();
        // })().catch(function (er) {

        // })

        // let url = 'http://localhost:8000/student/new/';
        // headers: {
        //     'Content-Type': 'multipart/form-data;',
        // },
        // fetch(url, {
        //     method: 'POST',
        //     body: upload_data
        // }).then(function (res) {
        //     res.json().then(function (responseJson) {
        //         if (responseJson.status == 'success') {
        //             console.log('Uploaded');
        //             obj.GoTo_Show_StudentListActivity_Function();
        //         }
        //     }).catch((er)=>{
        //         console.log(er);
        //     });
        // }).catch((er)=>{
        //     console.log(er);
        // });
    }

    GoTo_Show_StudentListActivity_Function = () => {
        this.props.navigation.navigate('ShowStudents');
    }


    render() {
        return (
            <View style={styles.MainContainer}>
                <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 7 }}>Student Registration Form 0</Text>
                <TextInput
                    placeholder="Enter Student Name"
                    onChangeText={TextInputValue => this.setState({ TextInput_Student_Name: TextInputValue })}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />
                <TextInput
                    placeholder="Enter Student Phone Number"
                    onChangeText={TextInputValue => this.setState({ TextInput_Student_PhoneNumber: TextInputValue })}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />
                <TextInput
                    placeholder="Enter Student Email"
                    onChangeText={TextInputValue => this.setState({ TextInput_Student_Email: TextInputValue })}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />
                <TouchableOpacity activeOpacity={0.4} style={styles.TouchableOpacityStyle} onPress={this.InsertStudentRecordsToServer} >
                    <Text style={styles.TextStyle}> INSERT STUDENT RECORD TO SERVER </Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.4} style={styles.TouchableOpacityStyle} onPress={this.GoTo_Show_StudentListActivity_Function} >
                    <Text style={styles.TextStyle}> SHOW ALL INSERTED STUDENT RECORDS IN LIST </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default AddStudentActivity;