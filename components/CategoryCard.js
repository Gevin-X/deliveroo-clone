import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const CategoryCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity style={{ marginRight: 2 ,position: 'relative' }}>
      <Image
        source={{
          uri: imgUrl,
        }}
        style={{ height: 120, width: 120, borderRadius: 8 }} // Adjust the style according to your needs
      />
        <Text style={{ position: 'absolute', bottom: 1, left: 1, color: 'white', fontWeight: 'bold' }}>
          {title}
        </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;