import { useEffect, useState } from "react";
import { View } from "react-native";
import { supabase } from "../supabase";
import Map from "../components/Map";

export default function AllSpots ({ route }) {
  const [savedSpots, setSavedSpot] = useState(null);
  const userId = route?.params?.userId;

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
        <Map markers={savedSpots} />
      </View>
    );
  }


     