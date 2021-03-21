import React from 'react';
import { Text, View,  } from 'react-native';
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';


import student from './components/student';


class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
            </View>
        );
    }
}

const StudentActivityNavigator = createStackNavigator({
    AddStudent: student.MainActivity,
    ShowStudents: student.ShowStudentListActivity,
    EditStudent: student.EditStudentRecordActivity
});

const AppNavigator = createSwitchNavigator({
    Board: StudentActivityNavigator,
    Home: HomeScreen,
});

const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}


