import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, Text, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, Vibration, View, Alert } from "react-native";
import { Camera, CameraType } from "react-native-camera-kit";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";

import { styles } from "./styles";
import UserContext from "../../../contexts/UserContext";
import CloseCircleIcon from "../../atoms/CloseCircleIcon";
import { getServiceUri } from "../../../utils/getServiceUri";
import { getTokensFromEncryptedStorage } from "../../../utils/getTokensFromEncryptedStorage";
import PouringContext from "../../../contexts/PouringContext";

const barcodeRegex = /^(?:https:\/\/)?(?:a5r.ovh\/m\/)([0-9A-Z]{16})\/([0-9A-Z]{6})/g;

export default function BarcodeScannerModal({ navigation }: any) {
  const { setPouringSerialNumber } = useContext(PouringContext);

  const cameraRef = useRef<Camera>(null);
  const [foundBarcode, setFoundBarcode] = useState(false);

  const closeModal = () => navigation.goBack();
  const onValidScan = async (payload: {
    serialNumber: string,
    otk: string,
  }) => {
    new Promise((resolve, reject) => {
      console.log("valid scan");

      Alert.alert(
        "Found Autobar barcode",
        JSON.stringify(payload),
        [
          {
            text: "Cancel",
            onPress: () => {
              console.log(`Cancelled ${payload.serialNumber}`);
              resolve(true);
            },
          },
          {
            text: "OK",
            onPress: async () => {
              const { serialNumber, otk } = payload;
              const { accessToken } = await getTokensFromEncryptedStorage();

              console.log(`Starting ${serialNumber} - ${otk}`);

              try {
                const response = await fetch(`${getServiceUri()}/modules/${serialNumber}/start?otk=${otk}`, {
                  method: "POST",
                  mode: 'cors',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    access_token: accessToken,
                  }),
                });
  
                const responseJson = await response.json();
                console.log("Start response", responseJson);
  
                if(response.status == 200) {
                  console.log("Start successful");

                  setPouringSerialNumber(serialNumber);
  
                  navigation.navigate("PouringModal");
                } else {
                  console.log("Start unsuccessful");

                  throw new Error(`HTTP error: ${response.status} ${JSON.stringify(responseJson)}`);
                }
              } catch (e: any) {
                Alert.alert("There has been an error while requesting pouring start:", e.message);
              }
              
              resolve(true);
            },
          },
        ],
      );
    });
  };

  useEffect(() => {
    const permission = PERMISSIONS.ANDROID.CAMERA;

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
        console.log("Camera permissions error:", e);
      });
  }, []);

  return (
    <TouchableWithoutFeedback
      //onPress={closeModal}
    >
      <View style={styles.root}>
        <View style={styles.cameraWrapper}>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            cameraType={CameraType.Back}
            scanBarcode={!foundBarcode}
            laserColor={"blue"}
            colorForScannerFrame={"red"}
            onReadCode={(event: any) => {
              const barcodeValue = event.nativeEvent.codeStringValue as string;
              const match = barcodeRegex.exec(barcodeValue);

              if(!match) {
                console.log("Invalid barcode");
              } else {
                setFoundBarcode(true);

                onValidScan({
                  serialNumber: match[1],
                  otk: match[2],
                })
                  .then(() => {
                    closeModal();
                  });
              }
            }}
          />
        </View>
        <Text
          style={styles.instructionText}
        >Place the QR code visible on the module in frame</Text>
        <View style={styles.closeModalButtonWrapper}>
          <TouchableOpacity
            onPress={closeModal}
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