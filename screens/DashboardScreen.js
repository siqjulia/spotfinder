import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { supabase } from "../supabase";
import { userPosition } from "../hooks/userPosition";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native"; 

export default function DashboardScreen() {
  const position = userPosition();
  const navigation = useNavigation();
  console.log("position:", position);

  useEffect(() => {
    async function saveSpot() {
      console.log("running saveSpot", position);
      try {
        const { error } = await supabase
          .from("savedlocation")
          .update({
            user_id: user.id,
            username: user.email,
            location: `POINT(${position.lat} ${position.lng})`,
          })
    
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
      
      <Pressable onPress={() => navigation.navigate("Register")}>
            <Text>Register</Text>
          </Pressable>

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
