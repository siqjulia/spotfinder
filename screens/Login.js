import React from "react"
import { View, Text } from "react-native"; 
import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import Auth from '../components/Auth'
import { useNavigation } from '@react-navigation/native'

// copied from https://supabase.com/docs/guides/auth/quickstarts/react-native
function Login() {
    const navigation = useNavigation(); 
    const [claims, setClaims] = useState(null) // this line was typed from chatgpt because = useState<JwtPayload | null>(null) wasn't working
        useEffect(() => {
      supabase.auth.getClaims().then(({ data: { claims } }) => {
        setClaims(claims)
      })
      supabase.auth.onAuthStateChange(() => {
        supabase.auth.getClaims().then(({ data: { claims } }) => {
          setClaims(claims)

          if (claims) { 
            navigation.replace('Dashboard', {
              userID: claims.sub, 
              email: claims.email
            }) 
          }
        })
      })
    }, [])
    return (
      <View>
        <Auth />
        {claims && <Text>{claims.sub}</Text>}
      </View>
    )
  }
  
export default Login; 