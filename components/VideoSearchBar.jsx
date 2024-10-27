import { Alert, Image, TextInput, TouchableOpacity, View } from "react-native";
import { router, usePathname } from "expo-router";

import { icons } from "../constants";
import { useState } from "react";


const VideoSearchBar = () => {

  const pathname = usePathname();

  const [ searchVideoQuery, setSearchVideoQuery ] = useState('');

  return (
    <View className='flex-row border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary-100 items-center space-x-4'>
      

      <TextInput
        className='text-base mt-0.5 text-white flex-1 font-pregular'
        placeholder='search video (min 5 characters)'
        placeholderTextColor='#CDCDE0'
        extraStyles='mt-7'
        value={searchVideoQuery}
        onChangeText={(text) => setSearchVideoQuery(text)}
      />


      <TouchableOpacity 
        onPress={() => {

          if(!searchVideoQuery) {
            
            return Alert.alert('Missing Search Query. Please input something to search results.');

          }


          if(pathname.startsWith('/searchvideos')) {

            router.setParams({ searchVideoQuery });

          } else {

            router.push(`/searchvideos/${searchVideoQuery}`);

          }

        }}
      >

        <Image 
          source={icons.search} 
          className='w-5 h-5' 
          resizeMode="contain"
        />

      </TouchableOpacity>


    </View>
  )
}

export default VideoSearchBar;