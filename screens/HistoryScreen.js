import React, { useState, useRef,   useEffect } from "react";
import { StyleSheet, Text, Keyboard, TouchableOpacity, View, TouchableWithoutFeedback, TouchableHighlight } from "react-native";
import { Button, Input} from "react-native-elements";
import {initGeoCalcDb, writeData, updateData, deleteData, setupDataListener} from '../helpers/fb-geocalculator';
import CalculatorScreen from './CalculatorScreen';
import { FlatList } from "react-native-gesture-handler";

const HistoryScreen = ({ route, navigation }) => {


    const { currentHistory } = route.params;

    const onPress = (lat1, lon1, lat2, lon2) => {
        navigation.navigate('Geo Calculator', {
            lat1, lon2, lat2, lon2
          });
      };

    const rHistory = ({item, index}) =>{
        return (
    
        <TouchableOpacity onPress={()=> buttonPress(item.lat1, item.lon1, item.lat2, item.lon2, item.timestamp)}>
            <View>
                 <Text> Start: {item.lat1}, {item.lon1}</Text>
                 <Text> End: {item.lat2}, {item.lon2}</Text>
                 <Text>Time Stamp: {item.timestamp}</Text>
            </View>
        </TouchableOpacity>
        );
    }

    return(
        <View style={styles.screen}>
            <View style={styles.container}>
            <FlatList  
                keyExtractor={(item) => item.timestamp}
                data = {currentHistory}
                renderItem={rHistory}
            />
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      padding: 4,
      paddingTop: 10,
      backgroundColor: "#E8EAF6",
    },
    container: {
      marginHorizontal: 4,
      marginVertical: 8,
      paddingHorizontal: 8,
    },
    headerButton: {
      color: '#fff',
      fontWeight: 'bold',
    },
  
  });

export default HistoryScreen;