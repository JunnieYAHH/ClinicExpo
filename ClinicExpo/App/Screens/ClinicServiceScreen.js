import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import PageHeader from '../Components/Shared/PageHeader';
import ClinicDoctorTab from '../Components/ClinicDoctorScreen/ClinicDoctorTab';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import baseURL from '../../assets/common/baseURL';

const ClinicServiceScreen = () => {
    const [doctors, setDoctors] = useState([]);
    const navigation = useNavigation();

    const param = useRoute().params;

    useEffect(() => {
        getAllDoctors();
    }, [param.serviceId]);

    const getAllDoctors = async () => {
        try {
            const response = await axios.get(`${baseURL}/doctors/get-doctors`, {
                params: {
                    serviceId: param.serviceId
                }
            });
            setDoctors(response.data.doctors);
        } catch (error) {
            console.error('Fetch All Doctors Error:', error);
        }
    };
    // console.log(doctors)

    return (
        <View style={{ padding: 20, marginTop: 20, backgroundColor: '#FAF9F6' }} >
            <PageHeader title={param.serviceName} />
            <ClinicDoctorTab />
            <View style={{ marginTop: 25 }}>
                {doctors.map((doctor) => {
                    return (
                        <View key={doctor._id} style={{ marginBottom: 10, padding: 15, backgroundColor: '#FFFFFF', borderRadius: 20 }}>
                            <View style={{ flexDirection: 'row', padding: 15 }}>
                                {doctor.image && doctor.image.length > 0 && (
                                    <Image
                                        source={{ uri: doctor.image[0].url }}
                                        style={{ width: 100, height: 125, borderRadius: 10 }}
                                    />
                                )}
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
                                    <Text style={{ marginTop: 8, color: 'gray' }} >{param.serviceName}</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('book-appointment-now', {
                                    doctorId: doctor._id,
                                    serviceId: param.serviceId
                                })}
                                style={{ backgroundColor: '#87CEEB', padding: 10, borderRadius: 60 }} >
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ color: 'blue', fontFamily: 'System', fontSize: 16 }}> Check Doctor </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

export default ClinicServiceScreen

const styles = StyleSheet.create({})