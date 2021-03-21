import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, StyleSheet, Platform, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");

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

var student_list = [];
const Item = ({ title, phone, email }) => (
    <View style={styles.list_item}>
        <Text>{title}</Text>
        <Text>{phone}</Text>
        <Text>{email}</Text>
    </View>
);
const renderMyItem = (item, obj) => {
    
    console.log(item);
    return (
        <TouchableOpacity>            
            <Item title={item.student_name} phone={item.student_phone_number} email={item.student_email} />
                <button onClick={() => obj.props.navigation.navigate('EditStudent', item)}>Click</button>
        </TouchableOpacity>
    )
};

class MainActivity extends React.Component {
    static navigationOptions =
        {
            title: 'MainActivity',
        };

    constructor(props) {
        super(props)

        this.state = {
            TextInput_Student_Name: '',
            TextInput_Student_PhoneNumber: '',
            TextInput_Student_Email: '',
        }
    }

    componentDidMount() {
        let obj = this;
        db.transaction(tx => {
            tx.executeSql(
                "create table if not exists students (id integer primary key not null, student_name text, student_phone_number text, student_email text);"
            );
        });
    }


    InsertStudentRecordsToServer = () => {
        let obj = this;
        let form_data = {};
        form_data.student_name = this.state.TextInput_Student_Name;
        form_data.student_phone_number = this.state.TextInput_Student_PhoneNumber;
        form_data.student_email = this.state.TextInput_Student_Email;

        let student_id = 1;
        if (student_list.length) {
            student_id = student_list[student_list.length - 1].id + 1;
        }
        form_data.id = "" + student_id;

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

        student_list.push(form_data);

        db.transaction(
            tx => {
                tx.executeSql(
                    "insert into students (student_name, student_phone_number,student_email) values (?, ?, ?)",
                    [
                        form_data.student_name,
                        form_data.student_phone_number,
                        form_data.student_email
                    ], function(res){
                        obj.props.navigation.navigate('ShowStudents');
                    }
                );                
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

class ShowStudentListActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    static navigationOptions =
        {
            title: 'ShowStudentListActivity',
        };

    componentDidMount() {
        let obj = this;
        db.transaction(tx => {
            tx.executeSql(
                "create table if not exists students (id integer primary key not null, student_name text, student_phone_number text, student_email text);"
            );
        });

        db.transaction(
            tx => {
                tx.executeSql("select * from students", [], (_, { rows }) => {
                    rows = JSON.stringify(rows);
                    rows = JSON.parse(rows);
                    let my_list = [];
                    for (let i in rows) {
                        my_list.push(rows[i]);
                    }
                    student_list = my_list;
                    obj.setState({
                        isLoading: false,
                    });
                }

                );
            }
        );

        // (async () => {
        //     //await AsyncStorage.removeItem('students/list');
        //     let item_list = await AsyncStorage.getItem('students/list');
        //     if (!item_list) {
        //         item_list = '[]';
        //     }
        //     student_list = JSON.parse(item_list);

        //     // obj.setState({
        //     //     isLoading: false,
        //     //     dataSource: student_list,
        //     // }, function () {
        //     //     // In this block you can do something with new state.
        //     // });
        // })().catch(err => {
        //     console.error(err);
        // });
        // return fetch('http://localhost:8000/students/list/')
        //     .then((response) => {
        //         response.json().then((responseJson) => {
        //             if (responseJson && responseJson.data) {
        //                 responseJson = responseJson.data;
        //             }
        //             student_list = responseJson;
        //             console.log(student_list, 888);
        //             this.setState({
        //                 isLoading: false,
        //                 dataSource: student_list,
        //             }, function () {
        //                 // In this block you can do something with new state.
        //             });
        //         }).catch((error) => {
        //             console.error(error);
        //         });
        //     }).catch((error) => {
        //         console.error(error);
        //     });
    }
    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: 0.5,
                    width: "100%",
                    backgroundColor: "#000",
                }} />
        );
    }

    GoTo_Add_Student_Activity_Function = () => {
        this.props.navigation.navigate('AddStudent');
    }

    render() {
        let obj = this;
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }} >
                    <ActivityIndicator />
                </View>
            );
        }
        console.log(student_list, 112);
        return (
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.4} style={styles.TouchableOpacityStyle} onPress={this.GoTo_Add_Student_Activity_Function} >
                    <Text style={styles.TextStyle}> Add STUDENT RECORD IN LIST </Text>
                </TouchableOpacity>
                <FlatList
                    data={student_list}
                    renderItem={({ item }) => {
                            return renderMyItem(item, obj);
                        }
                    }
                    
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        );
    }
}

class EditStudentRecordActivity extends React.Component {

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
        })
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
                tx.executeSql(
                    "update students set student_name=? student_phone_number=? student_email=?",
                    [
                        obj.state.TextInput_Student_Name,
                        obj.state.TextInput_Student_PhoneNumber,
                        obj.state.TextInput_Student_Email
                    ],
                    function(res){
                        obj.props.navigation.navigate('ShowStudents');
                    }
                );
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
                    function(res){
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
                    function(){
                        obj.props.navigation.navigate('ShowStudents')
                    }
                    } >
                    <Text style={styles.TextStyle}> Back To List </Text>
                </TouchableOpacity>
            </View>
        );
    }

}

const student = {
    MainActivity: MainActivity,
    ShowStudentListActivity: ShowStudentListActivity,
    EditStudentRecordActivity: EditStudentRecordActivity
}

export default student;