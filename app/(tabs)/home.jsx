import { FlatList, Image, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

import { images } from '../../constants';
import VideoSearchBar from '../../components/VideoSearchBar';
import TrendingVideos from '../../components/TrendingVideos';
import EmptyStateComponent from '../../components/EmptyStateComponent';
import { getAllAvailableVideoPostsOfAllUsers, getLatestVideoPosts } from '../../appwrite-config';
import HookToFetchData from '../../hooks/hookToFetchData';
import VideoCard from '../../components/VideoCard';
import { useGlobalContext } from '../../context/GlobalStateProvider';


const Home = () => {


  const { 
    fetchedDataFromTheFunction: allFetchedVideoPosts,
    refetchAllDataOnPageRefresh: refreshAllVideos
  } = HookToFetchData(getAllAvailableVideoPostsOfAllUsers);


  const { 
    fetchedDataFromTheFunction: allFetchedLatestVideoPosts,
    refetchAllDataOnPageRefresh: refreshAlllatestVideos
  } = HookToFetchData(getLatestVideoPosts);


  const [ refreshingPage, setRefreshingPage ] = useState(false);


  const { loggedInUserDetails } = useGlobalContext();


  const onRefreshPage = async () => {

    setRefreshingPage(true);

    await refreshAllVideos();

    await refreshAlllatestVideos();

    setRefreshingPage(false);

  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      
      <FlatList
        data={allFetchedVideoPosts}
        keyExtractor={(item) => item?.$id}
        renderItem={({ item }) => (

          <VideoCard videoItem={item} />

        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-6'>

            <View className='justify-between items-start flex-row mb-6'>
              
              <View>

                <Text className='font-pmedium text-sm text-gray-100'>Welcome 👋</Text>

                <Text className='text-2xl font-psemibold text-white' numberOfLines={1}>{loggedInUserDetails?.fullName}</Text>

              </View>

              <View className='mt-1.5'>

                <Image 
                  source={images.logoSmall}
                  className='w-9 h-10'
                  resizeMode='contain'
                />

              </View>

            </View>

            <VideoSearchBar />


            <View className='w-full flex-1 pt-5 pb-8'>

              <Text className='text-gray-100 text-lg font-pregular mb-3'>Latest Videos</Text>

              <TrendingVideos videoPosts={allFetchedLatestVideoPosts} />

            </View>

          </View>
        )}
        ListEmptyComponent={() => (

          <EmptyStateComponent title='No Videos Found' subtitle='Be the first one to upload a video' />

        )}
        refreshControl={<RefreshControl refreshing={refreshingPage} onRefresh={onRefreshPage} />}
      />

    </SafeAreaView>
  )
}


export default Home;