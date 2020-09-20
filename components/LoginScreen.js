import React, { Component } from "react";
import * as firebase from "firebase";
import { Text, View, StyleSheet, Image } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

export class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  signUpUser = (email, password) => {
    try {
      if (this.state.password.length < 6) {
        alert("Mooore");
        return;
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email.trim(), password.trim());
      }
    } catch (error) {
      console.log(error);
    }
  };
  logInUser = (email, password) => {
    try {
      firebase.auth().signInWithEmailAndPassword(email.trim(), password.trim());
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return (
      <View style={styles.loginScreenContainer}>
        <View style={styles.credZone}>
          <TextInput
            autoCapitalize="none"
            style={styles.credInput}
            placeholder="Email"
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            secureTextEntry={true}
            style={styles.credInput}
            placeholder="Password"
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity>
              <Text
                title="Sign up"
                onPress={() =>
                  this.signUpUser(this.state.email, this.state.password)
                }
                style={styles.signupButton}
              >
                Sign up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                title="Log in"
                onPress={() =>
                  this.logInUser(this.state.email, this.state.password)
                }
                style={styles.loginButton}
              >
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginScreenContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#282828",
  },
  credInput: {
    width: "90%",
    height: 70,
    backgroundColor: "#191919",
    margin: 10,
    borderRadius: 12,
    padding: 20,
    fontSize: 20,
    color: "#D2D2D2",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },

  loginButton: {
    width: 140,
    height: 60,
    backgroundColor: "#699A95",
    color: "#D2D2D2",
    borderRadius: 12,
    textAlign: "center",
    lineHeight: 75,
    fontSize: 25,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
  signupButton: {
    width: 140,
    height: 60,
    backgroundColor: "#cf8061",
    color: "#D2D2D2",
    borderRadius: 12,
    textAlign: "center",
    lineHeight: 75,
    fontSize: 25,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
  },
  logo: {
    resizeMode: "contain",
    height: 120,
    marginTop: 150,
  },
  credZone: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 100,
  },
});

export default LoginScreen;
