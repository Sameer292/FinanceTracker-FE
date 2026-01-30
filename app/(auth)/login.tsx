import { HomeIcon } from 'app/assets/SVGIcons/SVGIconsCustom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from 'app/context/AuthContext'
import { Link } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { ActivityIndicator, KeyboardAvoidingView, Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { loginSchema, type loginSchemaType } from 'app/lib/schemas/validationSchemas'
import { SecureTextField } from 'app/components/SecureTextField'

export default function login() {
  const { login, isLoading, isLoginError } = useAuth()

  const methods = useForm<loginSchemaType>({
    defaultValues: {
      email: 'iamsameer@gmail.com',
      password: 'iamsameer'
    },
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema)
  })
  const onSubmit = async (loginData: loginSchemaType) => {
    login(loginData)
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' className='bg-white'>
      <ScrollView style={{ flex: 1 }} keyboardDismissMode='interactive' keyboardShouldPersistTaps='handled' contentContainerStyle={{ flex: 1, justifyContent: 'center' }} >
        <View className='gap-12 px-4 -mt-20 h-max w-full justify-center items-center'>
          {/* Header */}
          <View className=' gap-7 justify-center items-center'>
            <View className='rounded-full size-20 items-center justify-center'>
              <HomeIcon />
            </View>
            <View className='items-center gap-1'>

              <Text className='font-nunito-bold text-4xl text-[#073B4C]' >
                Welcome back!
              </Text>
              <Text className='font-nunito-regular text-center text-[#8395A7]' >
                Login to access your personal expense dashboard.
              </Text>
            </View>
          </View>
          <View className='w-full gap-5'>
            <View className='gap-2'>
              <Text className='font-nunito-medium text-lg text-[#1E1E1E]' >
                Email
              </Text>
              <Controller
                control={methods.control}
                name='email'
                render={({ field }) => (
                  <TextInput
                    {...field}
                    placeholder='Email'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    onChangeText={field.onChange}
                    placeholderTextColor={'#8395A7'}
                    className={`h-13 font-nunito-regular border ${isLoginError ? "border-[#EF476F]" : "border-[#D9E3E8]"}  text-[#37474F] text-lg rounded-lg px-4 py-2.5`}
                  />
                )}
              />
              {
                methods.formState.errors.email && (
                  <Text className='text-[#EF476F]' >
                    {methods.formState.errors.email.message}
                  </Text>
                )
              }
            </View>
            <View className='gap-2'>
              <Text className='font-nunito-medium text-lg text-[#1E1E1E]' >
                Password
              </Text>
              <View className={`flex-row items-center rounded-lg`}>
                <Controller
                  control={methods.control}
                  name='password'
                  render={({ field }) => (
                    <SecureTextField
                      {...field}
                      error={isLoginError}
                      onChangeText={field.onChange}
                      placeholder='Password'
                      returnKeyType='send'
                    />
                  )}
                />
              </View>
              {
                methods.formState.errors.password && (
                  <Text className='text-[#EF476F]'>
                    {methods.formState.errors.password.message}
                  </Text>
                )
              }
            </View>
            <Pressable disabled={!methods.formState.isValid || isLoading} onPress={methods.handleSubmit(onSubmit)} className='bg-[#06D6A0] h-12 justify-center items-center rounded-xl'>
              {
                isLoading ?
                  (
                    <ActivityIndicator size='small' color='white' />
                  )
                  :
                  (<Text className='font-nunito-bold text-lg text-white' >
                    Login
                  </Text>)
              }
            </Pressable>
            <View className='flex flex-row gap-1 items-center justify-center' >
              <Text className='font-nunito-regular text-[#8395A7] text-md'>Don't have an account?</Text>
              <Link href={'/signup'}>
                <Text className='text-[#06D6A0] text-md'>
                  Sign Up
                </Text>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
