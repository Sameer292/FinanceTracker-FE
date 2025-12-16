import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useQuery } from '@tanstack/react-query'
import { ExpenseCategories as categories } from 'app/assets/expenses'
import { CategorySelect } from 'app/components/CategorySelect'
import { DeteSelect } from 'app/components/DateSelect'
import { TransactionCard } from 'app/components/TransactionCard'
import { getCategories, getTransactions } from 'app/lib/ApiCalls'
import { splitByDateRanges } from 'app/lib/utilityFns'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import { ScrollShadow } from 'heroui-native'
import React, { useCallback, useMemo, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { RefreshControl } from 'react-native'

export default function transactions() {
  const { data: MyTransactions, isLoading, error, refetch } = useQuery<{ transactions: TransactionType[] }>({
    queryKey: ['transactions'],
    queryFn: getTransactions,
    refetchInterval: 5000
  })
  const { data: categories, isLoading: isCategoryLoading, error: categoryError } = useQuery<{ categories: Category[] }>({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
  const [selectedCategories, setSelectedCategories] = useState<number[] | null>([])

  const toggleItem = (Id: number) => {
    setSelectedCategories((prev) =>
      prev?.includes(Id) ? prev.filter((v) => v !== Id) : [...prev!, Id]
    );
  }
  const selectAll = () => {
    setSelectedCategories(categories?.categories?.map((c) => c.id) ?? null);
  }

  const removeAll = () => {
    setSelectedCategories([]);
  }

  const filteredTransactions = MyTransactions?.transactions?.filter((transaction) => {
    if (selectedCategories?.length === 0) return true
    return selectedCategories?.includes(transaction.category_id)
  })
  const { today, yesterday, lastWeek } = useMemo(() => {
    return splitByDateRanges<TransactionType>(filteredTransactions ?? [])
  }, [filteredTransactions])


  return (
    <View className='bg-[#F6F8F6] gap-4 flex h-full items-center justify-center' >
      {/* Header */}
      <View className='flex flex-row px-4 mt-2 items-center'>
        <View className='items-center flex-1' >
          <Text className='text-2xl font-bold ' >
            Transactions
          </Text>
        </View>
        <Link href={'/addTransactions'} className='absoluteRefreshControl right-5'>
          <View className='bg-[#13EC5B] rounded-full'>
            <MaterialIcons size={25} style={{ fontWeight: '900' }} name="add" color="white" />
          </View>
        </Link>
      </View>
      {/* Body */}
      <View className='flex-1 gap-4 w-full '>
        <View className='w-full px-4 justify-between gap-4 flex-row' >
          <DeteSelect />
          <CategorySelect
            ToggleItem={toggleItem}
            selectAll={selectAll}
            removeAll={removeAll}
            selectedCategories={selectedCategories ?? []}
            setSelectedCategories={setSelectedCategories}
            categorieslength={categories?.categories.length ?? 0}
          />
          <View className='flex-1 items-center bg-[#EEF0F1] rounded-full h-14 justify-center ' >
            <Text className='text-lg font-bold' >All</Text>
          </View>
        </View>
        <ScrollShadow className='flex-1' visibility='top' LinearGradientComponent={LinearGradient} color={'#565656'} size={15}>
          <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />} className='flex-1 p-2 px-4' showsVerticalScrollIndicator={false} contentContainerClassName='pb-8 gap-8'>
            {
              today.length > 0 && (
                <View className='flex-1 gap-4'>
                  <Text className='text-center text-2xl text-900 font-bold text-[#6B7280]' >Today</Text>
                  <View className='flex-1 gap-4' >
                    {
                      today.map((transaction) => {
                        return (
                          <TransactionCard key={transaction.id} {...transaction} currency={"$"} />
                        )
                      })
                    }
                  </View>

                </View>
              )
            }
            {
              yesterday.length > 0 && (
                <View className='flex-1 gap-4'>
                  <Text className='text-center text-2xl text-900 font-bold text-[#6B7280]'>Yesterday</Text>
                  <View className='flex-1 gap-4' >
                    {
                      yesterday.map((transaction) => {
                        return (
                          <TransactionCard
                            key={transaction.id}
                            {...transaction}
                            currency={"$"}
                          />
                        )
                      })
                    }
                  </View>

                </View>
              )
            }
            {
              today.length == 0 && yesterday.length == 0 && lastWeek.length == 0 && (
                <Text>
                  Add transaction
                </Text>
              )
            }
            {
              lastWeek.length > 0 && (
                <View className='flex-1 gap-4'>
                  <Text className='text-center text-2xl text-900 font-bold text-[#6B7280]'>Last 7 days</Text>
                  <View className='flex-1 gap-4' >
                    {
                      lastWeek.map((transaction) => {
                        return (
                          <TransactionCard
                            key={transaction.id}
                            {...transaction}
                            currency={"$"}
                          />
                        )
                      })
                    }
                  </View>
                </View>
              )
            }
          </ScrollView>
        </ScrollShadow>
      </View>
    </View>
  )
}
