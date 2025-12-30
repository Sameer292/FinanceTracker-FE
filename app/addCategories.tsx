import {
    View,
    Text,
    Pressable,
    TextInput,
    FlatList,
} from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import Icon, { IconName } from 'react-native-remix-icon'
import { usePagerView } from 'react-native-pager-view'

export default function AddCategories() {
    const [categoryName, setCategoryName] = useState('')
    const [selectedIcon, setSelectedIcon] = useState<IconName>('box-3-fill')
    const [selectedColor, setSelectedColor] = useState('#297EB5')
    const { activePage, pages, progress, PagerView } = usePagerView({ pagesAmount: 3 })
    console.log({
        activePage,
        pages,
        progress
    })
    const [pageIndex, setPageIndex] = useState(0)
    const TOTAL_PAGES = 3
    const Icons = [
        'box-3-fill',
        'shopping-bag-3-fill',
        'car-fill',
        'home-2-fill',
        'restaurant-fill',
        'plane-fill',
        'heart-fill',
        'movie-2-fill',
        'music-fill',
        'book-2-fill',
        'game-fill',
        'gift-fill',
        'car-fill',
        'phone-fill',
        'bus-fill',
        'train-fill',
        'taxi-fill',
        'box-2-fill',
        'camera-fill',
        'chat-3-fill',
        'phone-fill'
    ]

    const previewBg = selectedColor || '#D5DEE3'
    const iconColor = selectedColor ? '#fff' : '#8193A4'
    const canSave = categoryName.trim().length > 0
    return (
        <View className="flex-1 bg-white px-4 pt-5 pb-10">
            {/* Header */}
            <View className="flex-row items-center gap-2 mb-10">
                <Pressable onPress={() => router.back()}>
                    <Icon name="arrow-left-s-line" size={32} color="#444" />
                </Pressable>
                <Text
                    className="text-xl"
                    style={{ fontFamily: 'Nunito_700Bold' }}
                >
                    Add Category
                </Text>
            </View>

            {/* Body */}
            <View className="flex-1 justify-between">
                <View className="gap-8 flex-1">
                    {/* Preview */}
                    <View className="items-center">
                        <View
                            className="size-25 items-center justify-center"
                            style={{
                                backgroundColor: previewBg,
                                borderRadius: 80,
                            }}
                        >
                            <Icon name={selectedIcon} size={42} color={iconColor} />
                        </View>
                    </View>

                    {/* Form */}
                    <View className="gap-4 flex-1">
                        <View className="gap-2">
                            <Text
                                className="text-lg"
                                style={{ fontFamily: 'Nunito_500Medium' }}
                            >
                                Category Name
                            </Text>
                            <TextInput
                                className="border border-[#D9E3E8] rounded-lg px-4 py-3"
                                placeholder="Enter category name"
                                value={categoryName}
                                onChangeText={setCategoryName}
                            />
                        </View>

                        <View className="gap-3">
                            <Text className="text-lg" style={{ fontFamily: 'Nunito_500Medium' }}>Category Icon</Text>
                            <PagerView initialPage={0} onPageSelected={(e) => setPageIndex(e.nativeEvent.position)} style={{ height: 161, justifyContent: 'center', alignItems: 'center' }}>
                                <FlatList
                                    key={"1"}
                                    numColumns={7}
                                    data={Icons}
                                    columnWrapperClassName='gap-2'
                                    contentContainerClassName='gap-2 justify-center items-center'
                                    keyExtractor={(item) => item}
                                    renderItem={({ item }) => (
                                        <CategoryIconSelect item={item as IconName} selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />
                                    )}
                                />
                                <FlatList
                                    key={"2"}
                                    numColumns={7}
                                    data={Icons}
                                    columnWrapperClassName='gap-2'
                                    contentContainerClassName='gap-2 justify-center items-center'
                                    keyExtractor={(item) => item}
                                    renderItem={({ item }) => (
                                        <CategoryIconSelect item={item as IconName} selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />
                                    )}
                                />
                                <FlatList
                                    key={"3"}
                                    numColumns={7}
                                    data={Icons}
                                    columnWrapperClassName='gap-2'
                                    contentContainerClassName='gap-2 justify-center items-center'
                                    keyExtractor={(item) => item}
                                    renderItem={({ item }) => (
                                        <CategoryIconSelect item={item as IconName} selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />
                                    )}
                                />
                            </PagerView>
                            <View className="flex-row justify-center gap-2 mt-2">
                                {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
                                    <View
                                        key={i}
                                        className={`size-2 rounded-full ${pageIndex === i ? 'bg-[#38474F]' : 'bg-[#858F93]'}`}
                                    />
                                ))}
                            </View>
                        </View>
                        <View className="gap-2">
                            <Text style={{ fontFamily: 'Nunito_500Medium' }} className='text-lg'>
                                Category Color
                            </Text>
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={[
                                    '#F39C12',
                                    '#27AE60',
                                    '#2A7EB5',
                                    '#8C44AA',
                                    '#35495D',
                                    '#E31F62',
                                    '#CFA90E',
                                    '#18A287',
                                ]}
                                contentContainerClassName='gap-2 py-1 justify-center'
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <Pressable
                                        onPress={() => setSelectedColor(item)}
                                    >
                                        <View style={{ backgroundColor: item }} className='rounded-full size-14'>
                                        </View>
                                    </Pressable>
                                )}
                            />
                        </View>
                    </View>
                </View>

                {/* Save */}
                <View className='gap-2'>
                    <Pressable
                        onPress={() => console.log("Add category")}
                        className={`h-14 rounded-lg items-center justify-center bg-[#07D19D]`}
                    >
                        <Text className="text-lg text-white" style={{ fontFamily: 'Nunito_700Bold' }}>Add Category</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => console.log("Cancel")}
                        className={`h-14 border-2 border-[#118AB2] rounded-lg items-center justify-center`}
                    >
                        <Text className="text-lg text-[#118AB2]" style={{ fontFamily: 'Nunito_600SemiBold' }}>Cancel</Text>
                    </Pressable>
                </View>
            </View>
        </View >
    )
}

const CategoryIconSelect = ({ item, setSelectedIcon, selectedIcon }: { item: IconName, setSelectedIcon: React.Dispatch<React.SetStateAction<IconName>>, selectedIcon: IconName }) => {
    return (
        <Pressable
            onPress={() => setSelectedIcon(item as IconName)}
            className={`size-14 items-center p-2 justify-center`}
        >
            <View className={`items-center justify-center size-14 ${selectedIcon === item ? 'bg-[#C5EAF2] border border-[#118AB2]' : 'bg-[#F0F4F8]'} rounded-full`}>
                <Icon
                    name={item as IconName}
                    size={24}
                    color={selectedIcon === item ? '#1388AF' : '#8193A4'}
                />
            </View>
        </Pressable>
    )
}