import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Login from './App/Screens/Login';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import SignInWithOAuth from './App/Components/SignInWithOAuth';
import Home from './App/Screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './App/Navigation/TabNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './App/Screens/LoginScreen';
import Register from './App/Screens/Register';
import { UserContext } from './UserContext';


const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <ClerkProvider publishableKey={"pk_test_Z29yZ2VvdXMtc3VuYmVhbS03LmNsZXJrLmFjY291bnRzLmRldiQ"}>
        <NavigationContainer>
          <SignedOut>
            <UserContext>
              <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} screenOptions={{ headerShown: false }} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} screenOptions={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} screenOptions={{ headerShown: false }} />
                <Stack.Screen name="TabNavigation" component={TabNavigation} screenOptions={{ headerShown: false }} />
              </Stack.Navigator>
            </UserContext>
          </SignedOut>
        </NavigationContainer>
        {/* CAN'T LOGIN */}
        <SignedIn>
          <NavigationContainer>
            <UserContext>
              <TabNavigation screenOptions={{ headerShown: false }} />
            </UserContext>
          </NavigationContainer>
        </SignedIn>
      </ClerkProvider >
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'

  },
});
