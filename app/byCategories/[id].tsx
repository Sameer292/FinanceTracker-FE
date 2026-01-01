import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getCategoryById, getTransactionsByCategory } from 'app/lib/ApiCalls';
import { TransactionCard } from 'app/components/TransactionCard';
import Icon from 'react-native-remix-icon';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollShadow } from 'heroui-native';

export default function Screen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: transactions, isLoading, error, refetch:refetchTransactions } = useQuery<{ transactions: TransactionType[] }>({
    queryKey: ['transactionsByCategory', id],
    queryFn: () => getTransactionsByCategory(Number(id)),
  })
  const { data: categoryResponse, isLoading: isCategoryLoading, error: categoryError } = useQuery<Category>({
    queryKey: ['categoryById', id],
    queryFn: () => getCategoryById(Number(id)),
  })

  if (isLoading) {
    return <View className='flex-1 justify-center items-center'>
      <ActivityIndicator size={25} />
      <Text>
        Loading Transactions...
      </Text>
    </View>
  }
  return (
    <View className='flex-1 gap-4'>
      {/* Header */}
      <View className='border-b mt-2 border-b-[#d6d7d8] pb-4 px-4 justify-center items-center flex'>
        <View className='flex-row gap-5 items-center w-full'>
          <Pressable onPress={() => router.back()}>
            <Text className='font-semibold text-xl text-[#13EC5B]'>
              <Icon name={'arrow-left-s-line'} size={35} color={'#000'} />
            </Text>
          </Pressable>
          <Text className='text-2xl font-semibold'>{categoryResponse?.name}</Text>
          <Pressable className='absolute right-0 '>
            <Text className='font-semibold text-xl text-[#13EC5B]'>
              Edit
            </Text>
          </Pressable>
        </View>
      </View>
      {
        !isLoading && !error &&
        <ScrollShadow className='flex-1 w-full' visibility='top' LinearGradientComponent={LinearGradient} color={'#949292'} size={10}>
          <FlatList
            data={transactions?.transactions}
            contentContainerClassName='px-4 gap-4 pb-10'
            bounces
            onRefresh={refetchTransactions}
            refreshing={isLoading}
            renderItem={({ item }) => (
              <TransactionCard
                amount={item.amount}
                currency={"$"}
                note={item.note}
                transaction_date={item.transaction_date}
                transaction_type={item.transaction_type}
                category_id={item.category_id}
                key={item.id}
              />
            )}
          />
        </ScrollShadow>
      }
    </View>
  )
}
