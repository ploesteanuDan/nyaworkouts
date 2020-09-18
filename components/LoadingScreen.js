import React, { Component } from "react";
import firebase from "firebase";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";

class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }
  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(
      function (user) {
        if (user) {
          this.props.navigation.navigate("DashboardScreen");
        } else {
          this.props.navigation.navigate("LoginScreen");
        }
      }.bind(this)
    );
  };

  render() {
    return (
      <View style={styles.loadingScreenContainer}>
        <Text> Loading </Text>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingScreenContainer: {
    flex: 1,
    backgroundColor: "#282828",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoadingScreen;
