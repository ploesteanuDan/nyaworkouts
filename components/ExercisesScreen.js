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
  TouchableHighlight,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "react-router-native";
import { useSpring, animated } from "react-spring";
import { Spring } from "react-spring/renderprops";
import { Video } from "expo-av";
import * as firebase from "firebase";
import * as FileSystem from 'expo-file-system';
import { set } from "react-native-reanimated";



export default class ExercisesScreen extends Component {
  state = {
   exercises: null,
   exercisesDone: 0,
   achievementString: []
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
              exerciseReps: doc.data().exerciseReps,
              localVideo: FileSystem.documentDirectory + doc.data().exerciseName + ".mp4",
            })
          }
        })
        this.setState({exercises: tempArray})
      }
    )
  }

  async fetchAchievementStringFromFirebase(){
    firebase.firestore().collection("Users").where("userEmail","==",firebase.auth().currentUser.email)
    .get().then(
      snapshot => {
        const achString = []
        snapshot.forEach(doc => {
         const ach = doc.data().achievementString
         achString.push(ach)
        })
        this.setState({achievementString: achString[0]})
      }
    )
  }


  componentDidMount(){
    this.fetchVideosFromFirebase()
    this.fetchAchievementStringFromFirebase()
  }

 async getExStatus(item){
    item.done = true;
    await this.setState({exercisesDone: this.state.exercisesDone + 1})
    if(this.state.exercisesDone >= this.state.exercises.length){
        this.setState({trainingFinished: true})
        firebase.firestore().collection("Users").doc(firebase.auth().currentUser.uid).update({
        achievementString: this.state.achievementString.concat(this.props.trainingName)
      })
    }
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
              component={TouchableHighlight}
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


                <Spring
                 from={{ opacity: 0 }}
                  to={{ 
                  opacity: 1,
                  backgroundColor: "#1D1D1D",
                  width: Dimensions.get("window").width * 0.95,
                  height: Dimensions.get("window").width * 0.665,
                  marginBottom: 10,
                  marginTop: 10,
                  borderRadius: 12,
                  backgroundColor: "#191919",
                  overflow: "hidden", }}>
                {cardProps => 
                
                <View style={cardProps}>
                <Link
                  component={TouchableHighlight}
                  activeOpacity={0.85}
                  onPress={()=>{item.pressed = !item.pressed}}
                >
                  <View>
                    <Video
                      source={{uri: item.localVideo}}
                      rate={1.0}
                      volume={1.0}
                      isMuted={true}
                      resizeMode="cover"
                      shouldPlay={item.pressed}
                      isLooping={false}
                      style={styles.exPhoto}
                    />
                    <Text style={styles.exName}>{item.exerciseName}</Text>
                    <Text style={styles.exReps}>
                      {item.exerciseReps}
                      {" REPS"}
                    </Text>

                  </View>
                </Link>
                <View pointerEvents={item.done ? "none" : "auto"}>  

                <Spring
                  to={{  
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                  fontFamily: "Poppins_600SemiBold_Italic",
                  fontSize: 20,
                  color: item.done ? "#191919": "#D2D2D2",
                  backgroundColor: item.done ? "#50d6d3" : "#191919",
                  padding: 10,
                  paddingVertical: 5,
                  borderRadius: 10,
                  zIndex: 9000, }}>
                  {doneButtonProps =>                           
                  <Text          
                  onPress={()=>{this.getExStatus(item)}} 
                  style={doneButtonProps}
                          >
                            Done
                          </Text>}
                </Spring>


                    
                    </View>
              </View>
                
                }
                </Spring>





              )}
            />
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
          zIndex: -1000,
          left: 0,
          right: 0,
          bottom: -100,
          height: 3500,
        }}
      />
      <Spring
        from={{ opacity: 0 }}
        to={{ 
          opacity: this.state.trainingFinished ?  1 : 0, 
          width: "100%",
          height: this.state.trainingFinished ? "100%" : "0%",
          backgroundColor: "black",
          top: 0,
          position: "absolute"
        }}>
          {finishScreenProps => 
            <View style={finishScreenProps}>
              <Text style={styles.finishScreenText}>
                Training finished!
              </Text>
              <Spring
                from={{ opacity: 0 }}
                to={{ 
                  opacity: 1,
                  alignSelf: "center",
                  textAlign: "center",
                  top: "50%"
                   }}>
                {finishButtonProps => 
                 <View style={finishButtonProps}>
                            <Link
              component={TouchableHighlight}
              activeOpacity={0.5}
              onPress={() => {
                this.props.getTrainingName("none");
              }}
              to="/"
            >
              <Text style={styles.finishScreenSubtext} >
                Dashboard
              </Text>
            </Link>
                 </View> 
                }
              </Spring>
            </View>
          }
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
    height: Dimensions.get("window").width * 0.665,
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
    top: 10,
    left: 10,
    fontFamily: "Poppins_600SemiBold_Italic",
    fontSize: 20,
    color: "#D2D2D2",
    backgroundColor: "#191919",
    padding: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  exDone: {
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
    zIndex: 9000
  },
  finishScreenText: {
    top: "45%",
    fontSize: 40,
    color: "#D2D2D2",
    fontFamily: "Poppins_800ExtraBold_Italic",
    alignSelf: "center",
    textAlign: "center",
  },
  finishScreenSubtext: {
    fontSize: 25,
    fontFamily: "Poppins_600SemiBold",
    color: "#D2D2D2",
    alignSelf: "center",
    textAlign: "center",
  },

  
});
