import { zodResolver } from '@hookform/resolvers/zod'
import { HomeIcon } from 'app/assets/SVGIcons/SVGIconsCustom'
import { useAuth } from 'app/context/AuthContext'
import { Link } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import Icon from 'react-native-remix-icon'
import { useState } from 'react'
import { registerSchema, registerSchemaType } from 'app/lib/schemas/validationSchemas'

export default function signup() {
  const { register } = useAuth()

  const methods = useForm<registerSchemaType>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    mode: 'onChange',
    resolver: zodResolver(registerSchema)
  })
  const onSubmit = async (data: registerSchemaType) => {
    const { confirmPassword, ...properData } = data
    register(properData)
  }

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

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
                Sign up to Expensia
              </Text>
              <Text className='font-nunito-regular text-center text-[#8395A7]' >
                Your personal finance dashboard starts here.
              </Text>
            </View>
          </View>
          <View className='w-full gap-5'>
            <View className='gap-2'>
              <Text className='font-nunito-medium text-lg text-[#1E1E1E]' >
                Name
              </Text>
              <Controller
                control={methods.control}
                name='name'
                render={({ field }) => (
                  <TextInput
                    {...field}
                    placeholder='Enter your full name'
                    onChangeText={field.onChange}
                    placeholderTextColor={'#8395A7'}
                    className={`h-13 font-nunito-regular border ${methods.formState.errors.name ? "border-[#EF476F]" : "border-[#D9E3E8]"}  text-[#37474F] text-lg rounded-lg px-4 py-2.5`}
                  />
                )}
              />
              {
                methods.formState.errors.name && (
                  <Text className='text-[#EF476F]' >
                    {methods.formState.errors.name.message}
                  </Text>
                )
              }
            </View>
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
                    className={`h-13 font-nunito-regular border ${methods.formState.errors.email ? "border-[#EF476F]" : "border-[#D9E3E8]"} text-[#37474F] text-lg rounded-lg px-4 py-2.5`}
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
              <View className={`flex-row items-center ${methods.formState.errors.password ? "border-[#EF476F]" : "border-[#D9E3E8]"} border rounded-lg pr-2`}>
                <Controller
                  control={methods.control}
                  name='password'
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      onChangeText={field.onChange}
                      secureTextEntry={!isPasswordVisible}
                      placeholder='Create a password'
                      returnKeyType='send'
                      placeholderTextColor={'#8395A7'}
                      className='flex-1 font-nunito-regular h-13 text-[#37474F] text-lg rounded-lg pl-4 py-2.5'
                    />
                  )}
                />
                <Icon onPress={() => setIsPasswordVisible(!isPasswordVisible)} name={isPasswordVisible ? 'eye-off-line' : 'eye-line'} size={27} color='#8395A7' />
              </View>
              {
                methods.formState.errors.password && (
                  <Text className='text-[#EF476F]' >
                    {methods.formState.errors.password.message}
                  </Text>
                )
              }
            </View>
            <View className='gap-2'>
              <Text className='font-nunito-medium text-lg text-[#1E1E1E]' >
                Confirm Password
              </Text>
              <View className={`flex-row items-center ${methods.formState.errors.confirmPassword ? "border-[#EF476F]" : "border-[#D9E3E8]"} border rounded-lg pr-2`}>
                <Controller
                  control={methods.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      onChangeText={field.onChange}
                      secureTextEntry={!isPasswordVisible}
                      placeholder='Re-enter your password'
                      returnKeyType='send'
                      placeholderTextColor={'#8395A7'}
                      className='flex-1 h-13 text-[#37474F] font-nunito-regular text-lg rounded-lg pl-4 py-2.5'
                    />
                  )}
                />
                <Icon onPress={() => setIsPasswordVisible(!isPasswordVisible)} name={isPasswordVisible ? 'eye-off-line' : 'eye-line'} size={27} color='#8395A7' />
              </View>
              {
                methods.formState.errors.confirmPassword && (
                  <Text className='text-[#EF476F]'>
                    {methods.formState.errors.confirmPassword.message}
                  </Text>
                )
              }
            </View>
            <Pressable disabled={!methods.formState.isValid} onPress={methods.handleSubmit(onSubmit)} className='bg-[#06D6A0] h-12 justify-center items-center rounded-xl'>
              <Text className='text-lg font-nunito-bold text-white' >
                Sign Up
              </Text>
            </Pressable>
            <View className='flex flex-row gap-1 items-center justify-center' >
              <Text className='font-nunito-regular text-[#8395A7] text-md'>Already registered?</Text>
              <Link href={'/login'}>
                <Text className='text-[#06D6A0] text-md'>
                  Login
                </Text>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
