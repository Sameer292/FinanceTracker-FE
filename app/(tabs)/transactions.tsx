import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { ExpenseCategories as categories, MyExpenses } from 'app/assets/expenses'
import { CategorySelect } from 'app/components/CategorySelect'
// import { CategorySelect } from 'app/components/CategorySelect'
import { DeteSelect } from 'app/components/DateSelect'
import { TransactionCard } from 'app/components/TransactionCard'
import { splitByDateRanges } from 'app/lib/utilityFns'
import { Link } from 'expo-router'
import { Dialog } from 'heroui-native'
import React, { useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'


export default function transactions() {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const toggleItem = (Id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(Id) ? prev.filter((v) => v !== Id) : [...prev, Id]
    );
  }
  const selectAll = () => {
    setSelectedCategories(categories.map((c) => c.id));
  }
  const filteredTransactions = MyExpenses.filter((transaction) => {
    if (selectedCategories.length === 0) return true
    return selectedCategories.includes(transaction.category.id)
  })
  const { today, yesterday, lastWeek } = splitByDateRanges<MyExpenses>(filteredTransactions)

  return (
    <View className='bg-[#F6F8F6] gap-4 flex h-full items-center justify-center' >
      {/* Header */}
      <View className='flex flex-row px-4 mt-2 gap-4 items-center'>
        <View style={{ flex: 2, }} className='items-center ' >
          <Text className='text-2xl font-bold ' >
            Transactions
          </Text>
        </View>
        <Link href={'/addTransactions'}>
          <View style={{ position: 'absolute', right: 20, }} className='bg-[#13EC5B] rounded-full'>
            <MaterialIcons size={25} style={{ fontWeight: '900' }} name="add" color="white" />
          </View>
        </Link>
      </View>
      {/* Body */}
      <View className='flex-1 gap-4 w-full px-4 '>
        <View className='w-full justify-between gap-4 flex-row' >
          <DeteSelect />
          <CategorySelect ToggleItem={toggleItem} selectAll={selectAll} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
          <View className='flex-1 items-center bg-[#EEF0F1] rounded-full h-14 justify-center ' >
            <Text className='text-lg font-bold' >All</Text>
          </View>
        </View>
        <ScrollView className='flex-1 p-2 ' showsVerticalScrollIndicator={false} contentContainerClassName='pb-8 gap-8'>
          {
            today.length > 0 && (
              <View className='flex-1 gap-4'>
                <Text className='text-center text-2xl text-900 font-bold text-[#6B7280]' >Today</Text>
                <View className='flex-1 gap-4' >
                  {
                    today.map((transaction) => {
                      return (
                        <TransactionCard key={transaction.id} category={transaction.category} name={transaction.name} amount={transaction.amount} currency={"$"} date={transaction.date} />
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
                        <TransactionCard key={transaction.id} category={transaction.category} name={transaction.name} amount={transaction.amount} currency={"$"} date={transaction.date} />
                      )
                    })
                  }
                </View>

              </View>
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
                        <TransactionCard key={transaction.id} category={transaction.category} name={transaction.name} amount={transaction.amount} currency={"$"} date={transaction.date} />
                      )
                    })
                  }
                </View>

              </View>
            )
          }
        </ScrollView>
      </View>
    </View>
  )
}


