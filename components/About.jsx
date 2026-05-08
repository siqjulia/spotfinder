import React, { useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { Text } from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/about.png")} style={styles.logo} />
      <Text style={styles.text}>
        Spot Finder is an app I developed for Radical Software using React
        Native, Expo, and Leaflet Maps for React-Native. The app is designed to
        save your current location so you can map back to it when you are ready
        to return. For example, maybe you’re at a concert at a new stadium, and
        you want to remember where you parked your car. Spot Finder can help
        with that! After using Spot Finder a few times, you can visit the All
        Spots tab to look at all of the places you’ve been.</Text>
        
        
       
        
        <Text style={styles.text}>Spot Finder is not a radical idea, but it is radical in practice. Your location is stored in a private Supabase server and never sold. The app does not collect any other data about you, so there is no profit to be made. There are no annoying advertisements or links that try to make you leave the platform. And you choose when to save the location, rather than Apple Maps wrongly detecting where you’ve parked your car.</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    marginBottom: 100,
    alignSelf: "center",
    width: 275,
    height: 250,
  },

  container: {
    flex: 1,
    backgroundColor: "#6F7935",
    padding: 12,
  },

  text: { 
    marginTop: -190,
    lineHeight: 30,
    fontSize: 16,
    marginBottom: 170, 
    maxWidth: 720, 
    width: '100%',
    padding: 20,
    alignSelf: 'center',
  }, 
});
