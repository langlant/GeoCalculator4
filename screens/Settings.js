import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Keyboard, View } from "react-native";
import { Input, Button } from "react-native-elements";
import Padder from "../components/Padder";
import { Dropdown } from "react-native-material-dropdown";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from '@expo/vector-icons';

const Settings = ({ navigation, route }) => {

    const [distPick, setDistPick] = useState('Kilometers');
    const [bearingPick, setBearingPick] = useState('Degrees');
    const dUnits = ['Kilometers', 'Miles'];
    const bUnits = ['Degrees', 'Mils'];

    navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate(
            'CalculatorScreen', {distPick, bearingPick})}>
            <Feather style={{ marginRight: 10 }} name="save" size={24} />
          </TouchableOpacity>
        ),
        headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate(
                'CalculatorScreen')}>
                    <Feather style={{ marginLeft: 10}} name="trash" size={24}/>
                </TouchableOpacity>
            )}
        )

      });

    return(
        <Padder>
            <Dropdown
            label = 'Distance Type'
            value = {distPick}
            data = {dUnits}
            onChangeText = {(text) => setDistPick(text)}

            />
            <Dropdown
            label = 'Navigational Type'
            value = {bearingPick}
            data = {bUnits}
            onChangeText = {(text) => setBearingPick(text)}

            /> 
      </Padder>
    );
}

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        backgroundColor: "#0098c7",
        color: 'white',
        fontSize: 25
    },
});

export default Settings;
