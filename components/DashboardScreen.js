import React, { Component } from "react";
import * as firebase from "firebase";
import { Text, View, StyleSheet, Button, Modal } from "react-native";
import Navbar from "./navbar";
import AccountScreen from "./AccountScreen";
import AchievementsScreen from "./AchievementsScreen";
import TrainingScreen from "./TrainingScreen";
import HydrationScreen from "./HydrationScreen";
import { NativeRouter, Switch, Route } from "react-router-native";
import ExercisesScreen from "./ExercisesScreen";
import { set } from "react-native-reanimated";

export class DashboardScreen extends Component {
  state = {
    trainingName: "none",
    isToggled: true,
  };
  handleSignOut = () => {
    firebase.auth().signOut();
  };

  getTrainingName(trainingName) {
    this.setState({
      trainingName: trainingName,
      isToggled: trainingName === "none" ? true : false,
    });
  }

  render() {
    return (
      <View style={styles.dashboardScreenContainer}>
        <NativeRouter>
          <View>
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <TrainingScreen
                    {...props}
                    getTrainingName={this.getTrainingName.bind(this)}
                  />
                )}
              />
              <Route path="/account" component={AccountScreen} />
              <Route path="/achievements" component={AchievementsScreen} />{" "}
              <Route path="/hydration" component={HydrationScreen} />
              <Route
                path="/exercises"
                render={(props) => (
                  <ExercisesScreen
                    id="ex"
                    {...props}
                    trainingName={this.state.trainingName}
                    getTrainingName={this.getTrainingName.bind(this)}
                  />
                )}
              />
            </Switch>
            <Navbar
              isToggled={this.state.isToggled}
              style={styles.navbarContainer}
            />
          </View>
        </NativeRouter>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dashboardScreenContainer: {
    backgroundColor: "#1D1D1D",
    flex: 1,
  },
  navbarContainer: {
    position: "absolute",
  },
});

export default DashboardScreen;
