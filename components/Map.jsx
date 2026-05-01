import React, { useEffect, useState } from 'react';
import { LeafletView }  from 'react-native-leaflet-view';
import { View, Text, StyleSheet } from 'react-native';

export default function Map({position}) {

  const defaultPosition = { 
    lat: 35.500613,
    lng: -80.842638, 
  }; 

const mapPosition = position || defaultPosition; 

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
        mapMarkers= {
        position
         ? [ // this ?[ logic taught to me by ChatGPT codex
          {
          position: {
            lat: position.lat, 
            lng: position.lng, 
          },
            icon: '📍', 
            size: [32, 32],
          },
          {
            position: {
              lat: position.lat + .001, //changes the lattitude slightly to move the pin, so you know there are two pins 
              lng: position.lng, 
            },
              icon: '📍', 
              size: [32, 32],
            },
        ] //populate saved locations from this array in a loop. select all from the table and populate the markers on the big map 
      : []
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({

  container: { 
    flex: 1,  
  
  },
})

