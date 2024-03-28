import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, Image, TextInput, Pressable, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import walls from './../../assets/images/walls.gif';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import { Entypo } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/FontAwesome"
import mime from "mime";
import * as ImagePicker from "expo-image-picker"
import * as Location from 'expo-location';
import axios from 'axios';
import FormContainer from '../Components/Shared/FormContainer';
import baseURL from '../../assets/common/baseURL';

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [launchCam, setLaunchCam] = useState(false)
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const navigation = useNavigation();

    const takePhoto = async () => {
        setLaunchCam(true)

        const c = await ImagePicker.requestCameraPermissionsAsync();

        if (c.status === "granted") {
            let result = await ImagePicker.launchCameraAsync({
                aspect: [4, 3],
                quality: 1,
            });
            // console.log(result)
            if (!result.canceled) {
                // console.log(result.assets)
                setMainImage(result.assets[0].uri);
                setImage(result.assets[0].uri);
                setLaunchCam(false)

            }
        }
    };
    const handleRegister = () => {
        if (email === "" || name === "" || phone === "" || password === "") {
            setError("Please fill in the form correctly");
        }

        let formData = new FormData();
        const newImageUri = "file:///" + image.split("file:/").join("");


        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("phone", phone);
        formData.append("isAdmin", false);
        formData.append("image", {
            uri: newImageUri,
            type: mime.getType(newImageUri),
            name: newImageUri.split("/").pop()
        });
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",

            }
        }

        axios.post(`${baseURL}/users/register`, formData, config)
            .then((response) => {
                console.log(response);
                Alert.alert("Registered Successfully");
                navigation.navigate('LoginScreen')

            })
            .catch((error) => {
                console.error("Registration Error", error);
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Error", error.message);
                }
                Alert.alert('Error in Registration', 'Cannot Register');
            });
    }

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();

    }, []);


    return (
        <ScrollView>
            <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
                {/* <View style={{ marginTop: 5 }}>
                    <Image source={walls} style={{ width: 500, height: 500 }} />
                </View> */}
                <KeyboardAvoidingView>
                    <FormContainer title={"Register"}>
                        {launchCam ?
                            <>
                                <TouchableOpacity style={styles.cameraContainer}>
                                    <Camera
                                        ref={ref => setCamera(ref)}
                                        style={styles.fixedRatio}
                                        type={type}
                                        ratio={'1:1'} />

                                </TouchableOpacity>
                                <TouchableOpacity
                                    variant={"ghost"}
                                    onPress={() => takePhoto()}><Text> add photo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    variant={"ghost"}
                                    onPress={() => {
                                        setType(
                                            type === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back
                                        );
                                    }}><Text>flip camera</Text>
                                </TouchableOpacity>
                            </>
                            : null}

                        <View style={styles.imageContainer}>
                            {mainImage ? (
                                <Image style={styles.image} source={{ uri: mainImage }} />
                            ) : (
                                <Image style={styles.image} source={require('../../assets/favicon.png')} />
                            )}
                            <TouchableOpacity
                                onPress={takePhoto}
                                style={styles.imagePicker}>
                                <Icon style={{ color: "white" }} name="camera" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#D0D0D0', paddingVertical: 5, borderRadius: 5, marginTop: 5 }}>
                                <Ionicons name="person-sharp" size={24} color="black" style={{ marginLeft: 10 }} />
                                <TextInput
                                    value={name}
                                    onChangeText={(text) => setName(text)}
                                    style={{ fontSize: name ? 12 : 12, color: 'gray', marginVertical: 5, width: 300 }}
                                    placeholder='Enter Your name' />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#D0D0D0', paddingVertical: 5, borderRadius: 5, marginTop: 10 }}>
                                <MaterialIcons name="email" size={24} color="black" style={{ marginLeft: 10 }} />
                                <TextInput
                                    value={email}
                                    onChangeText={(text) => setEmail(text)}
                                    style={{ fontSize: email ? 12 : 12, color: 'gray', marginVertical: 5, width: 300 }}
                                    placeholder='Enter Your Email' />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#D0D0D0', paddingVertical: 5, borderRadius: 5, marginTop: 5 }}>
                                <Entypo name="phone" size={24} color="black" style={{ marginLeft: 10 }} />
                                <TextInput
                                    value={phone}
                                    onChangeText={(text) => setPhone(text)}
                                    style={{ fontSize: name ? 12 : 12, color: 'gray', marginVertical: 5, width: 300 }}
                                    placeholder='Enter Your Phone NUmber' />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#D0D0D0', paddingVertical: 5, borderRadius: 5, marginTop: 10 }}>
                                <FontAwesome name="lock" size={24} color="black" style={{ marginLeft: 17 }} />
                                <TextInput
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                    secureTextEntry={true}
                                    style={{ fontSize: password ? 12 : 12, color: 'gray', marginVertical: 5, width: 300 }}
                                    placeholder='Enter Your Password' />
                            </View>
                        </View>
                        <Pressable
                            onPress={handleRegister}
                            style={{ width: 200, backgroundColor: '#FEBE10', borderRadius: 6, justifyContent: 'center', padding: 15, marginTop: 10 }}>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                                Register
                            </Text>
                        </Pressable>

                        <Pressable onPress={() => navigation.navigate('LoginScreen')} style={{ marginTop: 10 }}>
                            <Text style={{ textAlign: 'center' }}>
                                Have an account? Sign In
                            </Text>
                        </Pressable>

                        <View style={{ marginTop: 50, color: 'gray', fontSize: 16 }} />
                    </FormContainer>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ScrollView>
    )
}

export default Register

const styles = StyleSheet.create({
    imageContainer: {
        width: 200,
        height: 200,
        borderStyle: "solid",
        borderWidth: 8,
        padding: 0,
        justifyContent: "center",
        borderRadius: 100,
        borderColor: "#E0E0E0",
        elevation: 10
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 100
    },
    imagePicker: {
        position: "absolute",
        right: 5,
        bottom: 5,
        backgroundColor: "grey",
        padding: 8,
        borderRadius: 100,
        elevation: 20
    },
    cameraContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    }
});