import { View, Text, StyleSheet, Pressable, Linking } from "react-native";
import { supabase } from "../supabase";
import { userPosition } from "../hooks/userPosition";
import { useNavigation } from "@react-navigation/native";
import Map from "../components/Map";
import { useState } from "react";

export default function DashboardScreen({ route }) {
  const [savedSpot, setSavedSpot] = useState(null); 
  const userId = route?.params?.userId;
  const email = route?.params?.email;
  const position = userPosition();


  async function saveSpot() {
    alert("saveSpot Ran");

    if (!position) {
      console.log("No position yet");
      return;
    }
    try {
      console.log("running saveSpot", position);

      console.log("userId:", userId);
      console.log("email:", email);
      console.log("position:", position);

      const { error } = await supabase.from("savedlocation").insert([
        {
          username: email,
          user_id: userId,
          location: `SRID=4326;POINT(${position.lng} ${position.lat})`,
          updated: new Date().toISOString(), //from ChatGPT Codex
        },
      ]);

      if (error) {
      console.error(error);
      return; 
    }
    setSavedSpot(position) 
  } catch (err) {
      console.log(err);
    }
  }

  async function openAppleMaps() { // this openAppleMaps function is one that ChatGPT helped me develop 
    if (!savedSpot) return; 

    const url = `http://maps.apple.com/?daddr=${savedSpot.lat},${savedSpot.lng}&dirflg=w`

    try { 
      await Linking.openURL(url); 
    } catch (err) { 
        console.log("Apple Maps fail", err);
    }
  }

  return (
    // lines 26-38 are from Claude, they were handtyped and then copied from app.js to here.
    <View style={styles.container}>
      <Pressable
        style={[styles.saveButton, savedSpot && styles.mapButton]}
        onPress={savedSpot ? openAppleMaps : saveSpot }
        disabled={!position} // block of pressable from ChatGPT codex
      >
        <Text style={styles.saveButtonText}>
          {savedSpot ? "Map Back to My Spot!" : "Save My Spot!"}
        </Text>
      </Pressable>

      <View style={{ flex: 1 }}>
        <Map position={position} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 60 },

  saveButton: {
    backgroundColor: "#ef4523",
    alignItems: "center",
    padding: 10,
  },

  mapButton : { 
    backgroundColor: "black", 
  },

  saveButtonText: {
    color: "white",
  },
});
