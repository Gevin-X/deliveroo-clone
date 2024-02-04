import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {  useSelector } from 'react-redux'
import { selectRestaurant } from '../features/restaurantSlice'
import { XCircleIcon } from "react-native-heroicons/solid";
import * as Progress from 'react-native-progress';
import MapView,{Marker} from 'react-native-maps';




const DeliveryScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
  return (
    <View className="bg-[#00CCBB] flex-1">
      <SafeAreaView className="z-50">

        {/* Basi Backgroud and items */}
        <View className="flex-row justify-between items-center p-5">
            <TouchableOpacity onPress={()=>navigation.navigate("Home")}>
                <XCircleIcon color="white" size={30} />
            </TouchableOpacity>
            <Text className="font-light text-white text-lg">Oder Help</Text>
        </View>


        {/* White Box with detailes */}
        <View className="bg-white mx-2 my-4 rounded-md p-6 z-50 shadow-md">
            <View className="flex-row justify-between">
                <View>
                    <Text className="text-lg text-gray-400 ">Estimated Arrival</Text>
                    <Text className=" text-4xl font-bold">45-55 Minutes</Text>
                </View>
                <Image
                    source={{
                        uri:"https://imgs.search.brave.com/h9aahuDqS81EVnZ4RuK_QCY1x6f50T_qwa-61LOfEcA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTEyOC10/aHVtYi9iaWN5Y2xl/LXJpZGVyLTQ1Mjc1/MTItMzc4MjM5NC5w/bmc",
                    }}
                    className="h-20 w-20"
                />         
            </View>

            <Progress.Bar size={30} color='#00CCBB' indeterminate={true} />
            
            <Text className="mt-3 text-gray-500">
                Your oder at {restaurant.title} is being prepared 
            </Text>
        </View>
      </SafeAreaView>

        <MapView
            initialRegion={{
                latitude: 51.51923880436022,
                longitude: -0.1323491652193389,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
            className="flex-1 -mt-10 z-0"
            mapType='mutedStandard'
        >

            <Marker
            coordinate={{
                latitude: 51.51923880436022,
                longitude:-0.1323491652193389,
            }}
            title={restaurant.title}
            description={restaurant.short_description}
            identifier='origin'
            pinColor='#00CCBB'
            />
        </MapView>
        <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
            <Image
            source={{
                uri:"https://imgs.search.brave.com/TYq6m96O87887eGrxJpXAP-FKpLlrXb7GLX3oBtuE-k/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3cy4xMjNyZi5j/b20vaW1hZ2VzL29z/Y2FycGhvdG9zL29z/Y2FycGhvdG9zMTQx/Mi9vc2NhcnBob3Rv/czE0MTIwMDY0NC8z/NDk2MTQ4NS1kZWxp/dmVyeS1zY29vdGVy/LWljb24uanBn",
            }}
            className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
            />
            <View className="flex-1">
                <Text className="text-lg">Gevin dassa</Text>
                <Text className="text-gray-400">Your Rider</Text>
            </View>
            <Text className="text-[#00CCBB] text-lg mr-5 font-bold">Call</Text>
        </SafeAreaView>
    </View>
  )
}

export default DeliveryScreen