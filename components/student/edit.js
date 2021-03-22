import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

import { db, styles } from './common';

class EditStudentActivity extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            TextInput_Student_ID: '',
            TextInput_Student_Name: '',
            TextInput_Student_PhoneNumber: '',
            TextInput_Student_Email: '',
        }
    }

    componentDidMount() {

        // Received Student Details Sent From Previous Activity and Set Into State.
        this.setState({
            TextInput_Student_ID: this.props.navigation.state.params.id,
            TextInput_Student_Name: this.props.navigation.state.params.student_name,
            TextInput_Student_PhoneNumber: this.props.navigation.state.params.student_phone_number,
            TextInput_Student_Email: this.props.navigation.state.params.student_email,
        });
    }

    static navigationOptions =
        {
            title: 'EditStudentRecordActivity',
        };

    UpdateStudentRecord = () => {
        // let student_id = this.state.TextInput_Student_ID;
        // alert(student_id);
        // fetch('http://localhost:8000/student/update/' + student_id, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         student_name: this.state.TextInput_Student_Name,
        //         student_phone_number: this.state.TextInput_Student_PhoneNumber,
        //         student_email: this.state.TextInput_Student_Email
        //     })
        // }).then((response) => response.json())
        //     .then((responseJson) => {
        //         alert(responseJson);
        //     }).catch((error) => {
        //         console.error(error);
        //     });
        let obj = this;
        db.transaction(
            tx => {
                let stmt = "update students set student_name='" + obj.state.TextInput_Student_Name + "'";
                stmt += ",student_phone_number='" + obj.state.TextInput_Student_Name + "'";
                stmt += ",student_email='" + obj.state.TextInput_Student_Name + "'";
                tx.executeSql(
                    "update students set student_name=? student_phone_number=? student_email=?",
                    [
                        obj.state.TextInput_Student_Name,
                        obj.state.TextInput_Student_PhoneNumber,
                        obj.state.TextInput_Student_Email
                    ],
                    (tx1, results) => {
                        if (results.rowsAffected > 0) {
                            obj.props.navigation.navigate('ShowStudents');
                        }
                        else {
                            console.log('failed ', results);
                        }
                    },
                    (er) => {
                        console.log(212, 'failed due to ', er, ' in ', stmt);
                    }
                );
            }, null,
            (re2) => {
                //obj.props.navigation.navigate('ShowStudents');
            }
        );
    }

    DeleteStudentRecord = () => {
        // let student_id = this.state.TextInput_Student_ID;
        // alert(student_id);
        // fetch('http://localhost:8000/student/delete/' + student_id, {
        //     method: 'GET',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     }
        // }).then((response) => response.json())
        //     .then((responseJson) => {
        //         // Showing response message coming from server after inserting records.
        //         alert(responseJson);
        //     }).catch((error) => {
        //         console.error(error);
        //     });
        // this.props.navigation.navigate('First');
        let obj = this;
        let student_id = this.state.TextInput_Student_ID;
        console.log('id is ', student_id);
        db.transaction(
            tx => {
                tx.executeSql(
                    "delete from students where id=?",
                    [
                        student_id
                    ],
                    function (res) {
                        obj.props.navigation.navigate('ShowStudents');
                    }
                );
            }
        );
    }

    render() {
        let obj = this;
        return (
            <View style={styles.MainContainer}>
                <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 7 }}> Edit Student Record Form </Text>
                <TextInput
                    placeholder="Student Name Shows Here"
                    value={this.state.TextInput_Student_Name}
                    onChangeText={TextInputValue => this.setState({ TextInput_Student_Name: TextInputValue })}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />
                <TextInput
                    placeholder="Student Phone Number Shows Here"
                    value={this.state.TextInput_Student_PhoneNumber}
                    onChangeText={TextInputValue => this.setState({ TextInput_Student_PhoneNumber: TextInputValue })}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />
                <TextInput
                    placeholder="Student Email Shows Here"
                    value={this.state.TextInput_Student_Email}
                    onChangeText={TextInputValue => this.setState({ TextInput_Student_Email: TextInputValue })}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />
                <TouchableOpacity activeOpacity={0.4} style={styles.TouchableOpacityStyle} onPress={this.UpdateStudentRecord} >
                    <Text style={styles.TextStyle}> UPDATE STUDENT RECORD </Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.4} style={styles.TouchableOpacityStyle} onPress={this.DeleteStudentRecord} >
                    <Text style={styles.TextStyle}> DELETE CURENT RECORD </Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.4} style={styles.TouchableOpacityStyle} onPress={
                    function () {
                        obj.props.navigation.navigate('ShowStudents')
                    }
                } >
                    <Text style={styles.TextStyle}> Back To List </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default EditStudentActivity;