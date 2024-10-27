import { useState } from 'react';
import { FlatList, TouchableOpacity, ImageBackground, Image, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { WebView } from 'react-native-webview';

import { icons } from '../constants';


const TrendingVideoItem = ({ currentActiveItem, item }) => {


  const [ isVideoPlaying, setisVideoPlaying ] = useState(false);

  const videoURL = item.video.replace('/preview', '/view');


  const zoomInAnimation = {
    0: {
      scale: 0.9
    },
    1: {
      scale: 1.1
    }
  }

  const zoomOutAnimation = {
    0: {
      scale: 1
    },
    1: {
      scale: 0.9
    }
  }

  
  return (
    <Animatable.View 
      className='mr-5'
      animation={currentActiveItem === item.$id ? zoomInAnimation : zoomOutAnimation}
      duration={500}
    >


      { isVideoPlaying ? (
        
        <View className='w-52 h-72 rounded-[35px] mt-3 bg-white/10 overflow-hidden'>

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
          className='relative justify-center items-center' 
          activeOpacity={0.7}
          onPress={() => setisVideoPlaying(true)}
        >

         <ImageBackground 
          source={{ uri: item.thumbnail }} 
          className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'  
          resizeMode='cover'
         />

         <Image source={icons.play} className='w-12 h-12 absolute' resizeMode='contain' />

        </TouchableOpacity>

      )}
      
    </Animatable.View>
  )

}


const TrendingVideos = ({ videoPosts }) => {


  const [ activeItem, setActiveItem ] = useState(videoPosts[0]?.$id); 

  const viewItemsOnChange = ({ viewableItems }) => {

    if(viewableItems.length > 0) {

      setActiveItem(viewableItems[0]?.item?.$id); 

    }

  }

  return (
    <FlatList
        data={videoPosts}
        keyExtractor={(item) => item?.$id}
        renderItem={({ item }) => (

            <TrendingVideoItem currentActiveItem={activeItem} item={item} />

        )}
        onViewableItemsChanged={viewItemsOnChange}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70
        }}
        contentOffset={{ x: 170 }}
        horizontal
    />
  )
};


export default TrendingVideos;