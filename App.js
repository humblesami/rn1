import React from 'react';
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import StudentActivityNavigator from './components/student/index';


const tabs = createBottomTabNavigator();

const AppNavigator = createSwitchNavigator({
    AnyName32: StudentActivityNavigator,
});

const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}
