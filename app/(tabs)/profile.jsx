import { FlatList, Image, TouchableOpacity, View, Text, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useState } from 'react';

import EmptyStateComponent from '../../components/EmptyStateComponent';
import { getAllVideoPostsByCurrentlyLoggedInUser } from '../../appwrite-config';
import HookToFetchData from '../../hooks/hookToFetchData';
import VideoCard from '../../components/VideoCard';
import { useGlobalContext } from '../../context/GlobalStateProvider';
import { icons } from '../../constants';
import { logoutUserFromTheApplication } from '../../appwrite-config';


const Profile = () => {


  const [ refreshingPage, setRefreshingPage ] = useState(false);


  const { 
    loggedInUserDetails, 
    setLoggedInUserDetails, 
    setIsUserLoggedIn 
  } = useGlobalContext();

  const {
    fetchedDataFromTheFunction: allVideoOfTheCurrentlyLoggedInUser,
    refetchAllDataOnPageRefresh: refreshUserAllVideos
  } = HookToFetchData(() => getAllVideoPostsByCurrentlyLoggedInUser(loggedInUserDetails?.$id));  


  const onRefreshPage = async () => {

    setRefreshingPage(true);

    await refreshUserAllVideos();

    setRefreshingPage(false);

  }


  const logoutUser = async () => {

    await logoutUserFromTheApplication();

    setLoggedInUserDetails(null);

    setIsUserLoggedIn(false);

    router.replace('/sign-in');

  }
  

  return (
    <SafeAreaView className='bg-primary h-full'>
      
      <FlatList
        data={allVideoOfTheCurrentlyLoggedInUser}
        keyExtractor={(item) => item?.$id}
        renderItem={({ item }) => (

          <VideoCard videoItem={item} />

        )}
        ListHeaderComponent={() => (

          <View className='w-full justify-center items-center mt-6 mb-12 px-4'>

            <TouchableOpacity
              className='w-full items-end mb-10' 
              onPress={logoutUser}
            >

              <Image source={icons.logout} className='w-6 h-6' resizeMode='contain' />

            </TouchableOpacity>

            <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>

              <Image 
                source={{ uri: loggedInUserDetails?.avatar }} 
                className='w-[90%] h-[90%] rounded-lg' 
                resizeMode='cover'
              />

            </View>

            <View>

              <Text className='text-center text-white text-lg mt-10 font-psemibold tracking-widest'>Total Videos: {allVideoOfTheCurrentlyLoggedInUser?.length}</Text>

            </View>


            <View>

              <Text className='text-center text-white text-2xl mt-10 font-psemibold uppercase tracking-widest'>Your Videos</Text>

            </View>


          </View>

        )}
        ListEmptyComponent={() => (

          <EmptyStateComponent title='No Videos Found' subtitle='No videos found for this search query' />

        )}
        refreshControl={<RefreshControl refreshing={refreshingPage} onRefresh={onRefreshPage} />}
      />

    </SafeAreaView>
  )
}


export default Profile;