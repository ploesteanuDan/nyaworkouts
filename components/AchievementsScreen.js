import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { Link } from "react-router-native";
import * as firebase from "firebase";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Spring } from "react-spring/renderprops";
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
  const dummy = {
    key: "2",
    name: "",
    photo: "https://picsum.photos/452",
    reason: "Achieved for completing 3 leg based sessions.",
  }
  const [item, setItem] = useState(dummy)
  return (
    <Spring
    from={{
      opacity: 0,
      top: "7%",
      left: "2.5%",
      height: "95%",
      left: "-5%",
    }}
    to={{ opacity: 1, top: "7%", left: "0%", height: "95%" }}
  >
    {(mainProps) => (
      <View style={mainProps}>
        <Text style={styles.title}>Achievements</Text>
        <Spring
                  from={{ 
                    opacity: 0,
                    
                   }}
                  to={{ 
                    position: "absolute",
                    opacity: item.name != "" ? 1 : 0,
                    width: item.name != "" ? Dimensions.get("window").width * 0.45 : 0,
                    height: item.name != "" ? Dimensions.get("window").width * 0.45 : 0,
                    width: "100%",
                    height: "110%",
                    zIndex: item.name != "" ? 9999 : 0,
                    backgroundColor: "black",  
                    top: item.name != "" ? "-10%" : "-200%"                
                    }}>
                  {popProps => 
                  <View style={popProps}>
                  <Link 
                    onPress={()=>{setItem(dummy)}}
                  >
                  <View>
                  <Image
                  style={styles.popupImage}
                  source={{uri: item.photo}}
                  />
                  <Text style={styles.achievementName}>{item.name}</Text>
                  <Text style={styles.achievementReason}>{item.reason}</Text>
                  </View>
                </Link>
                </View>
                }
                </Spring>
        <ScrollView>
          <FlatList
            numColumns={3}
            data={achievements}
            renderItem={({item})=>(
              <View style={styles.achievementPackets}>
                <Link
                  onPress={()=>{setItem(item)}}
                >
                  <Image
                  style={styles.achievementImage}
                  source={{uri: item.photo}}
                  />
                </Link>              
              </View>
            )}
          >

          </FlatList>
        </ScrollView>
      </View>)}
    </Spring>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 45,
    color: "#D2D2D2",
    margin: 20,
    fontFamily: "Poppins_800ExtraBold_Italic",
  },
  achievementPackets: {
    backgroundColor: "#1D1D1D",
    width: Dimensions.get("window").width * 0.3,
    height: Dimensions.get("window").width * 0.3,
    margin: Dimensions.get("window").width * 0.016,
    borderRadius: 12,
    overflow: "hidden",
  },
  achievementImage: {
    width: "100%",
    height: "100%",   
  },
  popupImage: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 0.9,
    margin: Dimensions.get("window").width * 0.05,
    borderRadius: 12,
    top: "20%"
  },
  achievementName: {
    top: "20%",
    color: "#D2D2D2",
    fontSize: 50,
    left: "5%",
    fontFamily: "Poppins_800ExtraBold_Italic",
    lineHeight: 60,
  },
  achievementReason: {
    top: "20%",
    fontSize: 20,
    color: "#D2D2D2",
    fontFamily: "Poppins_400Regular",
    left: "5%",
  }
})