// lines 2-58 from Claude, I asked it to walk me through creating this block by block and explain what the code blocks do. 
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { supabase } from './supabase' 
import * as Location from 'expo-location'

export default function App () { 
  const [spots, setSpots] = useState ([])
  const [position, setPosition] = useState(null)

    useEffect(() => { 
      async function loadSpots () { 
        const { data, error } = await supabase
        .from ('spots')
        .select('*')
        .eq('is_vacant', true)
        .limit(5)

        if (error) console.error(error)
          else setSpots(data)
          console.log(data)
      }
      loadSpots ()
    }, [])

   useEffect (() => {
    async function startGPS() { 
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') { 
        console.error('Location permission denied')
        return
      } 
      await Location.watchPositionAsync( 
        { accuracy: Location.Accuracy.High },
        (loc) => { 
          setPosition ({
            lat: loc.coords.latitude,
            lng: loc.coords.longitude
          })
        }
      )
    }
    startGPS()
}, [])

return (
  <View style ={styles.container}>
    <Text> My location: {position ? `${position.lat}, ${position.lng}` : 'Getting location...'} </Text>
    {spots.map(spot => (
      <Text key={spot.id}>{spot.lot_name} - Spot {spot.spot_num}</Text>
      ))}
  </View>
)
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 60}
})
