import React from 'react';
import { StyleSheet, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import CalculatorScreen from './screens/CalculatorScreen';
import Settings from './screens/Settings';
import HistoryScreen from './screens/HistoryScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default function App() {
  
  const Stack = createStackNavigator();

  return(
    <NavigationContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Stack.Navigator>
        <Stack.Screen name = "Geo Calculator" component = {CalculatorScreen} />
        <Stack.Screen name = "Settings" component = {Settings} />
        <Stack.Screen name = "History" component = {HistoryScreen}/>
      </Stack.Navigator>
    
    </TouchableWithoutFeedback>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    margin: 20,
    flex: 1
  },
});
