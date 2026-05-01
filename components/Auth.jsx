//copied from https://supabase.com/docs/guides/auth/quickstarts/react-native

import React, { useState } from 'react'
import { Alert, StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { supabase } from '../supabase'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) { 
      Alert.alert(error.message)  
  }
    setLoading(false)
 }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
          style={styles.input}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize="none"
          style={styles.input}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TouchableOpacity
          style={[styles.button, styles.buttonRed,loading && styles.buttonDisabled]}
          onPress={() => signInWithEmail()}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={[styles.button, styles.buttonBlack, loading && styles.buttonDisabled]}
          onPress={() => signUpWithEmail()}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1, 
    backgroundColor: '#6F7935',
    padding: 12,
  },

  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#FBF2C0',
    borderRadius: 4,
    padding: 15,
    fontSize: 16,
  },
  button: {
    borderRadius: 4,
    padding: 15, 
    margin: 4,
    alignItems: 'center',
    alignSelf: 'center',
    width: 250,
    display: 'inline',
  },

  buttonRed: { 
    backgroundColor: '#f23a2c',
  },

  buttonBlack: { 
    backgroundColor: '#1A1A1A',
  },

  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

    logo: { 
      marginTop: 50,
      alignSelf: 'center',
      width: 275, 
      height: 250, 
    },
})