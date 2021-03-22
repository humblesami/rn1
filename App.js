import React from 'react';
import { createSwitchNavigator, createAppContainer } from "react-navigation";


import StudentActivityNavigator from './components/student/index';


const AppNavigator = createSwitchNavigator({
    AnyName32: StudentActivityNavigator,
});

const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}
