import React, { useEffect, useState } from 'react';
import { LeafletView }  from 'react-native-leaflet-view';
import { View, Text, StyleSheet } from 'react-native';

export default function Map({position, markers = []}) {

  const defaultPosition = { 
    lat: 35.500613,
    lng: -80.842638, 
  }; 

const currentPositionMarker = position 
    ? [
      {
          position: {
            lat: position.lat, 
            lng: position.lng, 
          },
            icon: '📍', 
            size: [32, 32],
    },
  ]
  : []; 

const savedMarkers = markers.map((spot, index) => ({
    id: String(index), //this const SavedMarkers from Codex
    position: {
      lat: spot.lat, 
      lng: spot.lng, 
    },
      icon: '📍', 
      size: [32, 32],
}));

const allMarkers = [...currentPositionMarker, ...savedMarkers] // this line from Codex because I didn't know how to combine arrays 

const mapPosition = position || markers[0] || defaultPosition; 

  return (
    <View style={styles.container}>
      <LeafletView
        mapCenterPosition={{
          lat: mapPosition.lat, 
          lng: mapPosition.lng
          }}
        zoom ={20}
        mapLayers={[
          {
            baseLayer:true,
            url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          },
        ]}
        mapMarkers = {allMarkers}
      />
    </View>
  );
}


const styles = StyleSheet.create({

  container: { 
    flex: 1,  
  
  },
})

