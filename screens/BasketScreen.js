import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, ImageBase } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { selectBasketItems,removeFromBasket, selectBasketTotal } from '../features/basketSlice';
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from '../sanity'


const BasketScreen = () => {

    const navigation=useNavigation();
    const restaurant = useSelector(selectRestaurant)
    const items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal)
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
    const dispatch = useDispatch();


    // Items grouping
    useEffect(() =>{
      const groupedItems = items.reduce((results,item) =>{
        (results[item.id] = results[item.id] || []).push(item); //  {results[item.id] || [] } 
        return results; 
      }, {});


      setGroupedItemsInBasket(groupedItems);
    },[items]);



  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className='flex-1 bg-gray-100'>

       {/* head of Basket screeen */}

        <View className=" p-5 border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className=" text-lg font-bold text-center" > Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
          onPress={navigation.goBack}
          className="rounded-full bg-gray-100 absolute top-7 right-5"
          >
            <XCircleIcon color="#00CCBB" height={45} width={45}/>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
          source={{uri:"https://imgs.search.brave.com/TYq6m96O87887eGrxJpXAP-FKpLlrXb7GLX3oBtuE-k/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3cy4xMjNyZi5j/b20vaW1hZ2VzL29z/Y2FycGhvdG9zL29z/Y2FycGhvdG9zMTQx/Mi9vc2NhcnBob3Rv/czE0MTIwMDY0NC8z/NDk2MTQ4NS1kZWxp/dmVyeS1zY29vdGVy/LWljb24uanBn",}}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1 "> Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>


        {/* BsketScreen Delivery items */}


        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key,items]) =>(
            <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
              <Text className="text-[#00CCBB]">{items.length} X </Text>
              <Image 
              source={{uri:urlFor(items[0]?.image).url()}}
              className="h-12 w-12 rounded-full"/>
              <Text className="flex-1"> {items[0]?.name}</Text>

              <Text className="text-gray-600">{items[0]?.price} GPB</Text>
              <TouchableOpacity>
                <Text
                className="text-[#00CCBB] text-xs"
                onPress={()=> dispatch(removeFromBasket({id:key}))}
                > Reomve</Text>
              </TouchableOpacity>
            </View>
          ))}  
        </ScrollView>

        {/*  Subtototal  Delivery Fee  Oder Total  line in under of basketScreen*/}


            <View className="p-5 bg-white mt-5 space-y-4" >
              <View className="flex-row justify-between">
                <Text className="text-gray-400">Subtototal</Text>
                <Text className="text-gray-400">{basketTotal} GPB</Text>
              </View>
            

              <View className="flex-row justify-between">
                <Text className="text-gray-400">Delivery Fee</Text>
                <Text className="text-gray-400">5.99 GPB</Text>
              </View>

              <View className="flex-row justify-between">
                <Text >Oder Total</Text>
                <Text className="font-extrabold">{basketTotal+5.99 } GPB</Text>
              </View>
           
              {/*Place Oder button  */}
              <TouchableOpacity 
              onPress={()=>navigation.navigate("PreparingOrderScreen")}
              className="rounded-lg bg-[#00CCBB] p-4">
                <Text className="text-center text-white text-lg font-bold">
                  Place Oder
                </Text>
              </TouchableOpacity>

            </View>



      </View>
    </SafeAreaView>
  )
}

export default BasketScreen