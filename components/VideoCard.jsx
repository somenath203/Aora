import { View, Text, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { WebView } from 'react-native-webview';

import { icons } from "../constants";


const VideoCard = ({ videoItem }) => {


  const { title, thumbnail, video, creator: { fullName, avatar } } = videoItem;

  const [ isVideoPlaying, setIsVideoPlaying ] = useState(false);

  const videoURL = video.replace('/preview', '/view');



  return (
    <View className='flex-col items-center px-4 mb-14'>

        <View className='flex-row gap-3 items-start'>

            <View className='justify-center items-center flex-row flex-1'>

                <View className='w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5'>

                    <Image source={{ uri: avatar }} className='w-full h-full rounded-lg' resizeMode="cover" />

                </View>

                <View className='justify-center flex-1 ml-3 gap-y-1'>

                    <Text className='text-white font-psemibold text-sm' numberOfLines={1}>{title}</Text>

                    <Text className='text-xs text-gray-100 font-pregular' numberOfLines={1}>{fullName}</Text>

                </View>

            </View>

        </View>


        {isVideoPlaying ? (

            <View className='w-full h-60 rounded-xl mt-3'>

                <WebView 
                    source={{ uri: videoURL }}
                    style={{ flex: 1 }}
                    cacheEnabled={true}
                    allowsInlineMediaPlayback={true}
                    javaScriptEnabled={true}
                    allowsFullscreenVideo={true}
                    scalesPageToFit={true}
                    startInLoadingState={true}      
                />

            </View>

        ) : (
            
            <TouchableOpacity 
                activeOpacity={0.7} 
                className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'
                onPress={() => setIsVideoPlaying(true)}
            >

                <Image source={{ uri: thumbnail }} className='w-full h-full rounded-xl mt-3' resizeMode="cover" />

                <Image source={icons.play} className='w-12 h-12 absolute' resizeMode="contain" />

            </TouchableOpacity>
        )}

    </View>
  )
}


export default VideoCard;