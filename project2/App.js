import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer, BaseRouter } from '@react-navigation/native';
import Home from './screens/Home';
import Details from './screens/Details'; 

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
    <HomeStack.Navigator>
      <HomeStack.Screen 
          name = 'Home'
          component = {Home}
          options = {{ title : 'Movie Browser', animationEnabled : false}}
      />
      <HomeStack.Screen 
          name = 'Details'
          component = {Details}
          options = {({route}) => ({ title : route.params.Title, animationEnabled: false,})}
      />
    </HomeStack.Navigator>
);


export default function App() {
  return (
    <NavigationContainer >
      <HomeStackScreen  />
    </NavigationContainer>
  );
}


