import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';

import EmptyStateComponent from '../../components/EmptyStateComponent';
import { getSearchedVideoPosts } from '../../appwrite-config';
import HookToFetchData from '../../hooks/hookToFetchData';
import VideoCard from '../../components/VideoCard';


const SearchForVideos = () => {

  const { searchvideoquery } = useLocalSearchParams();

  const {
    fetchedDataFromTheFunction: allSearchedVideoResults,
    refetchAllDataOnPageRefresh: refreshSearchedResult
  } = HookToFetchData(() => getSearchedVideoPosts(searchvideoquery));  


  useEffect(() => {

    refreshSearchedResult();

  }, [searchvideoquery]);

  return (
    <SafeAreaView className='bg-primary h-full'>
      
      <FlatList
        data={allSearchedVideoResults}
        keyExtractor={(item) => item?.$id}
        renderItem={({ item }) => (

          <VideoCard videoItem={item} />

        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4'>

            <Text className='font-pmedium text-sm text-gray-100'>Searched Results 🔍</Text>

            <Text className='text-2xl font-psemibold text-white' numberOfLines={1}>{searchvideoquery}</Text>

          </View>
        )}
        ListEmptyComponent={() => (

          <EmptyStateComponent title='No Videos Found' subtitle='No videos found for this search query' />

        )}
      />

    </SafeAreaView>
  )
}


export default SearchForVideos;