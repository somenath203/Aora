import { View, ScrollView, Image, Text, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

import { images } from '../../constants';
import CustomFormInputField from '../../components/CustomFormInputField';
import CustomButton from './../../components/CustomButton';
import { createNewUser } from '../../appwrite-config';
import { useGlobalContext } from '../../context/GlobalStateProvider';


const SignUp = () => {


  const [ formValues, setFormValues ] = useState({
    fullName: '',
    email: '',
    password: ''
  });


  const [ loadingSubmitForm, setLoadingSubmitForm ] = useState(false);


  const { setLoggedInUserDetails, setIsUserLoggedIn } = useGlobalContext();


  const submitSignUpForm = async () => {

    if (!formValues.fullName || !formValues.email || !formValues.password) {

      Alert.alert('Authentication Error', 'Please fill in all the fields');

      return;

    }


    setLoadingSubmitForm(true);

    try {

      const userDetailsAfterSuccessfulSignUp = await createNewUser(formValues.fullName, formValues.email, formValues.password);

      setLoggedInUserDetails(userDetailsAfterSuccessfulSignUp);
      
      setIsUserLoggedIn(true);

      router.replace('/home');
      
    } catch (error) {
      
      Alert.alert('Server Error', error?.message);
    
    } finally {

      setLoadingSubmitForm(false);

    }
    
  }


  return (
    <SafeAreaView className='bg-primary h-full'>
      
      <ScrollView>

        <View className='w-full min-h-[92vh] justify-center px-4 py-6'>

          <Image source={images.logo} className='w-[115px] h-[35px]' resizeMode='contain' />

          <Text className='text-2xl text-white text-semibold mt-10 font-semibold'>Sign Up to Aora</Text>

          <CustomFormInputField
            title='full name'
            value={formValues.fullName}
            placeholder='enter your full name'
            handleChangeText={(text) => setFormValues({...formValues, fullName: text})}
            extraStyles='mt-10'
          />

          <CustomFormInputField
            title='email'
            value={formValues.email}
            placeholder='enter your email address'
            handleChangeText={(text) => setFormValues({...formValues, email: text})}
            extraStyles='mt-7'
            keyboardType='email-address' 
          />

          <CustomFormInputField
            title='password'
            value={formValues.password}
            placeholder='enter your password'
            handleChangeText={(text) => setFormValues({...formValues, password: text})}
            extraStyles='mt-7'
          />

          <CustomButton 
            title='Sign Up'
            handlePress={submitSignUpForm}
            containerStyles='mt-7'
            isLoading={loadingSubmitForm}
          />

          <View className='justify-center pt-5 flex-row gap-2'>

            <Text className='text-lg text-gray-100 font-pregular'>Already have an account?</Text>

            <Link href='/sign-in' className='text-lg font-psemibold text-secondary'>Sign In</Link>

          </View>

        </View>

      </ScrollView>

    </SafeAreaView>
  )
}


export default SignUp;