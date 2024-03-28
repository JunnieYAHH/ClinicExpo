import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const ClinicDoctorTab = () => {
    return (
        <View style={{ marginTop: 10 }}>
            <View style={{ display: 'flex', alignItems: 'center' }} >
                <TouchableOpacity>
                    <Text>Doctors</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default ClinicDoctorTab
