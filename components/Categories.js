import { View, Text, ScrollView } from 'react-native'
import React, { useEffect ,useState} from 'react'
import CategoryCard from'./CategoryCard'
import createClient from '../sanity';
import { urlFor } from '../sanity'


const Categories = () => {
  const [Categories,setCategories] = useState([]);
  
useEffect(() =>{
  createClient.fetch(`
  *[_type == "category"]`)
  .then((data)=>{
    setCategories(data);
  })
},[])


  return (
    <ScrollView
        contentContainerStyle={{
            paddingHorizontal:15,
            paddingTop:10,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}>
        
        
        {Categories.map((Category) => (
          <CategoryCard 
          key={Category._id}
          imgUrl = {urlFor(Category.image).width(200).url()}
          title={Category.name}
          />
        ))}
    </ScrollView>
  )
}

export default Categories