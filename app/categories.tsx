import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from 'app/lib/ApiCalls'

export default function categories() {
    const { data: Categories, isLoading, error } = useQuery<{ categories: Category[] }>({
        queryKey: ['categories'],
        queryFn: getCategories,
    })
    const router = useRouter()
    const handleClick = (id:number) => {
        router.push(`/byCategories/${id}`)
    }
    return (
        <View className='flex-1 gap-8'>
            {/* Header */}
            <View className='border-b mt-2 border-b-[#d6d7d8] pb-4 px-4 justify-center items-center flex'>
                <View className='relative w-full items-center'>
                    <Text className='text-2xl font-semibold'>Categories</Text>
                    <Pressable className='absolute left-0' onPress={() => router.back()}>
                        <Text className='font-semibold text-xl text-[#13EC5B]'>
                            <MaterialIcons name={'chevron-left'} size={35} color={'#000'} />
                        </Text>
                    </Pressable>

                </View>
            </View>
            {/* Body */}
            <View className='gap-4 flex-1'>
                {
                    isLoading && (
                        <Text className='text-center mt-10'>Loading categories…</Text>
                    )
                }

                {
                    error && (
                        <Text className='text-center mt-10'>Something exploded 💥</Text>
                    )
                }

                {
                    !isLoading && !error && (
                        <FlatList
                            data={Categories?.categories}
                            contentContainerClassName='px-4 gap-4'
                            bounces
                            renderItem={({ item }) => (
                                <Pressable onPress={() => handleClick(item.id)} className='h-20 justify-center bg-white shadow-[0_3px_5px_rgb(0,0,0,0.1)] items-center gap-4 flex-row px-4 py-2 rounded-2xl'>
                                    <View
                                        style={{ backgroundColor: `${item.color}40` }}
                                        className='rounded-full justify-center items-center size-14'
                                    >
                                        <MaterialIcons
                                            name={item.icon as any}
                                            color={item.color}
                                            size={25}
                                        />
                                    </View>

                                    <View className='flex-row justify-between items-center flex-1'>
                                        <Text className='text-lg text-[#102216] font-semibold'>
                                            {item.name}
                                        </Text>
                                        <MaterialIcons name='chevron-right' color='#6B7280' size={25} />
                                    </View>
                                </Pressable>
                            )}
                        />
                    )
                }
            </View>
            <View className='size-20 shadow-[0_3px_10px_rgb(0,0,0,0.2)] items-center justify-center rounded-full absolute bottom-10 right-4 bg-[#13EC5B]' >
                <MaterialIcons name={'add'} color={'#102216'} size={35} className='font-bold' />
            </View>
        </View>
    )
}