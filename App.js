import React from 'react';
import { Text, View,  } from 'react-native';
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';


import student from './components/student';
import BoardScreen from './components/board/BoardScreen';
// import BoardDetailScreen from './components/board/BoardDetailScreen';
// import AddBoardScreen from './components/board/AddBoardScreen';
// import EditBoardScreen from './components/board/EditBoardScreen';


class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
            </View>
        );
    }
}

const BoardNavigator = createStackNavigator({
    // MainActivity: student.MainActivity,
    // BoardDetails: BoardDetailScreen,
    // AddBoard: AddBoardScreen,
    // EditBoard: EditBoardScreen,
    // MainActivity: MainActivity,
    // ShowStudentListActivity: ShowStudentListActivity,
    // EditStudentRecordActivity: EditStudentRecordActivity
    First: student.MainActivity,
    Second: student.ShowStudentListActivity,
    Third: student.EditStudentRecordActivity

});

const AppNavigator = createSwitchNavigator({
    Board: BoardNavigator,
    Home: HomeScreen,
});

const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}


