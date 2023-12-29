import { Alert, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
const RegisterScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const navigation = useNavigation();
    const handleRegister = () => {
        const user = {
            name: name,
            email: email,
            password: password,
            image: image,
        }
        axios.post('http://192.168.18.10:3000/register', user).then((res) => {
            console.log(res.data);
            Alert.alert('Success', 'Register Success')
            setName('')
            setEmail('')
            setPassword('')
            setImage('')

        }).catch((err) => {
            console.log(err);
            Alert.alert('Error', 'Register Failed')
        })
    }
    return (

        <SafeAreaView style={styles.container}>

            <KeyboardAvoidingView>
                <View style={styles.inner}>
                    <Text style={styles.header1}>Sign Up</Text>
                    <Text style={styles.header2} >Register to Your Account</Text>
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
                        <Text style={styles.text}>Name</Text>
                        <TextInput
                            placeholder="Name"
                            style={styles.textInput}
                            value={name}
                            onChangeText={text => setName(text)}
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
                    <View styles={styles.inputcontainer}>
                        <Text style={styles.text}>Image</Text>
                        <TextInput
                            placeholder="Image"
                            style={styles.textInput}

                            value={image}
                            onChangeText={text => setImage(text)}
                        />
                    </View>
                    <Pressable style={styles.btn} onPress={handleRegister}>
                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 20,
                            textAlign: 'center'
                        }}>Register</Text>
                    </Pressable>
                    <Pressable style={{ marginTop: 15 }} onPress={() => navigation.goBack()} >
                        <Text>Already Have an Account ? Sign In</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>

        </SafeAreaView >
    )
}

export default RegisterScreen

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