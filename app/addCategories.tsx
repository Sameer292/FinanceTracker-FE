import { View, Text, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { KeyboardAvoidingView } from 'react-native'

export default function AddCategories() {
    const [categoryName, setCategoryName] = useState<string>('Category');
    return (
        <KeyboardAvoidingView behavior='padding' className='flex-1 bg-[#F6F8F6]'>
            <View className='flex-1 gap-12 px-4 justify-center pb-4'>
                {/* Header */}
                <View className='mt-2 justify-center items-center flex'>
                    <View className='justify-between flex-row w-full items-center'>
                        <Pressable className='items-center' onPress={() => router.back()}>
                            <MaterialIcons name={'chevron-left'} size={30} color={'#000'} />
                        </Pressable>
                        <Text className='text-2xl font-semibold'>Add Category</Text>
                        <View></View>
                    </View>
                </View>
                {/* Body */}
                <View className='flex-1 justify-between' >
                    <View className='gap-14'>
                        <View className='items-center gap-8 justify-center'>
                            <View style={{ borderRadius: '100%' }} className='flex-row bg-[#5856D6] items-center justify-center gap-2 size-40 rounded-full'>
                                <MaterialIcons name='shopping-cart' size={60} color='#fff' />
                            </View>
                            <Text className='text-center font-medium text-4xl'>
                                {categoryName}
                            </Text>
                        </View>
                        <View className='gap-4'>
                            <View className='gap-2'>
                                <Text className='font-medium text-lg'>Category Name</Text>
                                <TextInput 
                                className='bg-[#E9EBE9] rounded-lg p-4 mb-4' 
                                placeholder='Enter category name' 
                                value={categoryName}
                                onChangeText={setCategoryName}
                                />
                            </View>
                            <View className='gap-4'>
                                <Text className='font-medium text-lg'>
                                    Appearance
                                </Text>
                                <View className='gap-3'>
                                    <TextInput className='bg-[#E9EBE9] rounded-lg p-4' placeholder='Enter appearance' />
                                    <TextInput className='bg-[#E9EBE9] rounded-lg p-4' placeholder='Enter appearance' />
                                </View>
                            </View>
                        </View>
                    </View>
                    <Pressable className='bg-[#13EC5B] rounded-lg h-16 justify-center items-center'>
                        <Text className='font-bold text-xl'>Save Category</Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}