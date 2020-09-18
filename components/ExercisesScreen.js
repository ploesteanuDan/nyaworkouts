import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import { Link } from "react-router-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSpring, animated } from "react-spring";
import { Spring } from "react-spring/renderprops";
import * as firebase from "firebase";

const exercises = [
  {
    name: "Squats",
    color: "dodgerblue",
    reps: "10",
    duration: "20",
    photo: "https://picsum.photos/597",
    key: "0",
  },
  {
    name: "Glutemachine",
    color: "tomato",
    reps: "20",
    duration: "45",
    photo: "https://picsum.photos/600",
    key: "1",
  },
  {
    name: "Faint",
    color: "hotpink",
    reps: "1",
    duration: "0.2",
    photo: "https://picsum.photos/799",
    key: "2",
  },
  {
    name: "Squats",
    color: "dodgerblue",
    reps: "10",
    duration: "20",
    photo: "https://picsum.photos/797",
    key: "3",
  },
  {
    name: "Glutemachine",
    color: "tomato",
    reps: "20",
    duration: "45",
    photo: "https://picsum.photos/700",
    key: "4",
  },
  {
    name: "Faint",
    color: "hotpink",
    reps: "1",
    duration: "0.2",
    photo: "https://picsum.photos/999",
    key: "5",
  },
];

function ExercisesScreen(props) {
  // SPRING ANIMATIONS
  const cardsFade = useSpring({
    left: 0,
    opacity: 1,
    from: { left: -30, opacity: 0 },
  });
  const titleFade = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });
  const AnimatedView = animated(View);
  // -----------------------------

  // TRAINING COMPLETION
  const [exDone, setExDone] = useState(0);
  const [trainingFinished, setTrainingFinished] = useState(false);
  // -----------------------------

  // FIREBASE
  let user = firebase.auth().currentUser;
  // -----------------------------

  return (
    <View style={styles.ExercisesScreenContainer}>
      <AnimatedView style={titleFade}>
        <Link
          component={TouchableOpacity}
          activeOpacity={0.5}
          to="/"
          onPress={() => {
            props.getTrainingName("none");
          }}
        >
          <Text style={styles.title}>
            {"< "}
            {props.trainingName}
          </Text>
        </Link>
      </AnimatedView>
      <ScrollView>
        <AnimatedView style={cardsFade}>
          <FlatList
            data={exercises}
            renderItem={({ item }) => (
              <View style={styles.exerciseCard}>
                <Image
                  style={styles.exercisePhoto}
                  source={{ uri: item.photo }}
                />

                <Text style={styles.exerciseName}>{item.name}</Text>
                <View pointerEvents={item.pressed ? "none" : "auto"}>
                  <Text
                    style={[
                      styles.doneButton,
                      { backgroundColor: item.pressed ? "green" : "#1D1D1D" },
                    ]}
                    onPress={() => {
                      setExDone(exDone + 1);
                      item.pressed = true;
                      if (exDone == exercises.length - 1) {
                        setTrainingFinished(true);
                      }
                    }}
                  >
                    Done
                  </Text>
                </View>
                <Text style={styles.reps}>
                  {item.reps}
                  {" REPS"}
                </Text>
              </View>
            )}
          />
        </AnimatedView>
      </ScrollView>
      <LinearGradient
        // Background Linear Gradient
        pointerEvents="none"
        colors={["transparent", "black"]}
        start={{ x: 0, y: 0.9 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 1]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -50,
          height: 1500,
        }}
      />
      <View
        pointerEvents={trainingFinished ? "auto" : "none"}
        style={[
          styles.greenScreen,
          {
            backgroundColor: trainingFinished ? "black" : "transparent",
          },
        ]}
      >
        <Link
          component={TouchableOpacity}
          activeOpacity={0.5}
          to="/"
          onPress={() => {
            props.getTrainingName("none");
            setTrainingFinished(true);
          }}
        >
          <Text onPress={() => {}} style={styles.finishButton}>
            Finish workout
          </Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ExercisesScreenContainer: {
    top: "7%",
    left: 0,
    height: "95%",
    width: "100%",
  },
  title: {
    fontSize: 45,
    color: "#D2D2D2",
    margin: 20,
    fontFamily: "Poppins_800ExtraBold_Italic",
  },
  exerciseCard: {
    left: "2.5%",
    width: Dimensions.get("window").width * 0.95,
    height: Dimensions.get("window").width * 0.53,
    backgroundColor: "#1D1D1D",
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 12,
    overflow: "hidden",
  },
  exercisePhoto: {
    width: "100%",
    height: "100%",
  },
  exerciseName: {
    color: "#D2D2D2",
    fontSize: 20,
    position: "absolute",
    bottom: 50,
    left: 10,
    fontFamily: "Poppins_600SemiBold_Italic",
    backgroundColor: "#1D1D1D",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 3,
    paddingBottom: 1,
  },

  finishButton: {
    alignSelf: "center",
    position: "absolute",
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
    zIndex: 600,
    marginBottom: 30,
    top: 500,
  },
  reps: {
    color: "#D2D2D2",
    fontSize: 20,
    position: "absolute",
    bottom: 10,
    left: 10,
    fontFamily: "Poppins_600SemiBold_Italic",
    backgroundColor: "#1D1D1D",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 3,
    paddingBottom: 1,
  },
  doneButton: {
    color: "#D2D2D2",
    fontSize: 20,
    position: "absolute",
    bottom: 10,
    right: 10,
    fontFamily: "Poppins_600SemiBold_Italic",
    backgroundColor: "#1D1D1D",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 3,
    paddingBottom: 1,
  },
  greenScreen: {
    width: "100%",
    height: "100%",
    opacity: 1,
    position: "absolute",
  },
});

export default ExercisesScreen;
