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
import { useSpring, animated, config } from "react-spring";
import { Spring } from "react-spring/renderprops";
const trainingPackets = [
  {
    name: "Core Workout",
    color: "dodgerblue",
    intensity: "1",
    duration: "2",
    photo: "https://picsum.photos/496",
    key: "0",
  },
  {
    name: "Legs Workout",
    color: "tomato",
    intensity: "2",
    duration: "1",
    photo: "https://picsum.photos/500",
    key: "1",
  },
  {
    name: "Runner's Workout",
    color: "hotpink",
    intensity: "1",
    duration: "1",
    photo: "https://picsum.photos/499",
    key: "2",
  },
];

function TrainingScreen(props) {
  const [offset, setOffset] = useState("");

  const loadAnim = useSpring({
    left: 0,
    opacity: 1,
    from: { left: -30, opacity: 0 },
  });
  // const scrollBar = useSpring({
  //   top: offset ? -100 : 0,
  //   marginBottom: offset ? -60 : 10,
  //   from: { top: 0, marginBottom: 10 },
  // });
  const AnimatedView = animated(View);
  return (
    <Spring
      from={{
        opacity: 0,
        top: "7%",
        left: "2.5%",
        height: "95%",
        left: "-5%",
      }}
      to={{ opacity: 1, top: "7%", left: "2.5%", height: "95%" }}
    >
      {(mainProps) => (
        <View style={mainProps}>
          {/* <AnimatedView style={scrollBar}> */}
          <TextInput style={styles.searchButton} placeholder="Search" />
          {/* </AnimatedView> */}
          <ScrollView
            onScrollBeginDrag={() => {
              setOffset("scrolled");
            }}
            onScrollToTop={() => {
              console.log("works");
            }}
          >
            <FlatList
              data={trainingPackets}
              renderItem={({ item }) => (
                <Link
                  onPress={() => {
                    props.getTrainingName(item.name);
                    window.removeEventListener;
                  }}
                  component={TouchableOpacity}
                  activeOpacity={0.5}
                  to="/exercises"
                >
                  <View style={styles.trainingPackets}>
                    <Image
                      style={styles.trainingPacketsBg}
                      source={{ uri: item.photo }}
                    />
                    <LinearGradient
                      // Background Linear Gradient

                      colors={["transparent", item.color]}
                      start={{ x: 0, y: 0.9 }}
                      end={{ x: 0, y: 1 }}
                      locations={[0, 1]}
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: 2500,
                      }}
                    />

                    <Text style={styles.trainingPacketsName}>{item.name}</Text>
                    <View style={styles.trainingPacketsAtributesContainer}>
                      <View style={styles.trainingPacketsAtributes}>
                        <Text style={styles.trainingPacketsAtributesName}>
                          Intensity
                        </Text>
                        <Text
                          style={styles.trainingPacketsAtributesValue}
                        ></Text>
                        <Image
                          style={
                            item.intensity > 0
                              ? styles.valueOrb
                              : styles.noValueOrb
                          }
                        />
                        <Image
                          style={
                            item.intensity > 1
                              ? styles.valueOrb
                              : styles.noValueOrb
                          }
                        />
                        <Image
                          style={
                            item.intensity > 2
                              ? styles.valueOrb
                              : styles.noValueOrb
                          }
                        />
                      </View>
                      <View style={styles.trainingPacketsAtributes}>
                        <Text style={styles.trainingPacketsAtributesName}>
                          Duration
                        </Text>

                        <Image
                          style={
                            item.duration > 0
                              ? styles.valueOrb
                              : styles.noValueOrb
                          }
                        />
                        <Image
                          style={
                            item.duration > 1
                              ? styles.valueOrb
                              : styles.noValueOrb
                          }
                        />
                        <Image
                          style={
                            item.duration > 2
                              ? styles.valueOrb
                              : styles.noValueOrb
                          }
                        />
                      </View>
                    </View>
                  </View>
                </Link>
              )}
            />
            <Text
              onPress={() => {
                console.log(offset);
              }}
              style={styles.noMoreCards}
            >
              No more workouts available right now. Stay tunned for more.
            </Text>
          </ScrollView>
        </View>
      )}
    </Spring>
  );
}

const styles = StyleSheet.create({
  trainingWidgets: {
    top: "7%",
    left: "2.5%",
    height: "95%",
  },
  trainingPackets: {
    backgroundColor: "#1D1D1D",
    width: Dimensions.get("window").width * 0.95,
    height: Dimensions.get("window").width * 0.95,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 12,
    overflow: "hidden",
  },
  searchButton: {
    backgroundColor: "#191919",
    width: "95%",
    height: 60,
    borderRadius: 12,
    padding: 20,
    paddingVertical: 10,
    fontSize: 20,
    marginBottom: 10,
    color: "#D2D2D2",
    fontFamily: "Poppins_400Regular",
  },
  trainingPacketsName: {
    color: "#D2D2D2",
    fontSize: 50,
    position: "absolute",
    bottom: "30%",
    left: "5%",
    fontFamily: "Poppins_800ExtraBold_Italic",
    lineHeight: 60,
  },
  trainingPacketsAtributes: {
    color: "#D2D2D2",
    flexDirection: "row",
  },
  trainingPacketsAtributesContainer: {
    position: "absolute",
    bottom: "20%",
    left: "2%",
    flexDirection: "row",
  },
  trainingPacketsAtributesName: {
    fontSize: 20,
    color: "#D2D2D2",
    marginRight: 10,
    marginLeft: 10,
    fontFamily: "Poppins_400Regular",
  },

  valueOrb: {
    width: 13,
    height: 13,
    borderRadius: 12,
    backgroundColor: "#D2D2D2",
    margin: 6,
    marginLeft: 2,
    marginRight: 2,
  },
  noValueOrb: {
    margin: 6,
    marginLeft: 2,
    marginRight: 2,
    width: 13,
    height: 13,
    borderRadius: 12,
    backgroundColor: "#D2D2D2",
    opacity: 0.5,
  },
  trainingPacketsBg: {
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

export default TrainingScreen;
