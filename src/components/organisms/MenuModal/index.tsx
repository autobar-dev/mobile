import React, { useContext, useMemo } from "react";
import { Text, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
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

export default function MenuModal({ navigation }: any) {
  const { user } = useContext(UserContext);

  const closeMenu = () => navigation.goBack();
  const navigateTo = (screenName: string) => {
    console.log(`navigateTo - ${screenName}`);
    closeMenu();
    navigation.navigate(screenName);
  };

  const menuItems = useMemo<MenuItemProps[]>(() => [
    {
      label: "Profile",
      color: "#f8f8f8",
      icon: (
        <UserIcon
          color="#f8f8f8"
          width={22}
        />
      ),
      onPress: () => navigateTo("LocalAuth"),
      rightElement: (
        <ArrowRightIcon
          color="#f8f8f8"
          width={9}
        />
      ),
    },
    {
      label: "Settings",
      color: "#f8f8f8",
      icon: (
        <SettingsIcon
          color="#f8f8f8"
          width={22}
        />
      ),
      rightElement: (
        <ArrowRightIcon
          color="#f8f8f8"
          width={9}
        />
      ),
      onPress: () => navigateTo("LocalAuth"),
    },
    {
      label: "Sign Out",
      color: "#ef5050",
      icon: (
        <SignOutIcon
          color="#ef5050"
          width={20}
          style={{ marginRight: 2 }}
        />
      ),
      dividerAbove: true,
      onPress: async () => {
        await signOut();
        navigateTo("SignIn");
      },
    },
  ], []);

  return (
    <TouchableWithoutFeedback
      onPress={closeMenu}
    >
      <View style={styles.root}>
        <View style={styles.profileInfo}>
          <UserAvatar />
          <Text style={styles.profileInfoName}>
            { user?.name } { user?.surname }
          </Text>
          <Text style={styles.profileInfoBalance}>
            Balance: { user?.balance } { user?.balanceCurrency }
          </Text>
        </View>

        <TouchableWithoutFeedback>
          <View style={styles.menuContainer}>
            { menuItems.map((item, index) => (
              <MenuItem
                key={`menuItem-${index}`}
                label={item.label}
                color={item.color}
                icon={item.icon}
                rightElement={item.rightElement}
                dividerAbove={item.dividerAbove}
                onPress={item.onPress}
                style={item.style}
              />
            )) }
          </View>
        </TouchableWithoutFeedback>

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