import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import Auth from './components/Auth'
import Account from './components/Accounts'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator()

export default function App() {
  const [userId, setUserId] = useState<string | null>(null)
  const [email, setEmail] = useState<string | undefined>(undefined)

  useEffect(() => {
    supabase.auth.getClaims().then(({ data: { claims } }) => {
      if (claims) {
        setUserId(claims.sub)
        setEmail(claims.email)
      }
    })

    supabase.auth.onAuthStateChange(async (_event, _session) => {
      const {
        data: { claims },
      } = await supabase.auth.getClaims()
      if (claims) {
        setUserId(claims.sub)
        setEmail(claims.email)
      } else {
        setUserId(null)
        setEmail(undefined)
      }
    })
  }, [])

  return ( 
      <NavigationContainer> 
          <Stack.Navigator>
            {userId ? (
              <>
              <Stack.Screen name="Dashboard" component={DashboardScreen} />
              <Stack.Screen name="Account"> 
                {() => <Account key={userId} userId={userId} email={email} />}
              </Stack.Screen>
              </>
            ) : (
              <Stack.Screen name="Login" component={Auth} />
            )}
          </Stack.Navigator>
          </NavigationContainer>
  )
}