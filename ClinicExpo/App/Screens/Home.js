import { View, Text, Button, SafeAreaView, Platform, ScrollView, Pressable, TextInput, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo';
import SearchBar from '../Components/Home/SearchBar';
import Header from '../Components/Home/Header';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import Slider from '../Components/Home/Slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import Categories from '../Components/Home/Categories';
import { UserType } from '../../UserContext';
import { jwtDecode } from 'jwt-decode';
import baseURL from '../../assets/common/baseURL';

export default function Home() {
    const { isLoaded, signOut } = useAuth();
    const [services, setServices] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const navigation = useNavigation();
    const { isSignedIn } = useUser();
    const { userId, setUserId } = useContext(UserType)
    console.log(currentUser)

    if (!isSignedIn) {
        useEffect(() => {
            const fetchUser = async () => {
                const token = await AsyncStorage.getItem("authToken")
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.userId
                setUserId(userId)
                fetchCurrentUser(userId);
            }
            fetchUser();
            fetchServices();
        }, []);
    }

    const fetchCurrentUser = async (userId) => {
        try {
            if (userId) {
                const response = await axios.get(`${baseURL}/users/get-current-user`, {
                    params: {
                        user_id: userId
                    }
                });
                const user = response.data.user
                setCurrentUser(user);
            }
        } catch (error) {
            console.error('Fetch Services Error:', error.message);
        }
    };

    const fetchServices = async () => {
        try {
            const response = await axios.get(`${baseURL}/services/get-services`);
            setServices(response.data.services);
        } catch (error) {
            console.error('Fetch Services Error:', error.message);
        }
    };

    const handleLogout = () => {
        setCurrentUser([]);
        AsyncStorage.clear()
            .then(() => {
                navigation.navigate('Login');
                console.log('AsyncStorage cleared successfully.');
            })
            .catch((error) => {
                console.error('Error clearing AsyncStorage:', error);
            });
    }
    // const imageUrl = currentUser.image;
    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 40 : 0, }} >
            {isSignedIn && <Header />}
            {isSignedIn === false && (
                <View>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 7,
                        alignItems: 'center'
                    }}>
                        <View style={{ flexDirection: 'row' }} >
                            {currentUser && currentUser.image && currentUser.image.length > 0 && (
                                <Image source={{ uri: currentUser.image[0].url }} style={{ width: 40, height: 40, borderRadius:20 }} />
                            )}
                            <View style={{ marginLeft: 5 }}>
                                <Text>Hello, 👋</Text>
                                {currentUser && (
                                    <>
                                        <Text style={{
                                            fontSize: 15,
                                            fontWeight: 'bold',
                                        }}>
                                            {currentUser.name}
                                        </Text>
                                    </>
                                )}
                            </View>
                        </View>
                        <Ionicons name="notifications-outline"
                            size={28}
                            color="black"
                            style={{ flexDirection: 'column', marginLeft: 165 }} />
                        <Button
                            title='SignOut'
                            onPress={handleLogout}
                            style={{ borderRadius: 100 }}
                        />
                    </View>
                </View>
            )}

            <View style={{ marginTop: 15, width: 350, marginLeft: 20, height: 40 }}>
                <Pressable size={22} style={{ padding: 10, flexDirection: "row", alignItems: 'center', marginHorizontal: 7, gap: 10, backgroundColor: 'white', borderRadius: 3, height: 40, flex: 1 }}>
                    <Ionicons name="search-outline" size={20} color="black" />
                    <TextInput placeholder='Search' />
                    <Feather name="mic" size={20} color="gray" style={{ marginLeft: 220 }} />
                </Pressable>
            </View>
            <Slider />
            <Categories />
        </SafeAreaView >
    )
}