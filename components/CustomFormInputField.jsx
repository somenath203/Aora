import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

import { icons } from '../constants';


const CustomFormInputField = ({ title, value, placeholder, handleChangeText, extraStyles, keyboardType }) => {


  const [ showPassword, setShowPassword ] = useState(false);

  
  return (
    <View className={`space-y-2 ${extraStyles}`}>

      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>

      <View className='flex-row border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary-100 items-center'>

        <TextInput
          className='flex-1 text-white font-psemibold text-base'
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#7b7b8b'
          onChangeText={handleChangeText}
          secureTextEntry={title === 'password' && !showPassword} 
        />

        {title === 'password' && <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>

          <Image 
            source={!showPassword ? icons.eye : icons.eyeHide}
            className='w-6 h-6'
            resizeMode='contain'
          />

        </TouchableOpacity>}

      </View>

    </View>
  )
}


export default CustomFormInputField;