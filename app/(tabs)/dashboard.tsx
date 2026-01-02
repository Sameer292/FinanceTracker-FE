import { useQuery } from '@tanstack/react-query'
import { TrendUp, TrendDown } from 'app/assets/SVGIcons/SVGIconsCustom'
import { ListSkeleton } from 'app/components/ListSkeleton'
import { TransactionCard } from 'app/components/TransactionCard'
import { useAuth } from 'app/context/AuthContext'
import { getRecentTransactions } from 'app/lib/ApiCalls'
import { formatDate } from 'app/lib/utilityFns'
import { Link } from 'expo-router'
import { FlatList, Pressable, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-remix-icon'

export default function dashboard() {
  const { user } = useAuth()

  const { data: latestTransactions, isFetching, refetch: refetchRecentTransactions, isLoading: isRecentTransactionsLoading, error } = useQuery<{ transactions: TransactionType[] }>({
    queryKey: ['recentTransactions'],
    queryFn: getRecentTransactions
  })
  const isInitialLoading = isRecentTransactionsLoading && !latestTransactions

  return (
    <View className='gap-4 flex-1 items-center pt-5 px-4 justify-center bg-white relative'>
      {/* Header */}
      <View className='w-full flex py-2 '>
        <View className='flex justify-between flex-row'>
          <Text className='font-nunito-bold text-2xl'>Good evening, {user?.name.split(' ')[0]}</Text>
          <View className='gap-4 flex-row'>
            <Pressable onPress={() => console.log("Search")}>
              <Icon name='search-line' color='#8395A7' size={25} />
            </Pressable>
            <Link href='/categories'>
              <Icon name='box-3-line' color='#8395A7' size={25} />
            </Link>
          </View>
        </View>
        <Text className='font-nunito-medium text-lg'>
          {
            formatDate(new Date())
          }
        </Text>
      </View>
      {/* Body */}
      <View className='w-full gap-3'>
        <View className='flex-row justify-between border-[0.5] items-center border-[#A9DFBF] bg-linear-to-r from-[#F5F7FA] to-[#F1F9F4] rounded-lg pl-4.5 pr-5'>
          <View className='py-4'>
            <Text className='text-[#8395A7] text-lg font-nunito-semibold'>Total Income</Text>
            <Text className='text-[#37474F] text-xl font-nunito-bold'>$ {user?.current_balance ?? 0.00}</Text>
          </View>
          <View>
            <TrendUp />
          </View>
        </View>
        <View className='flex-row justify-between items-center pr-5 border-[0.5] border-[#FADBD8] bg-linear-to-r from-[#F5F7FA] to-[#FEF5F5] rounded-lg pl-4.5'>
          <View className='py-4'>
            <Text className='text-[#8395A7] text-lg font-nunito-semibold'>Total Expense</Text>
            <Text className='text-[#37474F] text-xl font-nunito-bold'>$ {user?.current_balance ?? 0.00}</Text>
          </View>
          <View>
            <TrendDown />
          </View>
        </View>
      </View>
      <View className='flex-1 gap-4 mt-4 w-full'>
        <View className='w-full justify-between flex-row items-center'>
          <Text className='text-lg font-nunito-semibold'>
            Recent Transactions
          </Text>
          {
            latestTransactions && latestTransactions?.transactions.length > 0 && (
              <TouchableOpacity className='p-4' onPress={() => console.log("See all")}>
                <Text className='text-[#8395A7] font-nunito-semibold text-sm'>See All</Text>
              </TouchableOpacity>
            )
          }
        </View>
        {isInitialLoading && (
          <View className="gap-2 w-full">
            {Array.from({ length: 5 }).map((_, i) => (
              <ListSkeleton key={i} />
            ))}
          </View>
        )}


        {error && (
          <View className="items-center gap-2 mt-10">
            <Text>{(error as Error)?.message || 'Failed to load transactions'}</Text>
            <Pressable onPress={() => refetchRecentTransactions()} className="px-4 py-2 bg-[#06D6A0] rounded-lg">
              <Text className="text-white">Retry</Text>
            </Pressable>
          </View>
        )}
        {isFetching && !isInitialLoading && (
          <Text className='text-center text-[#8395A7] mb-2'>Refreshing…</Text>
        )}
        {
          !isRecentTransactionsLoading && !error &&
          <FlatList
            data={latestTransactions?.transactions ?? []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <TransactionCard {...item} currency='$' />}
            showsVerticalScrollIndicator={false}
            contentContainerClassName='items-center pb-20 gap-2.5 pt-1.5 grow'
            onRefresh={refetchRecentTransactions}
            refreshing={isFetching}
            ListEmptyComponent={
              () => (
                <View className='items-center gap-2 justify-center flex-1'>
                  <Icon name='receipt-fill' color='#06D6A0' size={24} />
                  <Text className='text-center text-x font-nunito-semibold'>No transactions yet.</Text>
                  <Text className='text-[#8395A7] text-lg text-center font-nunito-regular'>
                    Start tracking your spending by adding your first expense or income.
                  </Text>
                </View>
              )
            }
            ListFooterComponent={
              () => (latestTransactions && latestTransactions?.transactions.length > 0) && (
                <TouchableOpacity className='border-[#D9E3E8] mt-5 border rounded-lg px-4 py-2.5 w-max' onPress={() => console.log('Bottom btn')}>
                  <Text className='text-[#118AB2] text-sm font-nunito-medium'>
                    See All
                  </Text>
                </TouchableOpacity>
              )
            }
          />
        }
      </View>
      <View className='absolute bottom-4 right-4'>
        <Link href='/addTransactions' className='bg-[#06D6A0] border border-[#D9E3E8] rounded-full p-3'>
          <Icon name='add-line' color='white' size={24} />
        </Link>
      </View>
    </View>
  )
}
