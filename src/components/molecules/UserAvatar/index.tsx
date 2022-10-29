import React, { useContext, useEffect } from "react";
import { View, Image, Text } from "react-native";
import UserContext from "../../../contexts/UserContext";
import getProfilePictureBucketUrl from "../../../utils/getProfilePictureBucketUrl";

import { styles } from "./styles";

export default function UserAvatar({ style }: { style?: any }) {
  const { user } = useContext(UserContext);

  // useEffect(() => {
  //   console.log("UserAvatar", `${getProfilePictureBucketUrl()}/${user?.profilePicture}`);
  // }, []);

  return (
    <View style={[styles.root, style]}>
      { user && user.profilePicture && (
        <Image
          style={styles.image}
          source={{ uri: (() => {
            const url = `${getProfilePictureBucketUrl()}/${user.profilePicture}`;
            console.log(url);
            
            return url;
          })() }}
        />
      ) }
      { (!user || !user.profilePicture) && (
        <Text style={styles.initials}>
          {user?.name[0]}{user?.surname[0]}
        </Text>
      ) }
    </View>
  );
}