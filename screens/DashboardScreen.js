import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { supabase } from "../supabase";
import { userPosition } from "../hooks/userPosition";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native"; 

export default function DashboardScreen() {
  const position = userPosition();
  const navigation = useNavigation();
  // console.log("position:", position);
  // JULIA: WHY IS THIS FUNCTION RUNNING EVERY SECOND?

  useEffect(() => {
    async function saveSpot() {
      try {
      console.log("running saveSpot", position);
      // console.log("user", user);
        const { error } = await supabase
          .from("savedlocation")
          .update({
            // username: "hello",
            location: `POINT(${position.lat} ${position.lng})`,
            updated: `now()`
          })
          .eq('id', 7)
    
        if (error) console.error(error);
      } catch (err) {
        console.log(err);
      }
    }
    saveSpot();
  }, []);

  return (
    // lines 26-38 are from Claude, they were handtyped and then copied from app.js to here.
    <View style={styles.container}>

          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text>Login</Text>
          </Pressable>
      
      <Text>
        {" "}
        My location:{" "}
        {position
          ? `${position.lat}, ${position.lng}`
          : "Getting location..."}{" "}
      </Text>
    </View>   
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 60 },
});
