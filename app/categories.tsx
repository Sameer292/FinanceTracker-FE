import { Link, useRouter } from 'expo-router'
import { useMemo, useState } from 'react'
import { FlatList, Pressable, Text, TextInput, View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from 'app/lib/ApiCalls'
import Icon from 'react-native-remix-icon'
import { isValidIcon } from 'app/lib/utilityFns'
import { ListSkeleton } from 'app/components/ListSkeleton'

export default function Categories() {
    const { data: Categories, isLoading, error, refetch, isFetching } = useQuery<{ categories: Category[] }>({
        queryKey: ['categories'],
        queryFn: getCategories,
    })
    const [searchText, setSearchText] = useState('')
    const router = useRouter()
    const handleClick = (id: number) => {
        router.push(`/byCategories/${id}`)
    }
    const filteredCategories = useMemo(() => {
        if (!Categories?.categories) return []
        return Categories.categories.filter(c =>
            c.name.toLowerCase().includes(searchText.toLowerCase())
        )
    }, [Categories, searchText])
    const isInitialLoading = isLoading && !Categories

    return (
        <View className='flex-1 gap-4 pt-5 bg-white '>
            {/* Header */}
            <View className='pb-4 px-4 gap-4 justify-center items-center flex'>
                <View className='w-full gap-2 flex-row items-center'>
                    <Pressable onPress={() => router.back()}>
                        <Text className='font-semibold text-xl text-[#13EC5B]'>
                            <Icon name={'arrow-left-s-line'} size={35} color={'#000'} />
                        </Text>
                    </Pressable>
                    <Text className='font-nunito-bold text-xl'>Categories</Text>
                </View>
                <View className='w-full flex-row items-center gap-2 border border-[#D9E3E8] rounded-lg  px-3'>
                    <Icon name='search-line' color='#8395A7' size={20} />
                    <TextInput placeholderTextColor={'#8395A7'} value={searchText} onChangeText={setSearchText} placeholder='Search' className='font-nunito-regular flex-1 text-lg text-[#37474F]' />
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
                {isInitialLoading && (
                    <View className="gap-4 px-4 mt-4">
                        {Array.from({ length: 7 }).map((_, i) => (
                            <ListSkeleton isLoading={isInitialLoading} key={i} />
                        ))}
                    </View>
                )}

                {error && (
                    <View className="items-center gap-2 px-4 mt-10">
                        <Text>Failed to load categories</Text>
                        <Pressable onPress={() => refetch()}>
                            <Text className="text-[#06D6A0]">Tap to retry</Text>
                        </Pressable>
                    </View>
                )}

                {
                    !isInitialLoading && !error && (
                        <FlatList
                            data={filteredCategories ?? []}
                            keyExtractor={(item) => item.id.toString()}
                            refreshing={isFetching}
                            onRefresh={refetch}
                            showsVerticalScrollIndicator={false}
                            contentContainerClassName='gap-4 pb-20'
                            renderItem={({ item }) => (
                                <Pressable onPress={() => handleClick(item.id)} className='justify-center w-full items-center gap-4 flex-row py-4 px-3 border border-[#D9E3E8] rounded-2xl'>
                                    <View style={{ backgroundColor: item.color, borderRadius: '100%' }} className={`size-15 justify-center items-center`} >
                                        <Icon
                                            name={isValidIcon(item.icon) ? item.icon : 'question-mark'}
                                            size={24}
                                            color="white"
                                        />
                                    </View>
                                    <View className='flex-row justify-between items-center flex-1'>
                                        <Text className='font-nunito-bold text-lg text-[#37474F]'>
                                            {item.name}
                                        </Text>
                                        <Icon name='arrow-right-s-line' color='#6B7280' size={35} />
                                    </View>
                                </Pressable>
                            )}
                            ListEmptyComponent={() => {
                                if (Categories?.categories && Categories?.categories.length > 0 && filteredCategories?.length === 0 && searchText.length > 0) {
                                    return <View className='items-center gap-2 justify-center flex-1 -mt-50'>
                                        <Icon name='menu-search-fill' color='#06D6A0' size={24} />
                                        <Text className='text-center text-xl font-nunito-semibold'>No matches found.</Text>
                                        <Text className='text-[#8395A7] text-lg text-center font-nunito-regular'>
                                            We couldn't find anything for "{searchText}". Check your spelling or try a different category.
                                        </Text>
                                    </View>
                                } else {
                                    return <View className='items-center gap-2 justify-center flex-1 -mt-50'>
                                        <Icon name='box-3-fill' color='#06D6A0' size={24} />
                                        <Text className='text-center text-xl font-nunito-semibold'>No categories yet.</Text>
                                        <Text className='text-[#8395A7] text-lg text-center font-nunito-regular'>
                                            Create categories to organize your spending and see where your money goes.
                                        </Text>
                                    </View>
                                }
                            }}
                            ListFooterComponent={
                                isFetching ? (
                                    <Text className="text-center text-[#8395A7] mt-4">
                                        Refreshing…
                                    </Text>
                                ) : null
                            }
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
