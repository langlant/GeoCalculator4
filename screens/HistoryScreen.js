import React, { useState, useRef,   useEffect } from "react";
import { StyleSheet, Text, Keyboard, TouchableOpacity, View, TouchableWithoutFeedback, TouchableHighlight } from "react-native";
import { Button, Input} from "react-native-elements";
import {initGeoCalcDb, writeData, updateData, deleteData, setupDataListener} from '../helpers/fb-geocalculator';
import CalculatorScreen from './CalculatorScreen';
import { FlatList } from "react-native-gesture-handler";

const HistoryScreen = ({ route, navigation }) => {


    const { currentHistory } = route.params;

    const rHistory = ({item, index}) =>{
        return (
    
        <TouchableOpacity onPress={()=> buttonPress(item)}>
            <View>
                 <Text> Start: {item.p1.lat1}, {item.p1.lon1}</Text>
                 <Text> End: {item.p2.lat2}, {item.p2.lon2}</Text>
                 <Text>Time Stamp: {item.timestamp}</Text>
            </View>
            navigation.navigate('Geo Calculator', {p1.lat1, p1.lon1, p2.lat2, p2.lon2});
        </TouchableOpacity>
        
        );
    }

    return(
        <FlatList  
            keyExtractor={(item) => item.timestamp}
            data = {currentHistory}
            renderItem={rHistory}
            />
    );

}

export default HistoryScreen;