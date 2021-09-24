import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { styles } from './components/style';

function HomeScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
  
  function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
  
  const Tab = createBottomTabNavigator();
  
  export default function App() {
    return (
      <NavigationContainer style={styles.container}>
        <Tab.Navigator style={styles.container}>
          <Tab.Screen name="Home" component={HomeScreen} style={styles.container} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }