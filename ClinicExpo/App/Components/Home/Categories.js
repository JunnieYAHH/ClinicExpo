import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Colors from '../../../assets/Shared/Colors';
import baseURL from '../../../assets/common/baseURL';

const Categories = () => {
  const [services, setServices] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${baseURL}/services/get-services`);
      setServices(response.data.services);
    } catch (error) {
      console.error('Fetch Services Error:', error);
    }
  };

  return (
    <View style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontFamily: 'System' }}>Clinic Specialty</Text>
        <Text style={{ fontFamily: 'System', color: Colors.PRIMARY }}>See all</Text>
      </View>
      <FlatList
        data={services}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate('clinic-service-screen', {
                serviceId: item._id,
                serviceName: item.name
              })}
              style={{ alignItems: 'center', marginLeft: 22 }}
            >
              <View key={item._id} style={{ padding: 15, borderRadius: 99, alignItems: 'center' }}>
                <Image source={{ uri: item.image[0].url }} style={{ width: 30, height: 30 }} />
              </View>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          </>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

export default Categories;
