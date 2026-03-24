import Geofence from 'react-native-expo-geofence';

useEffect(() => { 
    if (!position || !spots.length) return 

    const startPoint = { 
        latitude: position.lat, 
        longitude: position.lng
    }
    const points = spots.map ( spot => ({
        latitude: spot.lat,
        longitude: spot.long,
        id: spot.id,
        spot_num: spot.spot_num 
    }))

    var result = Geofence.filterByProximity(startPoint, points, 0.015) //lines 17-27 from Claude 

    if (nearbySpots.length > 0 && DwellSeconds) { 
        console.log('Near spot ', nearbySpots[0])
        console.log('Distance:', nearbySpots[0].distanceInKM * 1000, 'meters')
        setNearbySpot(nearbySpots[0]) 
        } else { 
            setNearbySpot(null)
            setDwellSeconds(0) 
        }
    },[position])


