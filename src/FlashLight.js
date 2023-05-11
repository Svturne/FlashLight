import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Torch from 'react-native-torch';
import {Icon} from '@rneui/themed';

const FlashLight = () => {
  const [torchOnOff, setTorchOnOff] = useState(false);

  const handlePress = () => {
    Torch.switchState(!torchOnOff);
    setTorchOnOff(!torchOnOff);
  };

  function useBackGroundColor(torchOnOff) {
    const [bgColor, setBgColor] = useState('grey');

    useEffect(() => {
      if (torchOnOff === true) {
        setBgColor('yellow');
      } else {
        setBgColor('grey');
      }
    }, [torchOnOff]);

    return bgColor;
  }

  const bgColor = useBackGroundColor(torchOnOff);

  function sos() {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => Torch.switchState(true), i * 1000);
      setTimeout(() => Torch.switchState(false), (i + 0.5) * 1000);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.sosButtonContainer}>
        <TouchableOpacity onPress={sos}>
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.flashLight}>
          <TouchableOpacity
            onPress={handlePress}
            style={[styles.button, {backgroundColor: bgColor}]}>
            {torchOnOff ? (
              <Icon name="flashlight-off" type="material-community" size={80} />
            ) : (
              <Icon name="flashlight" type="material-community" size={80} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FlashLight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  sosButtonContainer: {
    alignItems: 'flex-end',
    padding: 16,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flashLight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 25,
  },
});
