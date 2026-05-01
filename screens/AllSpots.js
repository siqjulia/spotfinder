import { useEffect, useState } from "react";
import { View } from "react-native";
import { supabase } from "../supabase";
import Map from "../components/Map";
import { userPosition } from "../hooks/userPosition";

export default function AllSpots ({ route }) {
  const [savedSpots, setSavedSpot] = useState([]);
  const userId = route?.params?.userId;
  const position = userPosition(); 

  useEffect (() => {
    async function loadAllSpots() { 
      if (!userId) return; 

      const { data, error } = await supabase
          .from("savedlocation")
          .select("lat, lng, updated")
      
      if (error) {
        console.error(error);
        return; 

        } 
        setSavedSpot(data);
      }
      loadAllSpots();
    }, [userId]);

    return ( 
      <View style={{ flex: 1 }}>
        <Map position = {position} markers={savedSpots} />
      </View>
    );
  }


     