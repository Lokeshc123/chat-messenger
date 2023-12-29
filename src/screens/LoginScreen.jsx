import { Alert, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();
    const handleLogin = () => {
        const user = {
            email: email,
            password: password,
        }
        axios.post('http://192.168.18.10:3000/login', user).then((res) => {
            console.log(res.data);
            const token = res.data.token;
            AsyncStorage.setItem('authToken', token);
            Alert.alert('Success', 'Login Success')
            setEmail('')
            setPassword('')
            navigation.replace("Home")

        }).catch((err) => {
            console.log(err);
            Alert.alert('Error', 'Login Failed')
        })


    }

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                if (token) {
                    navigation.replace("Home")
                }
                else {

                }
            } catch (err) {
                console.log(err);
            }
        }
        checkLogin();
    }
        , []);
    return (

        <SafeAreaView style={styles.container}>

            <KeyboardAvoidingView>
                <View style={styles.inner}>
                    <Text style={styles.header1}>Sign In</Text>
                    <Text style={styles.header2} >Sign In to Your Account</Text>
                </View>
                <View style={styles.input}>
                    <View styles={styles.inputcontainer}>
                        <Text style={styles.text}>Email</Text>
                        <TextInput
                            placeholder="Email"
                            style={styles.textInput}
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                    </View>
                    <View styles={styles.inputcontainer}>
                        <Text style={styles.text}>Password</Text>
                        <TextInput
                            placeholder="Password"
                            style={styles.textInput}
                            secureTextEntry
                            value={password}
                            onChangeText={text => setPassword(text)}
                        />
                    </View>
                    <Pressable style={styles.btn} onPress={handleLogin}>
                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 20,
                            textAlign: 'center'
                        }}>Login</Text>
                    </Pressable>
                    <Pressable style={{ marginTop: 15 }} onPress={() => navigation.navigate("Register")} >
                        <Text>Don't have an account ? Sign Up</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>

        </SafeAreaView >
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
    },
    inner: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header1: {
        fontSize: 17,
        fontWeight: '600',
        color: '#4A55A2'
    },
    header2: {
        fontSize: 17,
        fontWeight: '600',
        marginTop: 15
    },
    text: {
        fontSize: 17,
        fontWeight: '600',
        marginTop: 15

    },
    input: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,

        width: 300,
        borderRadius: 10,
        padding: 10,
    },
    inputcontainer: {
        marginTop: 20,
    },
    btn: {
        backgroundColor: '#4A55A2',
        width: 200,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    }
})