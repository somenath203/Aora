import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { ResizeMode, Video } from "expo-av";
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';

import CustomFormInputField from '../../components/CustomFormInputField';
import CustomButton from '../../components/CustomButton';
import { icons } from '../../constants';
import { createVideoPost } from '../../appwrite-config';
import { useGlobalContext } from '../../context/GlobalStateProvider';


const CreateVideo = () => {


  const { loggedInUserDetails } = useGlobalContext();


  const [formValues, setFormValues] = useState({
    title: '',
    video: null,
    thumbnail: null,
  });

  const [loadingFormDetails, setLoadingUploadFormDetails] = useState(false);


  const openPickerForBothVideoAndThumbnailUpload = async (selectType) => {


    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1
    });


    if(!result.canceled) {

      if (selectType === 'image') {

        setFormValues({...formValues, thumbnail: result.assets[0]});

      }

      if(selectType === 'video') {

        setFormValues({...formValues, video: result.assets[0]});

      }

    } else {

      setTimeout(() => {

        Alert.alert('Document Picked', JSON.stringify(result, null, 2));

      }, 100);
    }


  }


  const submitVideoAndItsDetails = async () => {

    if(!formValues.title || !formValues.thumbnail || !formValues.video) {

      return Alert.alert('Please fill in all the fields');

    } 

    setLoadingUploadFormDetails(true);

    try {

      await createVideoPost({
        ...formValues,
        userId: loggedInUserDetails?.$id
      });

      Alert.alert('Success', 'Your video post has been published successfully');

      router.push('/home');
      
    } catch (error) {

      Alert.alert('Error', error?.message);
      
    } finally {

      setLoadingUploadFormDetails(false);

      setFormValues({
        title: '',
        video: null,
        thumbnail: null,
      });

    }

  }


  return (
    <SafeAreaView className="bg-primary h-full">

      <ScrollView className="px-4 my-6">
      
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

        <CustomFormInputField
          title="Video Title"
          value={formValues.title}
          placeholder="enter the title of your video"
          handleChangeText={(text) =>
            setFormValues({ ...formValues, title: text })
          }
          extraStyles="mt-16"
        />

        <View className="mt-7 space-y-2">

          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video (max 50mb)
          </Text>

        </View>

        <TouchableOpacity className="mt-2" onPress={() => openPickerForBothVideoAndThumbnailUpload('video')}>

          {formValues.video ? (

            <Video
              source={{ uri: formValues.video.uri }}
              className="w-full h-64 rounded-2xl"
              useNativeControls
              resizeMode={ResizeMode.COVER}
              isLooping
            />

          ) : (

            <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">

              <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                
                <Image
                  source={icons.upload}
                  className="w-1/2 h-1/2"
                  resizeMode="contain"
                />


              </View>

              <Text className='text-white text-lg mt-3 tracking-wider font-pregular'>only .mp4 is allowed</Text>
              {/* in appwrite sotrage setting, we only allow .mp4 to be uploaded */}
            
            </View>
          )}

        </TouchableOpacity>

        <View className="mt-7 space-y-2">

          <Text className="text-base text-gray-100 font-pmedium">
            Video Thumbnail Image
          </Text>

          <TouchableOpacity className="mt-2" onPress={() => openPickerForBothVideoAndThumbnailUpload('image')}>

            {formValues.thumbnail ? (

              <Image
                source={{ uri: formValues.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />

            ) : (
              <View className="w-full h-16 px-4 b flex-col space-y-2 g-black-100 rounded-2xl justify-center items-center border-2 border-black-200">
                  
                <View className='flex-row space-x-2'>

                  <Image
                    source={icons.upload}
                    className="w-5 h-5"
                    resizeMode="contain"
                  />

                  <Text className='text-sm text-gray-100 font-pmedium'>Choose a file</Text>

                </View>

                <Text className='text-white text-sm tracking-wider font-pregular'>only .jpg, .jpeg and .png is allowed</Text>

              </View>
            )}

          </TouchableOpacity>

        </View>

        <CustomButton
          title='Publish'
          handlePress={submitVideoAndItsDetails}
          containerStyles='mt-7'
          isLoading={loadingFormDetails}
        />

      </ScrollView>

    </SafeAreaView>
  );
};

export default CreateVideo;
