import React from 'react';
import { FlatList, Text, View, TouchableOpacity, ActivityIndicator, Button } from 'react-native';

import { db, styles } from '../common';


const Item = ({ title, phone, email }) => (
    <View style={styles.list_item}>
        <Text>{title}</Text>
        <Text>{phone}</Text>
        <Text>{email}</Text>
    </View>
);

const renderMyItem = (item, obj) => {
    return (
        <TouchableOpacity>
            <Item title={item.student_name} phone={item.student_phone_number} email={item.student_email} />
                <Button title="Click" onPress={() => {
                    let params = { callback: obj.on_student_updated.bind(obj), student: item }
                    obj.props.navigation.navigate('EditStudent', params);
                }}></Button>
        </TouchableOpacity>
    )
};


class ShowStudentActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student_list: [],
            isLoading: true
        }
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
        // console.log(obj.state.student_list, 'Students being Shown');
        return (
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.4} style={styles.TouchableOpacityStyle} onPress={this.GoTo_Add_Student_Activity_Function} >
                    <Text style={styles.TextStyle}> Add An Other STUDENT </Text>
                </TouchableOpacity>
                <FlatList
                    data={obj.state.student_list}
                    renderItem={({ item }) => {
                        item.method_before_exit = obj.on_student_update;
                        return renderMyItem(item, obj);
                    }}
                    keyExtractor={(item, index) => ""+index}
                />
            </View>
        );
    }
    
    component_loaded(load_type){
        let obj = this;
        console.log('Student shown with load type', load_type);
        db.transaction(tx => {
            tx.executeSql(
                "create table if not exists students (id integer primary key not null, student_name text, student_phone_number text, student_email text);"
            );
        });
        obj.load_students_list();
    }

    load_students_list(){
        let obj = this;
        console.log('Loading students');
        db.transaction(
            tx => {
                tx.executeSql("select * from students", [], (tx1, res) => {                    
                    
                    let my_list = [];
                    if(res.rows){
                        // console.log(res.rows);
                        if(res.rows._array)
                        {
                            my_list = res.rows._array;
                        }
                        // else
                        // {
                        //     if(res.rows.length){
                        //         for(let i in res.rows){
                        //             if(!isNaN(i))
                        //             {
                        //                 my_list.push(res.rows.item(i));
                        //             }
                        //         }
                        //     }
                        // }
                    }
                    obj.setState({
                        student_list: my_list,
                        isLoading: false,
                    });
                });
            }
        );
    }

    on_student_updated(from_where) {
        console.log('On student update Called', from_where);
        this.load_students_list();
    }

    componentDidUpdate(){
        // console.log('updating');
        //this.component_loaded('updated');
    }

    componentDidMount() {
        this.component_loaded('init');
        //this.async_load()
    }

    async_load(){
        (async () => {
            //await AsyncStorage.removeItem('students/list');
            let item_list = await AsyncStorage.getItem('students/list');
            if (!item_list) {
                item_list = '[]';
            }
            student_list = JSON.parse(item_list);

            obj.setState({
                isLoading: false,
                dataSource: student_list,
            }, function () {
                // In this block you can do something with new state.
            });
        })().catch(err => {
            console.error(err);
        });
        return fetch('http://localhost:8000/students/list/')
            .then((response) => {
                response.json().then((responseJson) => {
                    if (responseJson && responseJson.data) {
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
                }).catch((error) => {
                    console.error(error);
                });
            }).catch((error) => {
                console.error(error);
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

    GoTo_Add_Student_Activity_Function = () => {
        let obj = this;
        let params = { callback: obj.on_student_updated.bind(obj) }
        obj.props.navigation.navigate('AddStudent', params);        
    }    
}

export default ShowStudentActivity;