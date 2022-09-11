import React from "react";
import { Dimensions, View, Text, TouchableNativeFeedback } from "react-native";
import Badge from "../../atoms/Badge";
import { styles } from "./styles";

type MapStationCarouselTileProps = {
  name: string;
  imageUrl?: string;
  onPress?: () => void;
};

export const SLIDER_WIDTH = Dimensions.get("window").width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

export default function MapStationCarouselTile(props: MapStationCarouselTileProps) {
  const {
    name,
    imageUrl,
    onPress,
  } = props;

  return (
    <View style={styles.root}>
      <TouchableNativeFeedback
        onPress={onPress}
      >
        <View style={[
          { width: ITEM_WIDTH, },
          styles.container,
        ]}>
          <Text style={styles.stationName}>{ name }</Text>
          <Badge
            label="Beers"
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}