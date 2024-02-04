import { View, Text, Touchable, TouchableOpacity, Image } from 'react-native'
import { urlFor } from '../sanity'
import {PlusCircleIcon ,MinusCircleIcon } from "react-native-heroicons/outline";
import { useDispatch, useSelector } from 'react-redux'// related  lines> 8,18,17 

import React, { useState } from 'react'
import { addToBasket, selectBasketItems ,removeFromBasket,selectBasketItemsWithId} from '../features/basketSlice';



const DishRow = ({
    id,name,description,price , image  }) => {


  const [isPressed, setIsPressed] = useState(false);

  const items= useSelector((state)=>selectBasketItemsWithId(state,id));
  
  const dispatch = useDispatch();

// add To Basket dispatching
  const addItemToBasket =()=>{
    dispatch(addToBasket({id,name,description,price , image}))
  }


  const removeItemFromBasket =() =>{
    if(!items.length > 0) return;

    dispatch(removeFromBasket({id}));
  }

  console.log(items);


  return (
    <>
    <TouchableOpacity 
    onPress={() => setIsPressed(!isPressed)}
    className={`bg-white border p-4 border-gray-200 ${
      isPressed && "border-b-0"
    }` }>
        <View className="flex-row">
          <View className=" flex-1 pr-2">
            <Text className ="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400"> {description}</Text>
            <Text className="text-gray-400 mt-2">
              {price}GPB
            {/* <CurrencyFormat
                quantity={price}
                currency="GPR"
            /> */}
            </Text>
          </View>

          <View>
            <Image
            style={{
              borderWidth:1,
              borderColor:"#F3F3F4",
            }}
            source={{uri:urlFor(image).url()}}
            className="h-20 w-20 bg-gray-300 p-4"
            />
          </View>
        </View>
    </TouchableOpacity> 
    
    {isPressed && (
      <View className="bg-white px-4">
        <View className="flex-row items-center space-x-2 pb-3">
          <TouchableOpacity
          disabled={!items.length}
          onPress={removeItemFromBasket}>
            <MinusCircleIcon 
            color={items.length >0? "#00CCBB" : 'gray'}  // color change to gray if there is no items ,
            size={40} />
          </TouchableOpacity>

          <Text>{items.length}</Text>

          <TouchableOpacity onPress={addItemToBasket}>
            <PlusCircleIcon color="#00CCBB" size={40}/>
          </TouchableOpacity>
        </View>
      </View>
    )}


    </>
  )
}

export default DishRow 