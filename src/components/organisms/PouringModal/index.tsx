import React, { useContext, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Alert, Button, Image, Text, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions, View } from "react-native";
import UserContext from "../../../contexts/UserContext";
import ArrowRightIcon from "../../atoms/ArrowRightIcon";
import CloseCircleIcon from "../../atoms/CloseCircleIcon";
import MessageIcon from "../../atoms/MessageIcon";
import SettingsIcon from "../../atoms/SettingsIcon";
import SignOutIcon from "../../atoms/SignOutIcon";
import UserIcon from "../../atoms/UserIcon";
import MenuItem, { MenuItemProps } from "../../molecules/MenuItem";
import UserAvatar from "../../molecules/UserAvatar";
import signOut from "../../../utils/signOut";

import { styles } from "./styles";
import { getServiceUri } from "../../../utils/getServiceUri";
import PouringContext from "../../../contexts/PouringContext";
import { CustomButton } from "../../molecules/CustomButton";
import { sendGraphQL } from "../../../utils/sendGraphQL";
import gql from "graphql-tag";

export default function PouringModal({ navigation }: any) {
  const { user } = useContext(UserContext);
  const { pouringSerialNumber, setPouringSerialNumber } = useContext(PouringContext);
  
  const [isCancellationLoading, setIsCancellationLoading] = useState(false);

  const closeMenu = () => navigation.goBack();
  const navigateTo = (screenName: string) => {
    console.log(`navigateTo - ${screenName}`);
    closeMenu();
    navigation.navigate(screenName);
  };
  const cancelPouring = async () => {
    console.log("Cancel pouring");
    
    setIsCancellationLoading(true);

    try {
      const response = await fetch(`${getServiceUri()}/modules/${pouringSerialNumber}/cancel`, {
        method: "POST",
      });
      const responseJson = await response.json();

      if(responseJson.error) {
        throw new Error(responseJson.error);
      }

      console.log("Cancel response", responseJson);
      
      setIsCancellationLoading(false);
      setPouringSerialNumber(undefined);
      closeMenu();
    } catch(e) {
      setIsCancellationLoading(false);
      Alert.alert(`Error cancelling pouring: ${JSON.stringify(e)}`);
    }
  };

  const [isImageLoading, setIsImageLoading] = useState(true);
  const [pouringData, setPouringData] = useState<{
    name: string;
    description: string;
    image: string;
    additionalData: {
      alcohol_by_volume: number;
      extract: number;
    };
  }>();

  useEffect(() => {
    new Promise(async (res, rej) => {
      const data = await sendGraphQL(gql`
        query {
          product(id: 1) {
            image
            name
            description
            additionalData
          }
        }
      `);

      data.product.additionalData = JSON.parse(data.product.additionalData);

      console.log(data);
      setPouringData(data.product);
    });
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={closeMenu}
    >
      <View style={styles.root}>
        <View style={styles.container}>
          <View
            style={styles.imageWrapper}
          >
            { (isImageLoading || !pouringData?.image) && (
              <ActivityIndicator
                size={"large"}
                color="#e3b04b"
              />
            ) }
            <Image
              style={{
                ...styles.beerImage,
                display: (isImageLoading || !pouringData?.image) ? "none" : "flex",
              }}
              source={{ uri: pouringData?.image }}
              onLoad={() => setIsImageLoading(false)}
            />
          </View>
          <View
            style={styles.beerInfoWrapper}
          >
            <Text
              style={styles.beerName}
            >{ pouringData?.name }</Text>
            <Text
              style={styles.beerDescription}
            >{ pouringData?.description }</Text>
            
            <Text>ABV: {pouringData?.additionalData.alcohol_by_volume}%</Text>
            <Text>Extract: {pouringData?.additionalData.extract}%</Text>
          </View>
          <CustomButton
            label="Cancel pouring"
            style={styles.cancelPouringButton}
            onPress={cancelPouring}
            loader={isCancellationLoading}
          />
        </View>
        <View style={styles.closeModalButtonWrapper}>
          <TouchableOpacity
            onPress={closeMenu}
          >
            <CloseCircleIcon
              width={30}
              color="#f8f8f8"
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}