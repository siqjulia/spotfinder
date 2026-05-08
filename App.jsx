import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import Auth from "./components/Auth";
import DashboardScreen from "./screens/DashboardScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllSpots from "./screens/AllSpots";
import About from "./components/About";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs({ userId, email }) {
  /* Tutorial used for tab bar: https://reactnavigation.org/docs/bottom-tab-navigator/ */
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        initialParams={{ userId, email }}
      />

      <Tab.Screen
        name="All Spots"
        component={AllSpots}
        initialParams={{ userId, email }}
      ></Tab.Screen>

<Tab.Screen
        name="About"
        component={About}
        initialParams={{ userId, email }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState(undefined);

  useEffect(() => {
    supabase.auth.getClaims().then(({ data: { claims } }) => {
      if (claims) {
        setUserId(claims.sub);
        setEmail(claims.email);
      }
    });

    supabase.auth.onAuthStateChange(async (_event, _session) => {
      const {
        data: { claims },
      } = await supabase.auth.getClaims();
      if (claims) {
        setUserId(claims.sub);
        setEmail(claims.email);
      } else {
        setUserId(null);
        setEmail(undefined);
      }
    });
  }, []);

  return (
    /* Used ChatGPT on Lines 58-64 to help with integrating into my existing code and syntax errors */
    <NavigationContainer>
      <Stack.Navigator>
        {userId ? (
          <Stack.Screen name="Main" options={{ headerShown: false }}>
            {() => <Tabs userId={userId} email={email} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login" component={Auth} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
