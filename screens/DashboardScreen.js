import { useEffect, useState } from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { supabase } from '../supabase'
import { userPosition } from '../hooks/userPosition'
 
export default function DashboardScreen () { 
    const [spots, setSpots] = useState([])
    const position = userPosition()
  
      useEffect(() => { // lines 11-38 are from Claude, they were handtyped and then copied from app.js to here. 
        async function loadSpots () { 
          const { data, error } = await supabase
          .from ('spots')
          .select('*')
          .eq('is_vacant', true) // this will only show the user what I edit as open in supabase rn 
  
  
          if (error) console.error(error)
            else setSpots(data)
            console.log(data)
        }
        loadSpots ()
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
  
