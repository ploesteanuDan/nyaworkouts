import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import * as firebase from "firebase";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useSpring, animated, config } from "react-spring";

const achievements = [
  {
    key: "0",
    name: "New begginings",
    photo: "https://picsum.photos/450",
    reason: "Avhieved after completing your first session with us.",
  },
  {
    key: "1",
    name: "New heights",
    photo: "https://picsum.photos/454",
    reason: "Achieved for completing 3 sessions with us. ",
  },
  {
    key: "2",
    name: "Never skip leg day",
    photo: "https://picsum.photos/452",
    reason: "Achieved for completing 3 leg based sessions.",
  },
];

export default function AchievementsScreen() {
  const loadAnim = useSpring({
    left: 0,
    opacity: 1,
    from: { left: -30, opacity: 0 },
  });
  const AnimatedView = animated(View);
  return (
    <AnimatedView style={loadAnim}>
      <View style={styles.AvhievementsScreenContainer}>
        <Text style={styles.title}>Achievements</Text>
        <ScrollView>
          <FlatList
            data={achievements}
            renderItem={({ item }) => (
              <View style={styles.achievementCards}>
                <Image
                  style={styles.achievementCardBg}
                  source={{ uri: item.photo }}
                />

                <Text style={styles.achievementCardName}>{item.name}</Text>

                <Text style={styles.achievementCardReason}>{item.reason}</Text>
              </View>
            )}
          />
          <Text style={styles.noMoreCards}>
            These are all your achievements. Work hard and gain more!
          </Text>
          <TouchableOpacity>
            <Text style={styles.supportUsButton}>Support us</Text>
          </TouchableOpacity>
        </ScrollView>
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
  infoContainer: {
    backgroundColor: "#191919",
    width: "90%",
    height: 300,
    alignSelf: "center",
    borderRadius: 12,
  },
  supportUsButton: {
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
  achievementCards: {
    backgroundColor: "#1D1D1D",
    width: Dimensions.get("window").width * 0.95,
    height: Dimensions.get("window").width * 0.95,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 12,
    overflow: "hidden",
    alignSelf: "center",
  },
  achievementCardName: {
    color: "#D2D2D2",
    fontSize: 40,
    position: "absolute",
    bottom: "30%",
    left: "5%",

    fontFamily: "Poppins_800ExtraBold_Italic",
  },
  achievementCardReason: {
    color: "#D2D2D2",
    fontSize: 15,
    position: "absolute",
    bottom: "25%",
    left: "5%",
    fontFamily: "Poppins_400Regular",
  },
  achievementCardBg: {
    width: "100%",
    height: "100%",
  },
  noMoreCards: {
    fontSize: 17,
    marginBottom: 150,
    color: "#D2D2D2",
    fontFamily: "Poppins_400Regular",
    width: "90%",
    alignSelf: "center",
  },
});
