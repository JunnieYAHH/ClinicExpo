import { FlatList, Image, StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'

const Slider = () => {
    const sliderList = [
        {
            id: 1,
            name: 'Slider1',
            imageUrl: 'https://res.cloudinary.com/ds7jufrxl/image/upload/v1711211523/Clinic/slider/mnnupxkmbetbk2bpcsfx.png'
        },
        {
            id: 2,
            name: 'Slider2',
            imageUrl: 'https://res.cloudinary.com/ds7jufrxl/image/upload/v1711211517/Clinic/slider/lxsam6ysokt9fpxna6u4.jpg'
        }
    ]
    return (
        <View style={{ marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
                data={sliderList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Image
                        source={{ uri: item.imageUrl }}
                        style={{ width: 390, height: 170, borderRadius: 10, margin: 2 }}
                    />
                )}
            />

        </View>
    )
}

export default Slider

const styles = StyleSheet.create({})