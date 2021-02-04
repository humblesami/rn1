import React from 'react';

import { SafeAreaView, FlatList, StyleSheet, Platform, Text, View, Alert, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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

    InsertStudentRecordsToServer = () => {
        fetch('http://localhost:8000/student/new/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                student_name: this.state.TextInput_Student_Name,
                student_phone_number: this.state.TextInput_Student_PhoneNumber,
                student_email: this.state.TextInput_Student_Email
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                // Showing response message coming from server after inserting records.
                console.log(responseJson);
            }).catch((error) => {
                console.error(error);
            });
    }

    GoTo_Show_StudentListActivity_Function = () => {
        this.props.navigation.navigate('Second');
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

var student_list = [];
const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );
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
        return fetch('http://localhost:8000/students/list/')
            .then((response) => {
                response.json().then((responseJson) => {                                    
                    if(responseJson && responseJson.data)
                    {
                        responseJson = responseJson.data;
                    }
                    student_list = responseJson;
                    console.log(student_list, 888);
                    this.setState({
                        isLoading: false,
                        dataSource: student_list,
                    }, function () {
                        // In this block you can do something with new state.
                    });
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }
    GetStudentIDFunction = (id, student_name, student_phone_number, student_email) => {
        this.props.navigation.navigate('Third', {
            ID: id,
            NAME: student_name,
            PHONE_NUMBER: student_phone_number,
            EMAIL: student_email
        });
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

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }} >
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={student_list}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
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
            TextInput_Student_ID: this.props.navigation.state.params.ID,
            TextInput_Student_Name: this.props.navigation.state.params.NAME,
            TextInput_Student_PhoneNumber: this.props.navigation.state.params.PHONE_NUMBER,
            TextInput_Student_Email: this.props.navigation.state.params.EMAIL,
        })
    }

    static navigationOptions =
        {
            title: 'EditStudentRecordActivity',
        };

    UpdateStudentRecord = () => {
        let student_id = this.state.TextInput_Student_ID;
        alert(student_id);
        fetch('http://localhost:8000/student/update/'+student_id, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({                
                student_name: this.state.TextInput_Student_Name,
                student_phone_number: this.state.TextInput_Student_PhoneNumber,
                student_email: this.state.TextInput_Student_Email
            })
        }).then((response) => response.json())
            .then((responseJson) => {

                //Showing response message coming from server updating records.
                Alert.alert(responseJson);
            }).catch((error) => {
                console.error(error);
            });
    }

    DeleteStudentRecord = () => {
        let student_id = this.state.TextInput_Student_ID;
        alert(student_id);
        fetch('http://localhost:8000/student/delete/'+student_id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                // Showing response message coming from server after inserting records.
                Alert.alert(responseJson);
            }).catch((error) => {
                console.error(error);
            });
        this.props.navigation.navigate('First');
    }

    render() {

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