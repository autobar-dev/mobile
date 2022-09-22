import React, { useContext } from "react";
import { View, Image, Text } from "react-native";
import UserContext from "../../../contexts/UserContext";

import { styles } from "./styles";

export default function UserAvatar({ style }: { style?: any }) {
  const { user } = useContext(UserContext);
  const { profilePicture } = user as any;

  return (
    <View style={[styles.root, style]}>
      <Text style={styles.initials}>
        {user?.name[0]}{user?.surname[0]}
      </Text>
    </View>
  );
}