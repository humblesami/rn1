import React from 'react';
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import StudentActivityNavigator from './components/student/index';
import TeacherActivityNavigator from './components/teacher/index';


const tabs = createBottomTabNavigator();

const AppNavigator = createSwitchNavigator({
    AnyName32: StudentActivityNavigator,
    OtherName: TeacherActivityNavigator,
});

const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}
