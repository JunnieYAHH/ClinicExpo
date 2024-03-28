import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Button, Dimensions, Text, TouchableOpacity } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import Colors from "../../assets/Shared/Colors";


WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ marginTop: 10, marginLeft:225 }}> 
      <Text style={{ fontWeight: '500', color: '#007FFF', textAlign: 'center' }}>Login with Google!</Text>
    </TouchableOpacity>
  );
}
export default SignInWithOAuth;