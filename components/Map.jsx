import React, { useEffect, useState } from 'react';
import { LeafletView }  from 'react-native-leaflet-view';
import { View, Text } from 'react-native';
import  userPosition from '../hooks/userPosition';

export default function Map() { 
  const position = userPosition(); 

if (!position) {
  return <Text>Getting location!</Text>; 
}

  return (
    <View style={{flex: 1}}>
      <LeafletView
        mapCenterPosition={{
          lat: position.lat, 
          lng: position.lng
          }}
        zoom ={13}
      />
    </View>
  );
}

