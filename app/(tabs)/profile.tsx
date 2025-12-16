import { MaterialIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from 'app/context/AuthContext'
import { Link, router } from 'expo-router'
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

export default function profile() {
  const { user: me, setAuthStatus } = useAuth()
console.log({me})
  const logout = async () => {
    await AsyncStorage.removeItem("accessToken")
    setAuthStatus("unauthenticated")
  }
  return (
    <View className='flex h-full bg-[#F6F8F6] justify-center gap-12 px-4 items-center ' >
      {/* Header */}
      <View className='flex relative justify-center w-full px-4 items-center' >
        <Text className='text-2xl font-bold'>Profile</Text>
        <View className='absolute left-0'>
          {/* <MaterialIcons name={'chevron-left'} size={35} color={'#000'} /> */}
        </View>
      </View>
      {/* Body */}
      <View className='flex-1 w-full gap-12 items-center '>
        {/* Title */}
        <View className='w-full gap-4 items-center' >
          <View className='border-2 border-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] justify-center items-center size-32 rounded-full' >
            <Image
              source={require('../../assets/IMG_2110.jpg')}
              className='rounded-full size-30'
            />
          </View>
          <View className='w-full items-center' >
            <Text className='text-4xl font-semibold' >{me?.name}</Text>
            <Text className='text-[#78716C] text-lg' >{me?.email}</Text>
          </View>
        </View>
        <View className='w-full gap-16'>
          {/* Account */}
          <View className='flex gap-6'>
            <View className='w-full gap-2 '>
              <Text className='text-[#78716C] ml-4 text-xl font-bold' >Account</Text>
              <View className='w-full shadow-[0_3px_7px_rgb(0,0,0,0.1)] bg-white rounded-2xl'>
                <View className='flex px-4 py-5 border-b gap-4 border-b-[#F5F5F4] flex-row items-center'>
                  <View>
                    <MaterialIcons name={'person-outline'} color={'#13EC5B'} size={25} />
                  </View>
                  <View className='flex flex-row items-center justify-between flex-1'>
                    <Text className='text-xl font-medium text-[#292524]' >Edit Profile</Text>
                    <MaterialIcons name={'chevron-right'} size={25} />
                  </View>
                </View>
                <View className='flex px-4 py-5 border-b gap-4 border-b-[#F5F5F4] flex-row items-center'>
                  <View>
                    <MaterialIcons name={'lock-outline'} color={'#13EC5B'} size={25} />
                  </View>
                  <View className='flex flex-row items-center justify-between flex-1'>
                    <Text className='text-xl font-medium text-[#292524]' >Change Password</Text>
                    <MaterialIcons name={'chevron-right'} size={25} />
                  </View>
                </View>
                <View className='flex px-4 py-5 border-b gap-4 border-b-[#F5F5F4] flex-row items-center'>
                  <View>
                    <MaterialIcons name={'payments'} color={'#13EC5B'} size={25} />
                  </View>
                  <View className='flex flex-row items-center justify-between flex-1'>
                    <Text className='text-xl font-medium text-[#292524]' >Currency</Text>
                    <MaterialIcons name={'chevron-right'} size={25} />
                  </View>
                </View>
              </View>
            </View>
            {/* Categories */}
            <View className=' rounded-2xl bg-white flex px-4 shadow-[0_3px_7px_rgb(0,0,0,0.1)] py-5 gap-4 flex-row items-center'>
              <View>
                <MaterialIcons name={'category'} color={'#13EC5B'} size={25} />
              </View>
              <Link href={'/categories'} className='flex-1'>
                <View className='flex w-full flex-row items-center justify-between flex-1'>
                  <Text className='text-xl font-medium text-[#292524]'>Categories</Text>
                  <MaterialIcons name={'chevron-right'} size={25} />
                </View>
              </Link>
            </View>
          </View>
          <Pressable onPress={logout} className='shadow-[0_3px_7px_rgb(0,0,0,0.1)] h-14 w-full rounded-xl bg-[#F5E5E4] justify-center items-center'>
            <Text className='text-xl font-semibold text-[#EF4444]'>
              Logout
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})