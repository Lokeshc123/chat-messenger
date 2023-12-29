import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
const HomeScreen = () => {

    const navigation = useNavigation();

    useLayoutEffect(() => {

        navigation.setOptions({
            headerTitle: "",
            headerLeft: () => (
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Swift Chat</Text>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8

                }}>

                    <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
                    <MaterialIcons name="people-outline" size={24} color="black" />
                </View>

            )
        })
    }
        , []);
    return (
        <View>
            <Text>HomeScreen</Text>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})