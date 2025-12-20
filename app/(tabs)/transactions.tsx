import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useQuery } from '@tanstack/react-query'
import { ItemsSelect } from 'app/components/ItemsSelectSheet'
import { TransactionCard } from 'app/components/TransactionCard'
import { getCategories, getTransactions } from 'app/lib/ApiCalls'
import { splitByDateRanges } from 'app/lib/utilityFns'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import { ScrollShadow } from 'heroui-native'
import React, { useMemo, useState } from 'react'
import { RefreshControl, ScrollView, Text, View } from 'react-native'

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
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState<number[]>([])
  const allTransactionTypes: { id: number; name: transactionTypes, color:string }[] = [ 
    { id: 1, name: 'expense', color:'#EF4444' },
    { id: 2, name: 'income', color:'#3B82F6' }, ]

const toggleTransactionTypeItem = (id: number) => {
  const item = allTransactionTypes.find(t => t.id === id)
  if (!item) return

  setSelectedTransactionTypes(prev =>
    prev.some(v => v === id)
      ? prev.filter(v => v !== id)
      : [...prev, id]
  )
}
  const toggleCategoryItem = (Id: number) => {
    setSelectedCategories((prev) =>
      prev?.includes(Id) ? prev.filter((v) => v !== Id) : [...prev!, Id]
    );
  }
  const selectAll = (selectAllCategories:boolean) => {
    if(selectAllCategories){
      setSelectedCategories(categories?.categories?.map((c) => c.id) ?? null);
    }else{
      setSelectedTransactionTypes(allTransactionTypes?.map((c) => c.id) ?? null);
    }
  }

  const removeAll = ( removeAllCategories:boolean ) => {
    if(removeAllCategories){
      setSelectedCategories([]);
    }else{
      setSelectedTransactionTypes([]);
    }
  }

const filteredTransactions = MyTransactions?.transactions?.filter(tx => {
  const matchCategory =
    selectedCategories?.length === 0 ||
    selectedCategories?.includes(tx.category_id)

  const matchType =
    selectedTransactionTypes.length === 0 ||
    selectedTransactionTypes.includes(tx.transaction_type === 'expense' ? 1 : 2)

  return matchCategory && matchType
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
        <Link href={'/addTransactions'} className='absoluteRefreshControl'>
          <View className='bg-[#13EC5B] rounded-full'>
            <MaterialIcons size={25} style={{ fontWeight: '900' }} name="add" color="white" />
          </View>
        </Link>
      </View>
      {/* Body */}
      <View className='flex-1 gap-4 w-full '>
        <View className='w-full px-4 justify-between h-max gap-4 flex-row '>
          <ItemsSelect
            ToggleItem={toggleCategoryItem}
            selectAll={()=>selectAll(true)}
            removeAll={()=>removeAll(true)}
            selectedItems={selectedCategories ?? []}
            items={categories?.categories ?? []}
            setSelectedItems={setSelectedCategories}
            itemslength={categories?.categories.length ?? 0}
            title={'Categories'}
          />
          <ItemsSelect
            ToggleItem={toggleTransactionTypeItem}
            selectAll={()=>selectAll(false)}
            removeAll={()=>removeAll(false)}
            selectedItems={selectedTransactionTypes ?? []}
            items={allTransactionTypes ?? []}
            setSelectedItems={setSelectedTransactionTypes}
            itemslength={allTransactionTypes.length ?? 0}
            title={'Types'}
          />
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
