import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesome6 } from '@expo/vector-icons';
import Colors from '../../assets/Shared/Colors';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import moment from 'moment';
import baseURL from '../../assets/common/baseURL';

const AppointmentsCard = ({ appointment }) => {

    const [service, setService] = useState([])
    const [doctor, setDoctor] = useState([])

    // console.log(service)
    // console.log(doctor)

    useEffect(() => {
        fetchService();
        fetchDoctor();
    }, [doctor, service]);

    const fetchService = async () => {
        try {
            const response = await axios.get(`${baseURL}/services/get-service-to-appoint`, {
                // const response = await axios.get('http://192.168.137.190:8000/get-service-to-appoint', {
                params: {
                    serviceId: appointment.service
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
                // const response = await axios.get('http://192.168.137.190:8000/get-doctor-to-appoint', {
                params: {
                    doctorId: appointment.doctor
                }
            });
            setDoctor(response.data.doctor);
        } catch (error) {
            console.error('Fetch Services Error:', error.message);
        }
    };
    return (
        <View style={{ borderWidth: 1,  padding: 10, marginBottom: 10, borderRadius: 12 ,borderColor:Colors.LIGHT_GRAY,backgroundColor:Colors.white, marginTop: 15}}>
            <Text style={{ fontWeight: 'bold', fontSize:18, fontFamily: 'sans-serif' }}>{moment(appointment.date).format('MMM Do, YYYY')} - {appointment.time}</Text>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10, alignItems: 'center'
            }}>
                {doctor && doctor.image && doctor.image.length > 0 && (
                    <Image
                        source={{ uri: doctor.image[0].url }}
                        style={{ width: 90, height: 100, borderRadius: 10 }}
                    />)}

                <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'sans-serif' }}>{service.name}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                        <FontAwesome6 name="user-doctor" size={17} color="blue" />
                        <Text style={{ fontSize: 15, fontFamily: 'sans-serif' }}>{doctor.name}</Text>
                    
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', gap: 3, alignItems: 'center' , marginTop:5}}>
                        <FontAwesome5 name="file-medical-alt" size={17} color="blue" />
                        <Text style={{ fontSize: 15, fontFamily: 'sans-serif'}}>Id: #{appointment.service}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center',marginTop:5 }}>
                       <Ionicons name="document-text" size={17} color="blue" />
                        <Text style={{ fontWeight: 'bold', fontFamily: 'sans-serif'}}>Status: {appointment.status}</Text>
                    </View>
                </View>
            </View>


        </View>


    );
};

export default AppointmentsCard;
