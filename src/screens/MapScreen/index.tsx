import React, { useContext, useEffect, useMemo, useState } from "react";
import { Button, View, Text, ActivityIndicator } from "react-native";
import Header from "../../components/organisms/Header";
import UserContext from "../../contexts/UserContext";
import { getTokensFromEncryptedStorage } from "../../utils/getTokensFromEncryptedStorage";
import signOut from "../../utils/signOut";
import MapView, { Marker, Region } from "react-native-maps";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import Station from "../../types/Station";
import { sendGraphQL } from "../../utils/sendGraphQL";
import StationsQuery from "../../graphql/StationsQuery";
import stationQueryToStationObject from "../../utils/mappers/stationQueryToStationObject";
import Geolocation from "react-native-geolocation-service";

import { styles } from "./styles";
import mapStyle from "./mapStyle.json";

export default function MapScreen({ navigation }: any) {
  const [stations, setStations] = useState<Station[]>([]);
  const [isStationsLoading, setIsStationsLoading] = useState(false);

  const initialRegion = useMemo<Region>(() => ({
    latitude: 50.276697,
    longitude: 18.975806,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }), []);
  // const [region, setRegion] = useState<Region>(initialRegion);

  useEffect(() => {
    const permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    // const setRegionOnLoad = () => {
    //   Geolocation.getCurrentPosition((location) => {
    //     setRegion({
    //       latitude: location.coords.latitude,
    //       longitude: location.coords.longitude,
    //       latitudeDelta: 0.0922,
    //       longitudeDelta: 0.0421,
    //     });
    //   });
    // };

    const requestPermission = () => {
      request(permission)
        .then(result => {
          console.log("Permission request result:", result);
        })
        .catch((e: any) => {
          console.log("Permission request error:", e);
        });
    };
    
    check(permission)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            requestPermission();
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            // setRegionOnLoad();
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            // setRegionOnLoad();
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((e: any) => {
        console.log("Location permissions error:", e);
      });
  }, []);

  const onRegionChangeCompleteHandler = (region: Region, details: any) => {
    setIsStationsLoading(true);
    const { latitude, longitude, latitudeDelta } = region;
    const radius = latitudeDelta * 111;

    const stationsQuery = StationsQuery({ latitude, longitude, radius });

    sendGraphQL(stationsQuery)
      .then((data: any) => {
        const { stations } = data;
        const mappedStations = stations.map(stationQueryToStationObject);

        setStations(mappedStations);
        setIsStationsLoading(false);
      })
      .catch((e: any) => {
        console.log("Stations query error:", e);
      });
  };

  return (
    <View style={styles.root}>
      <Header />
      
      {
        isStationsLoading &&
          <ActivityIndicator
            size={24}
            color="#e3b04b"
            style={styles.stationsLoadingIndicator}
          />
      }

      <MapView
        style={styles.map}
        provider="google"
        mapType="standard"
        loadingEnabled
        loadingBackgroundColor="#181818"
        loadingIndicatorColor="#e3b04b"
        customMapStyle={mapStyle}
        mapPadding={{
          top: 100,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        userInterfaceStyle="dark"
        onRegionChangeComplete={onRegionChangeCompleteHandler}
        // region={region}
        // onRegionChange={setRegion}
        showsUserLocation
        showsMyLocationButton
      >
        {
          stations.map((station, index) => (
            <Marker
              key={index}
              coordinate={station.location}
              title={station.name}
              description={station.description}
              pinColor="#e3b04b"
              flat={true}
            />
          ))
        }
      </MapView>
    </View>
  );
}