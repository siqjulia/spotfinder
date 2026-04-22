import React, { useEffect, useState } from 'react';
import { LeafletView }  from 'react-native-leaflet-view';
import { View, Text } from 'react-native';

export default function Map({position}) { 

if (!position) {
  // return <Text>Getting location!</Text>; 
}

  return (
    <View style={{flex: 1}}>
      <LeafletView
        mapCenterPosition={{
          lat: position.lat, 
          lng: position.lng
          }}
        zoom ={20}
        mapLayers={[
          {
            baseLayer:true,
            url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          },
        ]}
        mapMarkers= {[
          {
          position: {
            lat: position.lat, 
            lng: position.lng, 
          },
            icon: '📍', 
            size: [32, 32],
          }
        ]}
      />
    </View>
  );
}

