import React, { useEffect, useState } from 'react';
import { LeafletView }  from 'react-native-leaflet-view';
import { View, Text } from 'react-native';

export default function Map({position}) {

  const defaultPosition = { 
    lat: 35.500613,
    lng: -80.842638, 
  }; 

const mapPosition = position || defaultPosition; 

  return (
    <View style={{flex: 1}}>
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
        ]
      : []
        }
      />
    </View>
  );
}

