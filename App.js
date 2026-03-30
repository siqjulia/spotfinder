import { NavigationContainer } from '@react-navigation/native' //lines 1-14 from Claude
import { createStackNavigator } from '@react-navigation/stack'
import DashboardScreen from './screens/DashboardScreen'
import Login from './screens/Login'
import Register from './screens/Register'

const Stack = createStackNavigator()

export default function App() { 
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name='Dashboard' component={DashboardScreen} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}