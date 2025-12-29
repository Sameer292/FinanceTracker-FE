import { zodResolver } from '@hookform/resolvers/zod'
import { HomeIcon } from 'app/assets/SVGIcons/SVGIconsCustom'
import { useAuth } from 'app/context/AuthContext'
import { Link } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import z from 'zod'
import Icon from 'react-native-remix-icon'
import { useState } from 'react'

export default function signup() {
  const { register } = useAuth()
  const registerSchema = z.object({
    name: z.string().min(1, { error: "Name is required" }),
    email: z.email({ error: "Email is required" }),
    password: z.string().min(1, { error: "Password is required" }),
    confirmPassword: z.string().min(1, { error: "Password is required" })
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  })
  type registerSchemaType = z.infer<typeof registerSchema>
  const methods = useForm<registerSchemaType>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    mode: 'onSubmit',
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

              <Text style={{ fontFamily: 'Nunito_700Bold' }} className='text-4xl text-[#073B4C]' >
                Sign up to Expensia
              </Text>
              <Text style={{ fontFamily: 'Nunito_400Regular' }} className='text-center text-[#8395A7]' >
                Your personal finance dashboard starts here.
              </Text>
            </View>
          </View>
          <View className='w-full gap-6'>
            <View className='gap-4 '>
              <Controller
                control={methods.control}
                name='name'
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput placeholder='Enter your full name' value={value} onChangeText={onChange} style={{ fontFamily: 'Nunito_400Regular' }} onBlur={onBlur} placeholderTextColor={'#8395A7'} className='h-10 border border-[#D9E3E8] text-[#37474F] text-sm rounded-lg px-4 py-2.5' />
                )}
              />
              {
                methods.formState.errors.name && (
                  <Text className='text-red-500' >
                    {methods.formState.errors.name.message}
                  </Text>
                )
              }
            </View>
            <View className='gap-4 '>
              <Controller
                control={methods.control}
                name='email'
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput placeholder='Enter your email address' value={value} onChangeText={onChange} style={{ fontFamily: 'Nunito_400Regular' }} onBlur={onBlur} placeholderTextColor={'#8395A7'} className='h-10 border border-[#D9E3E8] text-[#37474F] text-sm rounded-lg px-4 py-2.5' />
                )}
              />
              {
                methods.formState.errors.email && (
                  <Text className='text-red-500' >
                    {methods.formState.errors.email.message}
                  </Text>
                )
              }
            </View>
            <View className='gap-4 flex-row items-center border-[#D9E3E8] border rounded-lg px-4'>
              <Controller
                control={methods.control}
                name='password'
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput onChangeText={onChange} value={value} onBlur={onBlur} secureTextEntry={!isPasswordVisible} placeholder='Create a password' returnKeyType='send' placeholderTextColor={'#8395A7'} style={{ fontFamily: 'Nunito_400Regular' }} className='flex-1 h-10 text-[#37474F] text-sm rounded-lg py-2.5' />
                )}
              />
              <Icon onPress={() => setIsPasswordVisible(!isPasswordVisible)} name={isPasswordVisible ? 'eye-off-line' : 'eye-line'} size={27} color='#D9E3E8' />
              {
                methods.formState.errors.password && (
                  <Text className='text-red-500'>
                    {methods.formState.errors.password.message}
                  </Text>
                )
              }
            </View>
            <View className='gap-4 flex-row items-center border-[#D9E3E8] border rounded-lg px-4'>
              <Controller
                control={methods.control}
                name='confirmPassword'
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput onChangeText={onChange} value={value} onBlur={onBlur} secureTextEntry={!isPasswordVisible} placeholder='Re-enter your password' returnKeyType='send' placeholderTextColor={'#8395A7'} style={{ fontFamily: 'Nunito_400Regular' }} className='flex-1 h-10 text-[#37474F] text-sm rounded-lg py-2.5' />
                )}
              />
              <Icon onPress={() => setIsPasswordVisible(!isPasswordVisible)} name={isPasswordVisible ? 'eye-off-line' : 'eye-line'} size={27} color='#D9E3E8' />
              {
                methods.formState.errors.password && (
                  <Text className='text-red-500'>
                    {methods.formState.errors.password.message}
                  </Text>
                )
              }
            </View>
            <Pressable disabled={!methods.formState.isValid} onPress={methods.handleSubmit(onSubmit)} className='bg-[#06D6A0] h-10 justify-center items-center rounded-xl'>
              <Text style={{ fontFamily: 'Nunito_700Bold' }} className='text-lg text-white' >
                Sign Up
              </Text>
            </Pressable>
            <View className='flex flex-row gap-1 items-center justify-center' >
              <Text style={{ fontFamily: 'Nunito_400Regular' }} className='text-[#8395A7] text-sm'>Already registered?</Text>
              <Link href={'/login'}>
                <Text className='text-[#06D6A0] text-sm'>
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
