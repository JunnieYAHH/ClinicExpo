import { View, Text, Image, Button } from 'react-native'
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons';
export default function Header() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useAuth();
  // console.log(user)

  if (!isLoaded || !isSignedIn) {
    return null
  }
  const imageUrl = user.externalAccounts[0].imageUrl;
  // const handleLogout = () => {
  //   AsyncStorage.clear()
  //     .then(() => {
  //       navigation.navigate('Login');
  //       console.log('AsyncStorage cleared successfully.');
  //     })
  //     .catch((error) => {
  //       console.error('Error clearing AsyncStorage:', error);
  //     });
  // }
  return (
    <>
      <View>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 7,
          alignItems: 'center'
        }}>
          <View style={{ flexDirection: 'row' }} >
            <Image source={{ uri: imageUrl }}
              style={{ width: 50, height: 50, flexDirection: 'column', borderRadius: 50 }} // Adjust the width and height as needed
              onError={(error) => console.error('Error loading image:', error)}
            />
            <View>
              <Text>Hello, 👋</Text>
              <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
              }}>
                {user.fullName}</Text>
            </View>
          </View>
          <Ionicons name="notifications-outline"
            size={28}
            color="black"
            style={{ flexDirection: 'column', marginLeft: 100 }} />
          <Button
            title='SignOut'
            onPress={()=> signOut()}
            style={{borderRadius:100}}
          />
        </View>
      </View>
    </>
  )
}