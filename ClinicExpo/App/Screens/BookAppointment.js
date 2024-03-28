import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useUser } from '@clerk/clerk-expo';
import { UserType } from '../../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import PageHeader from '../Components/Shared/PageHeader';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import baseURL from '../../assets/common/baseURL';

const BookAppointment = () => {
    // console.log('setAppointment prop:', setAppointment);
    const navigation = useNavigation()
    const param = useRoute().params;
    const { isLoaded, isSignedIn, user } = useUser();
    const [currentUser, setCurrentUser] = useState([])
    const [currentGoogleId, setGoogleAuthId] = useState([])
    const [currentGoogleEmail, setGoogleAuthEmail] = useState([])
    const [service, setService] = useState([])
    const [doctor, setDoctor] = useState([])
    const { userId, setUserId } = useContext(UserType)

    // console.log(doctor._id)

    const [next7days, setNext7days] = useState([])
    const [selectedDate, setSelectedDate] = useState()
    const [timeList, setTimeList] = useState([])
    const [selectedTime, setSelectedTime] = useState()
    const [notes, setNotes] = useState()

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
                        // const response = await axios.get('http://192.168.137.190:8000/get-current-user', {
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
        fetchService();
        fetchDoctor();
        getDays()
        getTime()
    }, [userId]);

    const fetchService = async () => {
        try {
            const response = await axios.get(`${baseURL}/services/get-service-to-appoint`, {
                // const response = await axios.get('http://192.168.137.190:8000/get-service-to-appoint', {
                params: {
                    serviceId: param.serviceId
                }
            });
            setService(response.data.service);
        } catch (error) {
            console.error('Fetch Services Error:', error.message);
        }
    };

    const fetchDoctor = async () => {
        try {
            const response = await axios.get(`${baseURL}/doctors/get-doctor-to-appoint`, {
                params: {
                    doctorId: param.doctorId
                }
            });
            setDoctor(response.data.doctor);
        } catch (error) {
            console.error('Fetch Services Error:', error.message);
        }
    };

    const calculateAverageRating = (reviews) => {
        if (!reviews || reviews.length === 0) return 0;

        const totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0);
        return totalRating / reviews.length;
    };

    const averageRating = calculateAverageRating(doctor.review);

    const getDays = () => {
        const today = moment();
        const nextSevenDays = [];
        for (let i = 1; i < 8; i++) {
            const date = moment().add(i, 'days');
            nextSevenDays.push({
                date: date,
                day: date.format('ddd'),
                formmatedDate: date.format('Do MMM')
            })
        }
        setNext7days(nextSevenDays)
    }

    ///////////////////
    // GET THE Time //
    //////////////////
    const getTime = () => {
        const timeList = [];
        for (let i = 8; i <= 12; i++) {
            timeList.push({
                time: i + ':00 AM'
            })
            timeList.push({
                time: i + ':30 AM'
            })
        }
        for (let i = 1; i <= 7; i++) {
            timeList.push({
                time: i + ':00 PM'
            })
            timeList.push({
                time: i + ':30 PM'
            })
        }
        // console.log(timeList)
        setTimeList(timeList)
    }


    /////////////////////////////////////////////////////////////
    // CREATE AFTER A BOOK APPOINTMENT FOR GOOGLE AND APP USER //
    /////////////////////////////////////////////////////////////

    const bookAppointment = async () => {
        try {
            let data = {};
            if (user) {
                data = {
                    googleId: currentGoogleId,
                    googleEmail: currentGoogleEmail,
                    date: selectedDate,
                    time: selectedTime,
                    note: notes,
                    doctorId: doctor._id,
                    serviceId: service._id
                }
            } else {
                data = {
                    userId: userId,
                    email: currentUser.email,
                    date: selectedDate,
                    time: selectedTime,
                    note: notes,
                    doctorId: doctor._id,
                    serviceId: service._id
                }
            }
            const response = await axios.post(`${baseURL}/appointments/create-doctor-appointment`, data);
            navigation.navigate('Appointment')
        } catch (error) {
            console.error('Create Appointment:', error.message);
        }
    }



    return (
        <ScrollView>
            <View style={{ padding: 15, marginTop: 30 }}>
                <PageHeader title={'Book Appointment'} />
                <View>
                    {doctor && doctor.image && doctor.image.length > 0 && (
                        <>
                            <View key={doctor._id} style={{ marginBottom: 10, padding: 7, backgroundColor: '#FFFFFF', borderRadius: 20 }}>
                                <View style={{ flexDirection: 'row', padding: 15 }}>
                                    <Image
                                        source={{ uri: doctor.image[0].url }}
                                        style={{ width: 125, height: 150, borderRadius: 100 }}
                                    />
                                    <View style={{ padding: 10 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#87CEEB', padding: 5, borderRadius: 10, width: 140 }} >
                                            <MaterialCommunityIcons name="check-decagram" size={10} color="blue" />
                                            <Text style={{ color: 'blue' }} > Proffesional Doctor</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', marginTop: 5 }} >
                                            <Text style={{ fontSize: 17 }} >Dr. {doctor.name}</Text>
                                            {doctor.gender === 'male' ? (
                                                <Ionicons name="male" size={15} style={{ marginLeft: 5 }} color="blue" />
                                            ) : doctor.gender === 'female' ? (
                                                <Ionicons name="female" size={15} style={{ marginLeft: 5 }} color="#FF00FF" />
                                            ) : null}
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                                            <MaterialCommunityIcons name="email-fast" size={12} color="black" />
                                            <Text style={{ marginLeft: 5 }}>{doctor.email}</Text>
                                        </View>
                                        <View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                                {service.image && service.image.length > 0 && (
                                                    <Image source={{ uri: service.image[0].url }} style={{ width: 30, height: 30 }} />
                                                )}
                                                <Text>{service.name}</Text>
                                            </View>
                                        </View>
                                        <Text style={{ marginTop: 8, color: 'gray' }} >{param.serviceName}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
                                            {[1, 2, 3, 4, 5].map((star, index) => (
                                                <View key={index}>
                                                    <MaterialCommunityIcons
                                                        key={index}
                                                        name={star <= calculateAverageRating(doctor.review) ? 'star' : 'star-outline'}
                                                        size={20}
                                                        color="#FFD700"
                                                    />
                                                </View>
                                            ))}
                                            <Text style={{ fontWeight: 'bold' }}>{averageRating.toFixed(1)}</Text>
                                            <Text style={{ marginLeft: 10 }}>||</Text>
                                            <Text style={{ marginLeft: 10 }}>{doctor.review.length} reviews</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </>
                    )}
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ color: 'gray' }}>Booking Section</Text>
                    <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 19, fontWeight: 'bold' }}>Day</Text>
                    </View>
                    <FlatList
                        data={next7days}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={[styles.dayButton, selectedDate == item.date ? { backgroundColor: '#007FFF' } : null]}
                                onPress={() => setSelectedDate(item.date)}
                            >
                                <Text style={[{ color: 'black' }, selectedDate == item.date ? { color: '#FFFFFF' } : null]}>{item.day}</Text>
                                <Text style={[{ fontSize: 16 }, selectedDate == item.date ? { color: '#FFFFFF' } : null]}>{item.formmatedDate}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 19, fontWeight: 'bold' }}>Time</Text>
                    </View>
                    <FlatList
                        data={timeList}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={[styles.dayButton, { paddingVertical: 13 }, selectedTime == item.time ? { backgroundColor: '#007FFF' } : null]}
                                onPress={() => setSelectedTime(item.time)}
                            >
                                <Text style={[{ fontSize: 16 }, selectedTime == item.time ? { color: '#FFFFFF' } : null]}>{item.time}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 19, fontWeight: 'bold' }}>Note</Text>
                    </View>
                    <KeyboardAvoidingView>
                        <TextInput
                            numberOfLines={3}
                            onChangeText={(value) => setNotes(value)}
                            style={{ backgroundColor: '#E5E4E2', padding: 5, borderRadius: 10, color: 'gray', paddingVertical: 5, marginTop: 10 }}
                        />
                    </KeyboardAvoidingView>
                    <TouchableOpacity
                        onPress={() => bookAppointment()}
                        style={{ backgroundColor: 'blue', padding: 10, borderRadius: 60, marginTop: 20, paddingVertical: 20 }} >
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontFamily: 'System', fontSize: 16 }}> Appoint to this Doctor </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default BookAppointment

const styles = StyleSheet.create({
    dayButton: {
        borderWidth: 1,
        borderRadius: 99,
        padding: 5,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginRight: 10,
        marginTop: 15,
        color: 'gray'
    }
})