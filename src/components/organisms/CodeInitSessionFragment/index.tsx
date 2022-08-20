import React from "react";
import { View, Text, Dimensions, ActivityIndicator } from "react-native";
import QRCode from "react-native-qrcode-svg";

const fetchCode = async () => {
  const codeLength = 24;
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  for(let i = 0; i < codeLength; i++) {
    code += characters[Math.floor(Math.random() * characters.length)];
  }

  await (new Promise((res, rej) => setTimeout(() => res(true), 5000)));

  return code;
};

const displayTime = (seconds: number) => {
  return new Date(seconds * 1000).toISOString().substring(14, 19);
};

const displayCode = (code: string) => {
  return code.substring(0, 3) + " " + code.substring(3);
};

export default function CodeInitSessionFragment() {
  const [code, setCode] = React.useState("");
  const [isCodeLoading, setIsCodeLoading] = React.useState(true);
  const { width } = Dimensions.get("window");
  const qrCodeWidth = width * 0.7;

  const activationCodeTTL = 30;

  let timer: any;
  const [seconds, setSeconds] = React.useState(0);

  const performCodeUpdate = () => {
    fetchCode().then(fetchedCode => {
      setCode(fetchedCode);
      setIsCodeLoading(false);
    });
  };

  React.useEffect(() => {
    timer = setInterval(() => {
      setSeconds(secs => {
        if(secs == 0) {
          setIsCodeLoading(true);
          clearInterval(timer);

          performCodeUpdate();
          
          return activationCodeTTL;
        }

        return secs - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [code]);

  React.useEffect(() => {
    performCodeUpdate();
  }, []);

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimer(timer => {
  //       if(isCodeLoading) {
  //         return timer;
  //       } else {
  //         if(timer == 0) {
  //           setIsCodeLoading(true);

  //           fetchCode().then(fetchedCode => {
  //             setCode(fetchedCode);
  //             setIsCodeLoading(false);
              
  //             return activationCodeTTL;
  //           });
  //         } else {
  //           return timer - 1;
  //         }
  //       }
  //     });
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View>
        <QRCode
          value={code || "LOADING"}
          size={qrCodeWidth}
          backgroundColor="transparent"
          color="white"
        />
        {
          isCodeLoading &&
            <View
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: qrCodeWidth,
                height: "100%",
                backgroundColor: "#232323dd",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <ActivityIndicator
                size="large"
                color="#ed600e"
                style={{
                  transform: [{ scale: 3 }]
                }}
              />
            </View>
        }
      </View>
      <Text style={{ color: "#909090", position: 'absolute', bottom: 80 }}>{ isCodeLoading ? 'Loading...' : displayTime(seconds) }</Text>
    </View>
  );
}