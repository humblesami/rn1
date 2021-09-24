import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

import { db, styles } from '../common';

class EditaStudentActivity extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            name: '',
            phone_number: '',
            email: '',
        }
    }

    componentDidMount() {
        let obj = this;
        // Received Student Details Sent From Previous Activity and Set Into State.        
        let params = this.props.navigation.state.params;
        let student = params.student;

        this.setState({
            id: student.id,
            name: student.student_name,
            phone_number: student.student_phone_number,
            email: student.student_email
        });
    }

    test_db_sql(){
        let obj = this;
        db.transaction(
            tx => {
                
                tx.executeSql(
                    "select * from students where id=?",
                    [
                        obj.state.id
                    ],
                    (tx1, results) => {
                        if(results.rows.length)
                        {
                            console.log('Row found is ', results.rows[0]);
                        }
                        else{
                            console.log('No rows')
                        }
                    },
                    (er) => {
                        console.log(212, 'failed feathing due to ', er);
                    }
                );
            }, null,
            (re2) => {
                // obj.props.navigation.navigate('ShowSudents');
            }
        );
    }

    static navigationOptions =
        {
            title: 'EditStudentRecordActivity',
        };

    UpdateStudentRecord = () => {
        // let student_id = this.state.id;
        // alert(student_id);
        // fetch('http://localhost:8000/student/update/' + student_id, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         student_name: this.state.name,
        //         student_phone_number: this.state.phone_number,
        //         student_email: this.state.email
        //     })
        // }).then((response) => response.json())
        //     .then((responseJson) => {
        //         alert(responseJson);
        //     }).catch((error) => {
        //         console.error(error);
        //     });
        let obj = this;
        //obj.test_db_sql();
        db.transaction(
            tx => {                
                tx.executeSql(
                    "update students set student_name=?, student_phone_number=?, student_email=? where id=?",
                    [
                        obj.state.name,
                        obj.state.phone_number,
                        obj.state.email,
                        obj.state.id
                    ],
                    (tx1, results) => null,
                    (er) => {
                        console.log(212, 'failed update due to ', er, ' in ', stmt);
                    }
                );
            }, null,
            (re2) => {
                obj.props.navigation.state.params.callback('from edit');
                obj.props.navigation.navigate('ShowSudents');
            }
        );
    }

    DeleteStudentRecord = () => {
        // let student_id = this.state.id;
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
        let student_id = this.state.id;
        console.log('id is ', student_id);
        db.transaction(
            tx => {
                tx.executeSql(
                    "delete from students where id=?",
                    [
                        student_id
                    ],(tx1, results) => null,
                    (er) => {
                        console.log(212, 'failed delete due to ', er, ' in ', stmt);
                    }
                );
            }, null,
            (re2) => {
                obj.props.navigation.state.params.callback('from delete');
                obj.props.navigation.navigate('ShowSudents');
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
                    value={this.state.name}
                    onChangeText={TextInputValue => this.setState({ name: TextInputValue })}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />
                <TextInput
                    placeholder="Student Phone Number Shows Here"
                    value={this.state.phone_number}
                    onChangeText={TextInputValue => this.setState({ phone_number: TextInputValue })}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyleClass}
                />
                <TextInput
                    placeholder="Student Email Shows Here"
                    value={this.state.email}
                    onChangeText={TextInputValue => this.setState({ email: TextInputValue })}
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
                        obj.props.navigation.navigate('ShowSudents')
                    }
                } >
                    <Text style={styles.TextStyle}> Back To List </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default EditaStudentActivity;