// @refresh reset
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "react-router-native";
import { useSpring, animated } from "react-spring";
import { Spring } from "react-spring/renderprops";
import { Video } from "expo-av";
import * as firebase from "firebase";

const exercises = [
  {
    key: "0",
    photo: "https://picsum.photos/196",
    name: "Glute Press",
    includedIn: ["Core Workout", "Runner's Workout"],
    video: "../assets/squats.mp4",
    reps: "10",
  },
  {
    key: "1",
    photo: "https://picsum.photos/296",
    name: "Squats",
    includedIn: ["Legs Workout", "Runner's Workout"],
    video: "",
    reps: "5",
  },
  {
    key: "2",
    photo: "https://picsum.photos/396",
    name: "Harakiri",
    includedIn: ["Core Workout", "Legs Workout"],
    video: "",
    reps: "3",
  },
  {
    key: "3",
    photo: "https://picsum.photos/126",
    name: "Push-ups",
    includedIn: ["Core Workout"],
    video: "",
    reps: "10",
  },
];



export default function ExercisesScreen(props) {
  // EX HANDLING
  let currentUser = firebase.auth().currentUser;
  const [exDone, setExDone] = useState(0);
  const [ex, setEx] = useState(null);
  if (exDone === exercises.length) {
    console.log("workout completed");
    firebase.firestore().collection(currentUser.uid).add({
      trainingDone: props.trainingName,
    });
  }
  firebase.firestore().collection("Exercises").get().then(
    (snapshot) => {
      const exercises = [];
      snapshot.forEach( doc => {
       const containedBy = doc.data().exerciseIsContainedBy
       if(containedBy.includes(props.trainingName))
       exercises.push(doc.data())
      })
      setEx(exercises)
    }
  )
  //-----------------------------------------------

  //ANIMATIONS
  const AnimatedView = animated(View);
  const loadAnim = useSpring({
    left: 0,
    opacity: 1,
    from: { left: -30, opacity: 0 },
  });

  return (
    <View>
      <Spring
        from={{
          opacity: 0,
          top: "7%",
          left: "2.5%",
          height: "97%",
          left: "-5%",
        }}
        to={{ opacity: 1, top: "7%", left: "2.5%", height: "95%" }}
      >
        {(mainSpring) => (
          <View style={mainSpring}>
            <Link
              component={TouchableOpacity}
              activeOpacity={0.5}
              onPress={() => {
                props.getTrainingName("none");
              }}
              to="/"
            >
              <Text style={styles.title}>
                {"< "}
                {props.trainingName}
              </Text>
            </Link>
            <FlatList
              data={ex}
              renderItem={({ item }) => (
                <View style={styles.exCard}>
                  <Link
                    component={TouchableOpacity}
                    activeOpacity={0.5}
                    onPress={() => {
                      item.pressed = !item.pressed;
                    }}
                  >
                    <View>
                      <Video
                        source={{uri: item.exerciseVideo}}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="cover"
                        shouldPlay={item.pressed ? true : false}
                        isLooping={false}
                        automaticallyWaitsToMinimizeStalling={false}
                        style={styles.exPhoto}
                      />
                      <Text style={styles.exName}>{item.exerciseName}</Text>
                      <Text style={styles.exReps}>
                        {item.exerciseReps}
                        {" REPS"}
                      </Text>
                      <View pointerEvents={item.done ? "none" : "auto"}>
                        <Spring
                          from={{
                            position: "absolute",
                            bottom: 10,
                            right: 10,
                            fontFamily: "Poppins_600SemiBold_Italic",
                            fontSize: 20,
                            color: "#D2D2D2",
                            backgroundColor: "#191919",
                            padding: 10,
                            paddingVertical: 5,
                            borderRadius: 10,
                          }}
                          to={{
                            backgroundColor: item.done ? "green" : "#191919",
                          }}
                        >
                          {(doneButtonProps) => (
                            <Text
                              onPress={() => {
                                setExDone(exDone + 1);
                                item.done = true;
                                console.log("pressed");
                              }}
                              style={doneButtonProps}
                            >
                              Done
                            </Text>
                          )}
                        </Spring>
                      </View>
                    </View>
                  </Link>
                </View>
              )}
            />
          </View>
        )}
      </Spring>

      <Spring
        from={{
          width: "100%",
          height: "200%",
          position: "absolute",
          top: 0,
        }}
        to={{
          width: "100%",
          height: "150%",
          position: "absolute",
          bottom: 0,
          opacity: exDone === exercises.length ? 0.8 : 0,
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {(p) => (
          <View
            pointerEvents={exDone === exercises.length ? "auto" : "none"}
            style={p}
          >
            <Link
              component={TouchableOpacity}
              activeOpacity={0.5}
              onPress={() => {
                props.getTrainingName("none");
              }}
              to="/"
            >
              <View>
                <Text style={styles.finishScreenText}>Workout finished</Text>
                <Text style={styles.finishScreenSubtext}>
                  Touch to go back.
                </Text>
              </View>
            </Link>
          </View>
        )}
      </Spring>
      <LinearGradient
        // Background Linear Gradient
        pointerEvents="none"
        colors={["transparent", "black"]}
        start={{ x: 0, y: 0.9 }}
        locations={[0, 0.9]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -100,
          height: 3500,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  exContainer: {
    top: "7%",
    left: "2.5%",
    height: "95%",
  },
  title: {
    fontSize: 45,
    color: "#D2D2D2",
    margin: 20,
    fontFamily: "Poppins_800ExtraBold_Italic",
  },
  exCard: {
    backgroundColor: "#1D1D1D",
    width: Dimensions.get("window").width * 0.95,
    height: Dimensions.get("window").width * 0.95,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: "#191919",
    overflow: "hidden",
  },
  exPhoto: {
    width: "100%",
    height: "100%",
  },

  exReps: {
    position: "absolute",
    bottom: 10,
    left: 10,
    fontFamily: "Poppins_600SemiBold_Italic",
    fontSize: 20,
    color: "#D2D2D2",
    backgroundColor: "#191919",
    padding: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  exName: {
    position: "absolute",
    bottom: 55,
    left: 10,
    fontFamily: "Poppins_600SemiBold_Italic",
    fontSize: 20,
    color: "#D2D2D2",
    backgroundColor: "#191919",
    padding: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  doneButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    fontFamily: "Poppins_600SemiBold_Italic",
    fontSize: 20,
    color: "#D2D2D2",
    backgroundColor: "#191919",
    padding: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  finishScreenText: {
    fontSize: 40,
    color: "#D2D2D2",
    fontFamily: "Poppins_800ExtraBold_Italic",

    alignSelf: "center",
    textAlign: "center",
  },
  finishScreenSubtext: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
    color: "#D2D2D2",
  },
});
