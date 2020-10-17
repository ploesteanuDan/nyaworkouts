// @refresh reset
import React, { Component } from "react";
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
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "react-router-native";
import { useSpring, animated } from "react-spring";
import { Spring } from "react-spring/renderprops";
import { Video } from "expo-av";
import * as firebase from "firebase";
import * as FileSystem from 'expo-file-system';





export default class ExercisesScreen extends Component {
  state = {
   exercises: null
  };
  async fetchVideosFromFirebase(){
    await firebase.firestore().collection("Exercises").get().then(
      (snapshot) => {
        const tempArray =[]
        snapshot.forEach(doc => {
          const containedBy = doc.data().exerciseIsContainedBy
          if(containedBy.includes(this.props.trainingName)){
            tempArray.push({
              exerciseName: doc.data().exerciseName,
              exerciseVideo: doc.data().exerciseVideo,
              localVideo: FileSystem.documentDirectory + doc.data().exerciseName + ".mp4"
            })
          }
        })
        this.setState({exercises: tempArray})
      }
    )
  }

  componentDidMount(){
    this.fetchVideosFromFirebase()
  }


  render() {
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
                this.props.getTrainingName("none");
              }}
              to="/"
            >
              <Text style={styles.title}>
                {"< "}
                {this.props.trainingName}
              </Text>
            </Link>
            <FlatList
              data={this.state.exercises}
              renderItem={({ item }) => (
                <View style={styles.exCard}>
                  <Link
                    component={TouchableOpacity}
                    activeOpacity={0.5}
                   onPress={()=>{}}
                  >
                    <View>
                      <Video
                        source={{uri: item.localVideo}}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="cover"
                        shouldPlay
                        isLooping
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
      </View>
    )
  }
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

  downloadButton:{
    top: 500,
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
  },
 downloadButton:{
  fontSize: 20,
    color: "#D2D2D2",
    margin: 20,
    fontFamily: "Poppins_800ExtraBold_Italic",
 }
});
