import { Image, View, Text } from "react-native";
import { router } from "expo-router";

import { images } from "../constants";
import CustomButton from "./CustomButton";


const EmptyStateComponent = ({ title, subtitle }) => {
  return (
    <View className='items-center justify-center px-4'>

        <Image source={images.empty} className='w-[270px] h-[215px]' resizeMode="contain" />
        
        <Text className='text-xl text-center font-psemibold text-white mt-2'>{title}</Text>

        <Text className='font-pmedium text-sm text-gray-100'>{subtitle}</Text>

        <CustomButton 
            title='Create Video' 
            handlePress={() => router.push('/create-video')}
            containerStyles='w-full my-5'
        />

    </View>
  )
}

export default EmptyStateComponent;