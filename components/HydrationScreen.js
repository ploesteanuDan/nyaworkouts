import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSpring, animated, config } from "react-spring";
import * as firebase from "firebase";
export default function HydrationScreen() {
  const loadAnim = useSpring({
    left: 0,
    opacity: 1,
    from: { left: -30, opacity: 0 },
  });
  const AnimatedView = animated(View);
  const [setNotifications, notifications] = useState();
  function handleNotifButton() {
    function handle(data) {
      console.log(data);
    }
    firebase
      .firestore()
      .collection("Users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(function (doc) {
        userPref = doc.data().userNotificationsPrefference;
        handle(userPref);
      });
  }

  return (
    <AnimatedView style={loadAnim}>
      <View style={styles.AvhievementsScreenContainer}>
        <Text style={styles.title}>Hydration</Text>
        <Text style={styles.notifText}>
          It's important to stay hydrated.
          {"\n"}
          Please, enable our notifications to make sure you drink enough water.
        </Text>
        <TouchableOpacity>
          <Text
            style={styles.enableNotifButton}
            onPress={() => {
              handleNotifButton();
            }}
          >
            Toggle notifications
          </Text>
        </TouchableOpacity>
      </View>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  AvhievementsScreenContainer: {
    top: "7%",
    height: "95%",
  },
  title: {
    fontSize: 45,
    color: "#D2D2D2",
    margin: 20,
    fontFamily: "Poppins_800ExtraBold_Italic",
  },

  enableNotifButton: {
    alignSelf: "center",
    width: 140,
    height: 50,
    backgroundColor: "#cf8061",
    color: "#D2D2D2",
    borderRadius: 12,
    textAlign: "center",
    lineHeight: 65,
    fontSize: 25,
    fontFamily: "Poppins_600SemiBold",
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
    marginBottom: 150,
  },
  notifText: {
    fontSize: 20,
    color: "#D2D2D2",
    width: "90%",
    alignSelf: "center",
    fontFamily: "Poppins_400Regular",
  },
  disableNotifications: {
    color: "#D2D2D2",
    fontFamily: "Poppins_400Regular",
    alignSelf: "center",
  },
});
