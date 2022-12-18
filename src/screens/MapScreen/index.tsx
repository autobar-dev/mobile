import React, { createRef, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { View, ActivityIndicator, useWindowDimensions } from "react-native";
import Header from "../../components/organisms/Header";
import MapView, { MapMarker, Marker, MarkerPressEvent, Region } from "react-native-maps";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import Station from "../../types/Station";
import { sendGraphQL } from "../../utils/sendGraphQL";
import StationsQuery from "../../graphql/StationsQuery";
import stationQueryToStationObject from "../../utils/mappers/stationQueryToStationObject";
import Carousel from "react-native-snap-carousel";
import MapStationCarouselTile, { ITEM_WIDTH, SLIDER_WIDTH } from "../../components/molecules/MapStationCarouselTile";

import { styles } from "./styles";
import mapStyle from "./mapStyle.json";
import { PointOnScreen } from "../../types/PointOnScreen";
import NowPouringContext from "../../contexts/NowPouringContext";

type StationOnMapType = Station;

export default function MapScreen({ navigation }: any) {
  const { nowPouring } = useContext(NowPouringContext);

  const {
    width: screenWidth,
    height: screenHeight,
  } = useWindowDimensions();

  const [swipeStart, setSwipeStart] = useState<PointOnScreen>({ x: -1, y: -1 });
  const [swipeEnd, setSwipeEnd] = useState<PointOnScreen>({ x: -1, y: -1 });

  useEffect(() => {
    if(
      swipeStart.x !== -1 && swipeStart.y !== -1 &&
      swipeEnd.x !== -1 && swipeEnd.y !== -1
    ) {
      const deltaX = Math.abs(swipeEnd.x - swipeStart.x);
      const deltaY = Math.abs(swipeEnd.y - swipeStart.y);

      const percX = deltaX / screenWidth;
      const percY = deltaY / screenHeight;

      // console.log(`Swipe start: ${JSON.stringify(swipeStart)} | Swipe end: ${JSON.stringify(swipeEnd)}`);
      // console.log(`Delta X: ${deltaX} | Delta Y: ${deltaY}`);
      // console.log(`Perc X: ${deltaX / screenWidth * 100} | Perc Y: ${deltaY / screenHeight * 100}`);

      if(
        percY < 0.1 &&
        percX > 0.3
      ) {
        if(swipeStart.x < 20) {
          console.log("Open MenuModal");
          navigation.navigate("MenuModal");
        } else if(screenWidth - swipeStart.x < 20) {
          if(nowPouring) {
            console.log("Open PouringModal");
            navigation.navigate("PouringModal");
          } else {
            console.log("Open BarcodeScannerModal");
            navigation.navigate("BarcodeScannerModal");
          }
        }
      }

      setSwipeStart({ x: -1, y: -1 });
      setSwipeEnd({ x: -1, y: -1 });
    }
  }, [swipeEnd]);

  const [stations, setStations] = useState<StationOnMapType[]>([]);
  const [isStationsLoading, setIsStationsLoading] = useState(false);

  const mapViewRef = useRef<MapView>(null);
  const carouselRef = useRef<Carousel<any>>(null);

  const initialRegion = useMemo<Region>(() => ({
    latitude: 50.276697,
    longitude: 18.975806,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  }), []);

  useEffect(() => {
    const permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

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
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((e: any) => {
        console.log("Location permissions error:", e);
      });

      onRegionChangeCompleteHandler(initialRegion, {});
  }, []);

  const onRegionChangeCompleteHandler = (region: Region, details: any) => {
    setIsStationsLoading(true);
    const { latitude, longitude, latitudeDelta } = region;
    const radius = latitudeDelta * 111;

    const stationsQuery = StationsQuery({ latitude, longitude, radius });

    sendGraphQL(stationsQuery)
      .then((data: any) => {
        const { stations: stationsData } = data;
        const mappedStations: StationOnMapType[] = stationsData.map((station: any) => {
          return {
            ...stationQueryToStationObject(station),
          };
        });

        console.log(`Loaded ${mappedStations.length} stations`);

        setStations(mappedStations);
        setIsStationsLoading(false);
      })
      .catch((e: any) => {
        console.log("Stations query error:", e);
      });
  };

  const handleMarkerPress = ({ station, index }: { station: StationOnMapType, index: number }, event: MarkerPressEvent) => {
    console.log(`Moving carousel to ${index} - ${station.name}`);
    carouselRef.current?.snapToItem(index, true, false);
  };

  const moveMapToStationIndex = async (index: number) => {
    const mapViewBoundaries = await mapViewRef.current?.getMapBoundaries();
    
    const latitudeDelta = Math.abs(mapViewBoundaries!.northEast.latitude - mapViewBoundaries!.southWest.latitude);
    const longitudeDelta = Math.abs(mapViewBoundaries!.northEast.longitude - mapViewBoundaries!.southWest.longitude);

    const delta: { latitudeDelta: number, longitudeDelta: number } = {
      latitudeDelta,
      longitudeDelta
    };

    mapViewRef.current?.animateToRegion({
      latitude: stations[index].location.latitude,
      longitude: stations[index].location.longitude,
      ...delta,
    });

    console.log(`Moved map to station ${stations[index].name}`);
  };

  const handleCarouselCardChange = (index: number) => {
    console.log(`Carousel card changed to ${index}`);
    moveMapToStationIndex(index);
  };

  const handleCarouselCardPress = (index: number) => {
    console.log(`Carousel card ${index} pressed`);
    carouselRef.current?.snapToItem(index, true, false);
    moveMapToStationIndex(index);
  };

  return (
    <View
      style={styles.root}
      onTouchStart={(e) => {
        const {
          pageX: x,
          pageY: y,
        } = e.nativeEvent;

        setSwipeStart({ x, y });
      }}
      onTouchEnd={(e) => {
        const {
          pageX: x,
          pageY: y,
        } = e.nativeEvent;

        setSwipeEnd({ x, y });
      }}
    >
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
        ref={mapViewRef}
        loadingEnabled
        loadingBackgroundColor="#181818"
        loadingIndicatorColor="#e3b04b"
        customMapStyle={mapStyle}
        mapPadding={{
          top: 100,
          bottom: 170,
          left: 0,
          right: 0,
        }}
        maxZoomLevel={16}
        minZoomLevel={12}
        userInterfaceStyle="dark"
        onRegionChangeComplete={onRegionChangeCompleteHandler}
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton
      >
        {
          stations.map((station, index) => {
            return (
              <Marker
                key={index}
                coordinate={station.location}
                pinColor={"#e3b04b"}
                onPress={(event) => handleMarkerPress({ station, index }, event)}
              />
            );
          })
        }
      </MapView>

      <Carousel
        ref={carouselRef}
        layout="default"
        containerCustomStyle={styles.carousel}
        data={stations}
        renderItem={({ index, dataIndex, item }, parallaxData) => (
          <MapStationCarouselTile
            key={index}
            name={item.name}
            onPress={() => handleCarouselCardPress(index)}
          />
        )}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        useScrollView={true}
        vertical={false}
        onSnapToItem={(index) => handleCarouselCardChange(index)}
      />
    </View>
  );
}