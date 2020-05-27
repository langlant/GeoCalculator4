import React, { useState } from "react";
import { StyleSheet, Text, Keyboard } from "react-native";
import { Button, Input, Card } from "react-native-elements";
import Padder from "../components/Padder";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from '@expo/vector-icons';


const CalculatorScreen = ({ navigation }) => {
  const [state, setState] = useState({
    lat1: "",
    lon1: "",
    lat2: "",
    lon2: "",
    distance: "",
    bearing: "",
  });
  const [distPick, setDistPick] = useState('');
  const [bearingPick, setBearingPick] = useState('');

  // Converts from degrees to radians.
  function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  // Converts from radians to degrees.
  function toDegrees(radians) {
    return (radians * 180) / Math.PI;
  }

  // Computes distance between two geo coordinates in kilometers.
  function computeDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // km (change this constant to get miles)
    var dLat = ((lat2 - lat1) * Math.PI) / 180;
    var dLon = ((lon2 - lon1) * Math.PI) / 180;
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    if(distPick == 'Miles'){
      d = d * 0.621371;
      return  `${round(d, 3)} miles`;
    } else{
    return `${round(d, 3)} km`;
    }
  }

  // Computes bearing between two geocoordinates in degrees. 
  function computeBearing(startLat, startLng, destLat, destLng) {
    startLat = toRadians(startLat);
    startLng = toRadians(startLng);
    destLat = toRadians(destLat);
    destLng = toRadians(destLng);

    var y = Math.sin(destLng - startLng) * Math.cos(destLat);
    var x =
      Math.cos(startLat) * Math.sin(destLat) -
      Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
    var brng = Math.atan2(y, x);
    brng = toDegrees(brng);
    if(bearingPick == 'Mils'){
      return (brng * 17.777777777778);
    } else{
    return (brng + 360) % 360;
    }
  }

  function round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  }

  function validate(value) {
    return (isNaN(value) ? "Must be a number" : "");
  }

  function formValid(vals) {
    if (isNaN(vals.lat1) || isNaN(vals.lon1) || isNaN(vals.lat2) || isNaN(vals.lon2)) {
      return false;
    } else if (vals.lat1 === '' || vals.lon1 === '' || vals.lat2==='' || vals.lon2==='') {
      return false;
    } else {
      return true;
    }
  }

  const updateStateObject = (vals) => {
    setState({
      ...state,
      ...vals,
    });
  };

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate(
        'Settings', {distPick, bearingPick})}>
        <Feather style={{ marginRight: 10 }} name="edit" size={24} />
      </TouchableOpacity>
    ),
  });
  return (

    <Padder>
      <Padder>
        <Text style={styles.header}> Geo Calculator</Text>
      </Padder>
      <Input
        placeholder="Enter latitude for point 1"
        value={state.lat1}
        autoCorrect={false}
        errorStyle={styles.input}
        errorMessage={validate(state.lat1)}
        onChangeText={(val) =>
          updateStateObject({ lat1: val})
        }
      />
      <Input
        placeholder="Enter longitude for point 1"
        value={state.lon1}
        autoCorrect={false}
        errorStyle={styles.input}
        errorMessage={validate(state.lon1)}
        onChangeText={(val) =>
          updateStateObject({ lon1: val })
        }
      />
      <Input
        placeholder="Enter latitude for point 2"
        value={state.lat2}
        autoCorrect={false}
        errorStyle={styles.input}
        errorMessage={validate(state.lat2)}
        onChangeText={(val) =>
          updateStateObject({ lat2: val })
        }
      />
      <Input
        placeholder="Enter longitude for point 2"
        value={state.lon2}
        autoCorrect={false}
        errorStyle={styles.input}
        errorMessage={validate(state.lon2)}
        onChangeText={(val) =>
          updateStateObject({ lon2: val })
        }
      />
      <Padder>
        <Button
          style={styles.buttons}
          title="Calculate"
          onPress={() => {
            if (formValid(state)) {
              var p1 = {
                lat: parseFloat(state.lat1),
                lon: parseFloat(state.lon1),
              };
              var p2 = {
                lat: parseFloat(state.lat2),
                lon: parseFloat(state.lon2),
              };

              var dist = computeDistance(p1.lat, p1.lon, p2.lat, p2.lon);
              var bear = computeBearing(p1.lat, p1.lon, p2.lat, p2.lon);
              updateStateObject({
                distance: `Distance: ${dist}`,
                bearing: `Bearing: ${round(bear, 3)} degrees`,
              });
          }
        }}
        />
      </Padder>
      <Padder>
        <Button
          style={styles.buttons}
          title="Clear"
          onPress={() => {
            Keyboard.dismiss();
            setState({
              lat1: "",
              lon1: "",
              lat2: "",
              lon2: "",
              distance: "",
              bearing: "",
            });
          }}
        />
      </Padder>
      <Text style={styles.output}>{state.distance}</Text>
      <Text style={styles.output}>{state.bearing}</Text>
    </Padder>
  );
};

const styles = StyleSheet.create({
  buttons: {
    margin: 10,
  },
  input: {
    color: 'red'
  },
  header: {
    textAlign: 'center',
    backgroundColor: "#0098c7",
    color: 'white',
    fontSize: 25,
    textAlign: 'center'
  },
  output: {
    borderWidth: 1,
    borderColor: 'black'
  }
});

export default CalculatorScreen;
