import { View, Text, StyleSheet } from "react-native";
import { supabase } from "../supabase";
import { userPosition } from "../hooks/userPosition";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native"; 
import Map from "../components/Map";

export default function DashboardScreen({ route }) {
  const userId = route?.params?.userId;
  const email  = route?.params?.email;
  const position = userPosition();
  const navigation = useNavigation();
  // console.log("position:", position);
  // JULIA: WHY IS THIS FUNCTION RUNNING EVERY SECOND?

    async function saveSpot() {
      if (!position) { 
      console.log("No position yet")
      return; 
    }
      try {
      console.log("running saveSpot", position);
    
        const { error } = await supabase
          .from("savedlocation")
          .insert([
            {
            username: email,
            user_id: userId, 
            location: `SRID=4326;POINT(${position.lng} ${position.lat})`,
            updated: `now()`
          } 
        ]); 
        if (error) console.error(error);
      } catch (err) {
        console.log(err);
      }
    }

  return (
    // lines 26-38 are from Claude, they were handtyped and then copied from app.js to here.
    <View style={styles.container}>

          {/* <Pressable onPress={() => navigation.navigate("Login")}>
            <Text>Login</Text>
          </Pressable> */}
{/*       
      <Text>
        {" "}
        My location:{" "}
        {position
          ? `${position.lat}, ${position.lng}`
          : "Getting location..."}{" "}
      </Text> */}

      <Pressable 
        style={styles.saveButton} 
        onPress={saveSpot}
        disabled= {!position} // block of pressable from ChatGPT codex 
        > 

        <Text style={styles.saveButtonText}>Save My Location!</Text>
      </Pressable>    


     <View style={{flex: 1}}>
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

    saveButtonText: { 
      color: "white"
    }, 
    
});
