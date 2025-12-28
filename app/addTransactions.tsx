import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Dialog } from 'heroui-native'
import React from 'react'
import { Pressable, ScrollView, Text, TextInput, View, KeyboardAvoidingView } from 'react-native'
import { DatePickerModal } from 'react-native-paper-dates';
import apiClient from 'app/lib/api'
import { useQuery,  } from '@tanstack/react-query'
import { getCategories } from 'app/lib/ApiCalls'
import { toast } from 'sonner-native'

export default function transactions() {
  const [selectedType, setSelectedType] = React.useState<'expense' | 'income'>('expense')
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<number>(0)
  const [isSelectingDate, setIsSelectingDate] = React.useState<boolean>(false)
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date())
  const [selectedAmount, setSelectedAmount] = React.useState<string>('')
  const [note, setNote] = React.useState<string>('')
  const { data: categories, isLoading, error } = useQuery<{ categories: Category[] }>({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
  const handleSubmit = async () => {
    const date = selectedDate.toISOString().split('T')[0]
    try{
      const res = await apiClient.post('/transactions', {
      transaction_type: selectedType,
      category_id: selectedCategoryId,
      transaction_date: date,
      amount: Number(selectedAmount),
      note
    })
    if(res.status === 200 && res.data.message.includes('transaction added') && res.data.id){
      toast.success('Transaction added successfully',{
        richColors:true,
        duration:2000
      })
      router.back()
    }
  }catch(err){
    toast.error('Failed to add transaction')
  }
  }
  return (
    <KeyboardAvoidingView behavior='padding' className='flex-1'>

      <View className='flex-1 px-4 gap-8'>
        {/* Header */}
        <View className='mt-2 justify-center items-center flex'>
          <View className='relative w-full items-center'>
            <Text className='text-2xl font-semibold'>Add Transaction</Text>
            <Pressable className='absolute left-0' onPress={() => router.back()}>
              <Text className='font-semibold text-xl text-[#13EC5B]'>
                <MaterialIcons name={'chevron-left'} size={35} color={'#000'} />
              </Text>
            </Pressable>
          </View>
        </View>
        {/* Body */}
        <View className='flex-1 pb-10'>
          <View className='gap-8 flex-1'>
            <View className='bg-[#E2E8F0] h-16 rounded-xl gap-4 px-2  items-center flex flex-row justify-between'>
              <Pressable
                {...(selectedType === 'expense' && { style: { elevation: 10, backgroundColor: '#13EC5B' } })}
                onPress={() => setSelectedType('expense')}
                className='flex-1 w-full h-12 rounded-lg justify-center items-center'
              >
                <Text style={{ color: selectedType === 'expense' ? 'black' : '#4D5B6F' }} className='text-lg font-semibold'>Expense</Text>
              </Pressable>
              <Pressable
                {...(selectedType === 'income' && { style: { elevation: 10, backgroundColor: '#13EC5B' } })}
                onPress={() => setSelectedType('income')}
                className='flex-1 w-full h-12 rounded-lg justify-center items-center'
              >
                <Text style={{ color: selectedType === 'income' ? 'black' : '#4D5B6F' }} className='text-lg font-semibold'>Income</Text>
              </Pressable>
            </View>
            <View className='justify-center items-center h-24'>
              <TextInput
                placeholder='$0.00'
                className='text-6xl text-black font-bold flex-1 w-full text-center'
                placeholderTextColor={'black'}
                caretHidden
                keyboardType='numeric'
                onChangeText={(text) => setSelectedAmount(text)}
              />
            </View>
            <View className='flex-1 gap-4'>

              <CategorySelector categories={categories?.categories} isLoading={isLoading} selectedCategoryId={selectedCategoryId} ToggleItem={setSelectedCategoryId} />
              <Pressable onPress={() => setIsSelectingDate(true)} className='justify-between bg-white rounded-2xl shadow-[0_3px_5px_rgb(0,0,0,0.1)] flex flex-row px-4 h-20 items-center'>
                <View className='flex-row gap-4 items-center'>
                  <View className='bg-[#D0FBDE] justify-center items-center size-12 shadow-[0_3px_2px_rgb(0,0,0,0.1)] rounded-lg'>
                    <MaterialIcons name='calendar-month' size={25} />
                  </View>
                  <Text className='text-lg font-semibold'>
                    Date
                  </Text>
                </View>
                <View className='flex-row items-center gap-2'>
                  <Text className='text-[#94A3B8] text-lg font-semibold'>
                    Today
                  </Text>
                  <MaterialIcons size={35} color={'#94A3B8'} name={'chevron-right'} />
                </View>
              </Pressable>
              <DatePickerModal
                locale='en'
                visible={isSelectingDate}
                onDismiss={() => setIsSelectingDate(false)}
                mode="single"
                date={selectedDate}
                onConfirm={(params) => { setSelectedDate(params?.date ?? new Date()); setIsSelectingDate(false) }}
                animationType='slide'
                presentationStyle='overFullScreen'
              />
              <View className='justify-between bg-white rounded-2xl shadow-[0_3px_5px_rgb(0,0,0,0.1)] flex flex-row px-4 h-fit items-center'>
                <View className='flex-row pt-4 gap-2 '>
                  <View className='bg-[#D0FBDE] justify-center items-center size-12 shadow-[0_3px_2px_rgb(0,0,0,0.1)] rounded-lg'>
                    <MaterialIcons name='description' size={25} />
                  </View>
                  <TextInput
                    placeholder="Add a note..."
                    className="flex flex-1 text-md h-36 text-black font-bold w-full"
                    placeholderTextColor="#94A3B8"
                    multiline
                    textAlignVertical="top"
                    onChangeText={(text) => setNote(text)}
                  />
                </View>
              </View>

            </View>
          </View>

          <View>
            <Pressable onPress={handleSubmit} className='bg-[#13EC5B] h-14 justify-center items-center rounded-xl mt-4'>
              <Text className='text-xl font-semibold' >
                Add Transaction
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>

  )
}

const CategorySelector = ({ selectedCategoryId, ToggleItem, categories, isLoading }: { isLoading: boolean, categories?: Category[], selectedCategoryId: number, ToggleItem: (categoryId: number) => void }) => {
  return (
    <Dialog >
      <Dialog.Trigger >
        <View className='justify-between  bg-white rounded-2xl shadow-[0_3px_5px_rgb(0,0,0,0.1)] flex flex-row px-4 h-20 items-center'>
          <View className='flex-row gap-4 items-center'>
            <View className='bg-[#D0FBDE] justify-center items-center size-12 shadow-[0_3px_2px_rgb(0,0,0,0.1)] rounded-lg'>
              <MaterialIcons name='label' size={25} />
            </View>
            <Text className='text-lg font-semibold'>
              Category
            </Text>
          </View>
          <View className='flex-row items-center gap-2'>
            <Text className='text-[#94A3B8] text-lg font-semibold'>
              {/* Groceries */}
              {
                categories?.find((category) => category.id === selectedCategoryId)?.name
              }
            </Text>
            <MaterialIcons size={35} color={'#94A3B8'} name={'chevron-right'} />
          </View>
        </View>
      </Dialog.Trigger>
      <Dialog.Portal className='px-4 '>
        <Dialog.Overlay />

        <Dialog.Content isSwipeable={false}

          className="border border-[#F3F4F6] inset-0 bg-opacity-30 rounded-2xl bg-white shadow-[1px_1px_25px_5px_rgba(0,0,0,0.29)]">

          {/* Header */}
          <View className="flex-row items-center justify-between border-b border-[#F3F4F6] px-4 py-3">
            <Text className="text-md font-bold uppercase tracking-wider text-gray-500">
              Select Category
            </Text>
          </View>
          {
            isLoading &&
            <View className="flex-row items-center justify-between border-b border-[#F3F4F6] px-4 py-3">
              <Text className="text-md font-bold uppercase tracking-wider text-gray-500">
                Loading...
              </Text>
            </View>
          }
          {/* Category list */}
          {
            !isLoading &&
            <ScrollView className="max-h-80 p-2 " contentContainerClassName='pb-4'>
              {categories?.map((category) => {
                const isChecked = selectedCategoryId === category.id;
                return (
                  <Pressable
                    key={category.id}
                    onPress={() => ToggleItem(category.id)}
                    className="flex-row items-center gap-3 rounded-xl p-2"
                  >
                    {/* Icon bubble */}
                    <View
                      style={{ backgroundColor: `${category.color}20` }}
                      className="size-11 rounded-full items-center justify-center"
                    >
                      <MaterialIcons name={category.icon as any} size={20} color={category.color} />
                    </View>

                    {/* Label */}
                    <Text className="flex-1 text-md font-semibold text-gray-700">
                      {category.name}
                    </Text>

                    {/* Checkbox */}
                    <View
                      className={`
                    h-6 w-6 rounded  
                    ${isChecked ? "bg-[#15c34f] border-0" : "border-gray-300 border"} 
                    flex justify-center items-center
                      `}>
                      <MaterialIcons name={'check'} className=' font-bold self-center text-900' size={15} color={'white'} />
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>
          }
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog >
  )
}