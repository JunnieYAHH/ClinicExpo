import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useUser } from '@clerk/clerk-expo';
import { UserType } from '../../UserContext';
import axios from 'axios';
import PageHeader from '../Components/Shared/PageHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import AppointmentsCard from './AppointmentsCard';
import BookAppointment from './BookAppointment';
import baseURL from '../../assets/common/baseURL';

export default function Appointment() {

  const param = useRoute().params;
  const navigation = useNavigation()
  const { isLoaded, isSignedIn, user } = useUser();
  const [currentUser, setCurrentUser] = useState([])
  const [currentGoogleId, setGoogleAuthId] = useState([])
  const [currentGoogleEmail, setGoogleAuthEmail] = useState([])
  const [service, setService] = useState([])
  const [doctor, setDoctor] = useState([])
  const { userId, setUserId } = useContext(UserType)
  const [appointment, setAppointment] = useState([])


  useEffect(() => {
    if (user) {
      setGoogleAuthId(user.id);
      setGoogleAuthEmail(user.primaryEmailAddress.emailAddress);
    }
  }, [user, currentGoogleId]);

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const token = await AsyncStorage.getItem("authToken")
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId
          setUserId(userId)
          const response = await axios.get(`${baseURL}/users/get-current-user`, {
            params: {
              user_id: userId
            }
          });
          setCurrentUser(response.data.user);
        } catch (error) {
          console.error('Fetch User Error:', error.message);
        }
      }
      fetchUser();
    }
  }, [userId]);

  useEffect(() => {
    getUserAppointment()
  }, [userId, currentGoogleId])

  const getUserAppointment = async () => {
    try {
      let user;
      if (userId) {
        user = userId;
      } else {
        user = currentGoogleId;
      }
      const result = await axios.get(`${baseURL}/appointments/get-user-appointment`, {
        params: {
          user: user
        }
      });

      setAppointment(result.data.appointment)

    } catch (error) {
      console.log('Error in Getting User Appointment', error.message);
    }
  };

  return (
    <View style={{ padding: 10, marginTop: 40 }}>
      <PageHeader title={'Account Appointment'} />
      
      <FlatList
        data={appointment}
        renderItem={({ item }) => (
          <AppointmentsCard appointment={item} />
        )}
      />
    </View >
  )
}