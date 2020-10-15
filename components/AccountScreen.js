import React, { Component, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import * as firebase from "firebase";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useSpring, animated, config } from "react-spring";

// SPRING ANIMATIONS

const AnimatedView = animated(View);
// -----------------------------
// FIREBASE

// -----------------------------

export default class AccountScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: false,
      userData: null
    };
  }

  updateName() {
    let user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: this.state.userName,
    });
    firebase
      .firestore()
      .collection("Users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        userName: this.state.userName,
      });
  }

async componentDidMount() {
    await firebase.firestore().collection("Users").where("userEmail","==",firebase.auth().currentUser.email).get().then(
      (snapshot) => {
        const user = []
        snapshot.forEach(
          doc => {
            const userData = doc.data()
            user.push(userData)
          }
        )
        this.setState({userData: user[0]})
      }
    )

    this.setState({
        userName: this.state.userData.userName,
        userAchievements: this.state.userData.userAchievements, 
        userNotificationsPrefference: this.state.userData.userNotificationsPrefference ? "On" : "Off"
  })
  }

  render() {
    return (
      <AnimatedView>
        <View style={styles.AccountScreenContainer}>
          <Text style={styles.title}>Account</Text>
          <View style={styles.infoContainer}>
            <View>
              <Text style={styles.infoTitle}>Email</Text>
              <Text style={styles.infoText}>
                {firebase.auth().currentUser.email}
              </Text>
            </View>
            <View>
              <Text style={styles.infoTitle}>Name</Text>
              <Text
                onPress={() => {
                  this.setState({ toggle: !this.state.toggle });
                }}
                style={[styles.infoTitle, { right: 10, position: "absolute" }]}
              >
                Edit
              </Text>
              <Text style={styles.infoText}>{this.state.userName}</Text>
            </View>
            <View>
              <Text style={styles.infoTitle}>Achievements</Text>
              <Text style={styles.infoText}>{this.state.userAchievements}</Text>
            </View>
            <View>
              <Text style={styles.infoTitle}>Notifications</Text>
              <Text style={styles.infoText}>{this.state.userNotificationsPrefference}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Text
              style={styles.signOutButton}
              onPress={() => {
                firebase.auth().signOut();
              }}
            >
              Sign out
            </Text>
          </TouchableOpacity>
        </View>
        <View
          pointerEvents={this.state.toggle ? "auto" : "none"}
          style={[styles.blurBg, { opacity: this.state.toggle ? 0.6 : 0 }]}
        ></View>
        <View
          pointerEvents={this.state.toggle ? "auto" : "none"}
          style={[
            styles.editYourNameContainer,
            { opacity: this.state.toggle ? 1 : 0 },
          ]}
        >
          <TextInput
            style={styles.editYourName}
            placeholder="Edit your name"
            value={this.state.userName}
            onChangeText={(userName) => this.setState({ userName: userName })}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <Text
              onPress={() => {
                this.setState({ toggle: !this.state.toggle });
              }}
              style={styles.doneButton}
            >
              Cancel
            </Text>
            <Text
              onPress={() => {
                this.setState({ toggle: !this.state.toggle });
                this.updateName();
              }}
              style={styles.doneButton}
            >
              Done
            </Text>
          </View>
          <Text
            style={{
              color: "#D2D2D2",
              justifyContent: "center",
              margin: 35,
              fontFamily: "Poppins_400Regular",
            }}
          >
            Changes will take effect when you visit the Account page again.
          </Text>
        </View>
      </AnimatedView>
    );
  }
}

const styles = StyleSheet.create({
  AccountScreenContainer: {
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
    height: 340,
    alignSelf: "center",
    borderRadius: 12,
  },
  signOutButton: {
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
  infoText: {
    fontSize: 20,
    color: "#D2D2D2",
    fontFamily: "Poppins_400Regular",
    marginHorizontal: 0,
    borderBottomColor: "#282828",
    borderBottomWidth: 1,
    width: "100%",
    paddingBottom: 20,
    paddingLeft: 30,
  },
  infoTitle: {
    padding: 20,
    fontSize: 15,
    color: "#D2D2D2",
    paddingLeft: 30,
    paddingBottom: 0,
    fontFamily: "Poppins_600SemiBold_Italic",
  },
  editYourName: {
    position: "absolute",
    fontSize: 20,
    color: "#D2D2D2",
    fontFamily: "Poppins_400Regular",
    backgroundColor: "black",
    padding: 10,
    paddingHorizontal: 20,
    top: 50,
    width: "80%",
    left: "10%",
    borderRadius: 10,
    height: 55,
  },
  doneButton: {
    alignSelf: "center",
    width: 100,
    height: 50,

    backgroundColor: "black",
    color: "#D2D2D2",
    borderRadius: 12,
    textAlign: "center",
    lineHeight: 65,
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    marginTop: 120,
  },
  editYourNameContainer: {
    backgroundColor: "red",
    width: "80%",
    left: "10%",
    position: "absolute",
    height: "40%",
    borderRadius: 12,
    backgroundColor: "#191919",
    opacity: 1,
    top: "25%",
  },
  blurBg: {
    backgroundColor: "black",
    opacity: 0.6,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
});
