import { useState, useEffect } from 'react'
import * as Location from 'expo-location'

export function userPosition () { //entire function from Claude
    const [position, setPosition] = useState(null)   
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
    return position
}

     