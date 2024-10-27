import { View, Text, Image } from 'react-native';
import { Tabs } from 'expo-router';

import { icons } from '../../constants';


const TabIcon = ({ iconSource, color, name, focused }) => {
  return (
    <View className='items-center justify-center gap-2'>

      <Image 
        source={iconSource} 
        resizeMode='contain' 
        tintColor={color} 
        className='w-6 h-6'
      />

      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color: color}}>{name}</Text>

    </View>
  )
}


const Tabslayout = () => {
  return (
    <>

      <Tabs 
        screenOptions={{ 
          tabBarShowLabel: false, 
          tabBarActiveTintColor: '#FFA001', 
          tabBarInactiveTintColor: '#CDCDEB',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 84
          }
        }}
      >

        <Tabs.Screen 
          name='home' 
          options={{ 
            title: 'Home', 
            headerShown: false,  
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                iconSource={icons.home} 
                color={color} 
                name='Home' 
                focused={focused}
              />
            )
          }}
        />

        <Tabs.Screen 
          name='create-video' 
          options={{ 
            title: 'Create', 
            headerShown: false,  
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                iconSource={icons.plus} 
                color={color} 
                name='Create' 
                focused={focused}
              />
            )
          }}
        />


        <Tabs.Screen 
          name='profile' 
          options={{ 
            title: 'Profile', 
            headerShown: false,  
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                iconSource={icons.profile} 
                color={color} 
                name='Profile' 
                focused={focused}
              />
            )
          }}
        />  


      </Tabs>

    </>
  )
}


export default Tabslayout;