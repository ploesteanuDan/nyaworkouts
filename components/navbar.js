import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "react-router-native";

function Navbar(props) {
  if (props.isToggled) {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          // Background Linear Gradient
          pointerEvents="none"
          colors={["transparent", "black"]}
          start={{ x: 0, y: 0.9 }}
          locations={[0, 0.8]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -50,
            height: 3000,
          }}
        />
        <View style={styles.navbarContainer}>
          <Link component={TouchableOpacity} activeOpacity={0.5} to="/account">
            <Image
              style={styles.navButtons}
              source={require("../assets/accountIcon.png")}
            />
          </Link>

          <Link
            component={TouchableOpacity}
            activeOpacity={0.5}
            to="/achievements"
          >
            <Image
              style={styles.navButtons}
              source={require("../assets/achievementsIcon.png")}
            />
          </Link>

          <Link component={TouchableOpacity} activeOpacity={0.5} to="/">
            <Image
              style={styles.navButtons}
              source={require("../assets/trainingIcon.png")}
            />
          </Link>

          <Link
            component={TouchableOpacity}
            activeOpacity={0.5}
            to="/hydration"
          >
            <Image
              style={styles.navButtons}
              source={require("../assets/waterIcon.png")}
            />
          </Link>
        </View>
      </View>
    );
  } else {
    return <View></View>;
  }
}

const styles = StyleSheet.create({
  navbarContainer: {
    position: "absolute",
    width: "90%",
    height: 75,
    backgroundColor: "#191919",
    bottom: -20,
    right: "5%",
    borderRadius: 12,
    opacity: 0.7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  navButtons: {
    width: 55,
    height: 55,
    opacity: 1,
  },
});

export default Navbar;
