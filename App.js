import { StyleSheet, Text, View, Button, BackHandler } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import * as Device from 'expo-device';
import * as Print from 'expo-print';

const html = `
<html>
<div dir="auto" class="css-text-901oao" style="font-size: 33px;">Systeminformationen:<br><br>
Brand: samsung<br>
Gerätjahr-Klasse: 2016<br>
Prototyp-Name: c2s<br>
RAM insgesamt: 11.43015424 GB<br>

Unterstütze CPU-Architekturen: arm64-v8aarmeabi-v7aarmeabi<br>

Betriebssystem: Android 12 <br>
Android SDK: Version 31<br><br>

Gerättyp: <br>
0: Unbekannt <br>
1: Smartphone <br>
2: Tablet <br>
3: Desktop <br>
4: TV <br><br>

Typ: 1 <br><br>

Laufzeit: > 1600 Minuten <br>
Maximum-RAM-Benutzung von Java VM: 0.536870912 GB<br>
Jailbreak (Experimental): false <br>
Externe Apps-Installation: null <br>
Hat Hardware-Touchscreen: true</div>
</html>
`;

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Text style={{ fontSize: 35 }}>Nimble Tools</Text>
      <Text style={{ fontSize: 18 }}>Agile Quick-Tools zur Verfügung.{'\n'}</Text>
      <Text style={{ fontSize: 17 }}>Version 1.0.0{'\n'}</Text>

      <Button
        title={"Anleitung und\nInformationen"}
        onPress={() => navigation.navigate('Help')}
      />
      <Text>{'\n'}</Text>
      <Button
        title="Ursprung des Apps"
        onPress={() => navigation.navigate('Origin')}
      />
      <Text>{'\n'}</Text>
      <Button
        title="Beenden"
        onPress={() => BackHandler.exitApp()}
      />
    </View>
  );
}

function Help({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, textAlign: "left", margin: 35 }}>
        Die Systeminformationen geben Preis, über welche Eigenschaften Ihren Smartphone verfügt.{'\n'}{'\n'}
        Zum Ausprobieren der Statistiken werden bestimmte Hardwarekomponenten getestet, z.B. ob Ihre Handy über eine Fingerabdruck-Sensor verfügt.{'\n'}{'\n'}
        Als einer der wichtigsten Sensoren wurde der Standortdienst in das App integriert.{'\n'}{'\n'}
        Damit können Sie Ihre beliebte Standorte entdecken oder Ihre aktuelle Umgebung in Google-Maps auffinden.{'\n'}
      </Text>
      <Button title="Zurück zum Hauptmenü"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

function Origin({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 22, textAlign: "center", margin: 35 }}>
        Diese App wurde entwickelt, um einen Einblick ins React Native zu erhalten, dass als erweiterte JavaScript funktioniert.{'\n'}{'\n'}
        Es soll den Nutzer über Tools verfügen, die man als Schnellanwendungen benutzen kann, ohne auf komplexe Anweisungen gehen zu müssen.{'\n'}{'\n'}
        Damit man auch die Tools versteht, findet man eine Anleitung beim Hauptmenü.{'\n'}{'\n'}
        Viel Spass beim Ausprobieren!{'\n'}
      </Text>
      <Button title="Zurück zum Hauptmenü"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

function Info() {

  const [text1, setText1] = useState(null);
  const [text2, setText2] = useState(null);
  const [text3, setText3] = useState(null);
  const [text4, setText4] = useState(null);
  const [text5, setText5] = useState(null);
  const [text6, setText6] = useState(null);

  useEffect(() => {
    (async () => {
      let text1 = await Device.getDeviceTypeAsync({});
      setText1(text1);
    })();

    (async () => {
      let text2 = await Device.getUptimeAsync({});
      setText2(Number(text2 / 1000 / 60).toFixed(2));
    })();

    (async () => {
      let text3 = await Device.getMaxMemoryAsync({});
      setText3(text3 / Math.pow(10, 9));
    })();

    (async () => {
      let text4 = await Device.isRootedExperimentalAsync({});
      setText4(text4);
    })();

    (async () => {
      let text5 = await Device.isSideLoadingEnabledAsync({});
      setText5(text5);
    })();

    (async () => {
      let text6 = await Device.hasPlatformFeatureAsync('android.hardware.touchscreen');
      setText6(text6);
    })();

  }, []);

  let getDeviceTypeAsync = JSON.stringify(text1);
  let getUptimeAsync = JSON.stringify(text2);
  let getMaxMemoryAsync = JSON.stringify(text3);
  let isRootedExperimentalAsync = JSON.stringify(text4);
  let isSideLoadingEnabledAsync = JSON.stringify(text5);
  let hasPlatformFeatureAsync = JSON.stringify(text6);

  const brand = Device.brand;
  const isDevice = Device.deviceYearClass;
  const productName = Device.productName;
  const totalMemory = Device.totalMemory / Math.pow(10, 9);
  const supportedCpuArchitectures = Device.supportedCpuArchitectures;
  const osName = Device.osName;
  const osVersion = Device.osVersion;
  const platformApiLevel = Device.platformApiLevel;

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
    });
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 18 }}>
        Brand: {brand} {'\n'}
        Gerätjahr-Klasse: {isDevice} {'\n'}
        Prototyp-Name: {productName} {'\n'}
        RAM insgesamt: {totalMemory} GB {'\n'}{'\n'}
        Unterstütze CPU-Architekturen: {supportedCpuArchitectures} {'\n'}{'\n'}
        Betriebssystem: {osName} {osVersion} {'\n'}
        Android SDK: Version {platformApiLevel} {'\n'}{'\n'}
        Gerättyp: {'\n'}
        0: Unbekannt {'\n'}
        1: Smartphone {'\n'}
        2: Tablet {'\n'}
        3: Desktop {'\n'}
        4: TV {'\n'}{'\n'}
        Typ: {getDeviceTypeAsync} {'\n'}{'\n'}
        Laufzeit: {getUptimeAsync} Minuten {'\n'}
        Maximum-RAM-Benutzung von Java VM: {getMaxMemoryAsync} GB {'\n'}
        Jailbreak (Experimental): {isRootedExperimentalAsync} {'\n'}
        Externe Apps-Installation: {isSideLoadingEnabledAsync} {'\n'}
        Hat Hardware-Touchscreen: {hasPlatformFeatureAsync} {'\n'}
      </Text>
      <Button title='Ausdrucken' onPress={print} />
    </View>
  );
}

function Locations() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Standorterlaubnis wurde abgelehnt.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Ladet...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.paragraph}> Standortinformationen: {'\n'}{'\n'} {text}</Text>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        userLocationUpdateInterval={1}
      >
        <MapView.Marker
          coordinate={{
            latitude: 47.37929841303699,
            longitude: 8.528667558986431
          }}
          title={"Benedict-Schule Zürich"}
          description={"Privatschule im Bereich Informatik, Sprache, Handel, Medizin."}
        />
      </MapView>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Menü') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'System-Info') {
            iconName = focused ? 'information-circle' : 'information-circle-outline';
          } else {
            iconName = focused ? 'location' : 'location-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}

    >
      <Tab.Screen
        name="Menü"
        component={HomeScreen}
      />
      <Tab.Screen
        name="System-Info"
        component={Info}
      />
      <Tab.Screen
        name="Standort"
        component={Locations}
      />
    </Tab.Navigator>
  );
}

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Menü';

  switch (routeName) {
    case 'Menü':
      return 'Hauptmenü';
    case 'System-Info':
      return 'Systeminformationen';
    case 'Standort':
      return 'Standortfunktionen';
  }
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Help"
          component={Help}
          options={{
            title: 'Anleitung und Informationen'
          }}
        />
        <Stack.Screen
          name="Origin"
          component={Origin}
          options={{
            title: 'Ursprung des Apps'
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    margin: 30,
    fontSize: 18,
    textAlign: 'center',
  },
  map: {
    width: 410,
    height: 464,
  },
});