import { MaterialIcons } from '@expo/vector-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from 'app/context/AuthContext'
import { Link } from 'expo-router'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { z } from 'zod'
export default function login() {
  const {  login } = useAuth()

  const loginSchema = z.object({
    email: z.email({ error: "Email is required" }),
    password: z.string().nonempty({ error: "Password is required" })
  })

  type loginSchemaType = z.infer<typeof loginSchema>

  const methods = useForm<loginSchemaType>({
    defaultValues: {
      email: 'iamsameer@gmail.com',
      password: 'iamsameer'
    },
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (loginData: loginSchemaType) => {
    await login(loginData)
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
      <ScrollView style={{ flex: 1 }} keyboardDismissMode='on-drag' keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1 }} >

        <View className='flex-1 bg-[#F6F8F6] px-4 justify-center items-center'>
          <View className='gap-12 -mt-32 h-max w-full justify-center items-center'>
            {/* Header */}
            <View className=' gap-6 justify-center items-center'>
              <View className='rounded-full size-20 bg-[#C8F5D6] items-center justify-center'>
                <MaterialIcons name={'account-balance-wallet'} color={'#13EC5B'} size={35} />
              </View>
              <Text className='text-4xl font-bold' >
                Welcome back!
              </Text>
            </View>
            <View className='w-full gap-6'>
              <View className='gap-4 '>
                <Text className='font-semibold text-lg' >
                  Email
                </Text>
                <Controller
                  control={methods.control}
                  name='email'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput placeholder='Enter your email' value={value} onChangeText={onChange} onBlur={onBlur} placeholderTextColor={'#4C9A66'} className='h-14 bg-[#E7F3EB] text-[#4C9A66] text-lg font-medium rounded-lg px-4 py-2' />
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
              <View className='gap-4 '>
                <Text className='font-semibold text-lg' >
                  Password
                </Text>
                <Controller
                  control={methods.control}
                  name='password'
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput onChangeText={onChange} value={value} onBlur={onBlur} placeholder='Enter your password' returnKeyType='send' placeholderTextColor={'#4C9A66'} className='h-14 bg-[#E7F3EB] text-[#4C9A66] text-lg font-medium rounded-lg px-4 py-2' />
                  )}
                />
                {
                  methods.formState.errors.password && (
                    <Text className='text-red-500' >
                      {methods.formState.errors.password.message}
                    </Text>
                  )
                }
              </View>
              <Pressable disabled={!methods.formState.isValid} onPress={methods.handleSubmit(onSubmit)} className='bg-[#13EC5B] h-14 justify-center items-center rounded-xl mt-4'>
                <Text className='text-xl font-semibold' >
                  Login
                </Text>
              </Pressable>
              <View className='flex flex-row gap-2 items-center justify-center' >
                <Text className='text-[#4C9A66]' >Don't have an account?</Text>
                <Link href={'/signup'}>
                  <Text className='underline text-[#0da33f] font-bold' >
                    Sign Up
                  </Text>
                </Link>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
