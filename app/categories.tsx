import { MaterialIcons } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'
import { useState } from 'react'
import { FlatList, Pressable, Text, TextInput, View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from 'app/lib/ApiCalls'
import Icon from 'react-native-remix-icon'

export default function categories() {
    const { data: Categories, isLoading, error } = useQuery<{ categories: Category[] }>({
        queryKey: ['categories'],
        queryFn: getCategories,
    })
    const [searchText, setSearchText] = useState('')
    const router = useRouter()
    const handleClick = (id: number) => {
        router.push(`/byCategories/${id}`)
    }
    const filteredCategories = Categories?.categories.filter((category) =>
        category.name.toLowerCase().includes(searchText.toLowerCase())
    )
    return (
        <View className='flex-1 px-4 gap-4 pt-5 bg-white '>
            {/* Header */}
            <View className='pb-4 gap-4 justify-center items-center flex'>
                <View className='w-full gap-2 flex-row items-center'>
                    <Pressable onPress={() => router.back()}>
                        <Text className='font-semibold text-xl text-[#13EC5B]'>
                            <MaterialIcons name={'chevron-left'} size={35} color={'#000'} />
                        </Text>
                    </Pressable>
                    <Text style={{ fontFamily: 'Nunito_700Bold' }} className='text-xl'>Categories</Text>
                </View>
                <View className='w-full flex-row items-center gap-2 border border-[#D9E3E8] rounded-lg  px-3'>
                    <Icon name='search-line' color='#8395A7' size={20} />
                    <TextInput placeholderTextColor={'#8395A7'} value={searchText} style={{ fontFamily: 'Nunito_400Regular' }} onChangeText={setSearchText} placeholder='Search' className='flex-1 text-lg text-[#37474F]' />
                    {
                        searchText.length > 0 &&
                        <Pressable onPress={() => setSearchText('')}>
                            <Icon name='close-circle-line' color='#8395A7' size={25} />
                        </Pressable>
                    }
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
                            data={filteredCategories as Category[]}
                            contentContainerClassName='gap-4 flex-1 items-center '
                            bounces
                            renderItem={({ item }) => (
                                <Pressable onPress={() => handleClick(item.id)} className='justify-center w-full items-center gap-4 flex-row py-4 px-3 border border-[#D9E3E8] rounded-2xl'>
                                    <View style={{ backgroundColor: item.color, borderRadius: 30 }} className={`size-15 justify-center items-center`} >
                                        <MaterialIcons name={item.icon as any} size={24} color={'white'} />
                                        {/* <Icon name={item.icon as IconName} size={24} color="white"/> */}
                                    </View>
                                    <View className='flex-row justify-between items-center flex-1'>
                                        <Text style={{ fontFamily: 'Nunito_700Bold' }} className='text-lg text-[#37474F]'>
                                            {item.name}
                                        </Text>
                                        <MaterialIcons name='chevron-right' color='#6B7280' size={35} />
                                    </View>
                                </Pressable>
                            )}
                            ListEmptyComponent={() => {
                                if (Categories?.categories && Categories?.categories.length > 0 && filteredCategories?.length === 0 && searchText.length > 0) {
                                    return <View className='items-center gap-2 justify-center flex-1 -mt-50'>
                                        <Icon name='menu-search-fill' color='#06D6A0' size={24} />
                                        <Text className='text-center text-xl' style={{ fontFamily: 'Nunito_600SemiBold' }}>No matches found.</Text>
                                        <Text className='text-[#8395A7] text-lg text-center' style={{ fontFamily: 'Nunito_400Regular' }}>
                                            We couldn't find anything for "{searchText}". Check your spelling or try a different category.
                                        </Text>
                                    </View>
                                } else {
                                    return <View className='items-center gap-2 justify-center flex-1 -mt-50'>
                                        <Icon name='box-3-fill' color='#06D6A0' size={24} />
                                        <Text className='text-center text-xl' style={{ fontFamily: 'Nunito_600SemiBold' }}>No categories yet.</Text>
                                        <Text className='text-[#8395A7] text-lg text-center' style={{ fontFamily: 'Nunito_400Regular' }}>
                                            Create categories to organize your spending and see where your money goes.
                                        </Text>
                                    </View>
                                }
                            }}
                        />
                    )
                }
            </View>
            <View className='absolute bottom-14 right-4'>
                <Link href='/addCategories' className='bg-[#06D6A0] border border-[#D9E3E8] rounded-full p-3'>
                    <Icon name='add-line' color='white' size={24} />
                </Link>
            </View>
        </View>
    )
}