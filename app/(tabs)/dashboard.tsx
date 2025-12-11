import { TransactionCard } from 'app/components/TransactionCard'
import { Link } from 'expo-router'
import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { PieChart, pieDataItem } from 'react-native-gifted-charts'
import { RecentExpenses as expenses, MyExpenses } from '../../assets/expenses'
import { splitByDateRanges } from 'app/lib/utilityFns'

export default function dashboard() {
  const chartData: pieDataItem[] = expenses.map((expense) => { return ({ value: expense.amount, tex: expense.name, ...expense }) })
  const total = expenses.reduce((t, e) => t + e.amount, 0)
  const chartInnerRadius = 90
  const currency = '$'
  const { today, yesterday } = splitByDateRanges<MyExpenses>(MyExpenses)
  const recentTransactions = [...today, ...yesterday]
  return (
    <View className='bg-[#F6F8F6] gap-4 flex h-full items-center justify-center' >
      {/* Header */}
      <View className='w-full flex py-2 flex-row px-4 items-center justify-between'>
        <Text className='text-4xl font-bold'>Dashboard</Text>
        <View className='border-2 rounded-full w-16 justify-center items-center h-16 ' >
          <Image
            source={require('../../assets/IMG_2110.jpg')}
            style={{ width: 64, height: 64, borderRadius: 32 }} />
        </View>
      </View>
      {/* Body */}
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <View className='flex-1 w-full gap-4' >
          <View className='flex-row px-4 gap-4 ' >
            <Link style={{ flex: 1 }} href={'/addTransactions'}>
              <View style={{ width: '100%' }} className='bg-[#13EC5B] justify-center items-center py-4 px-6 rounded-full flex-1' >
                <Text className='font-bold text-xl' >
                  Add Transaction
                </Text>
              </View>
            </Link>
          </View>
          <View style={{ paddingBottom: 30, paddingHorizontal: 20, elevation: 5, marginHorizontal: 16 }} className=' bg-white pt-4 gap-4  pb-10 rounded-3xl'>
            <View className='w-full'>
              <Text className='text-3xl font-bold'>
                Spending this month
              </Text>
            </View>
            <View className='relative justify-center items-center '>
              <View >
                <PieChart
                  donut
                  innerRadius={chartInnerRadius}
                  data={chartData}
                />
                <View
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text className='text-2xl text-[#4c9166]'>Total</Text>
                  <Text className='text-4xl font-bold'> {currency}{total.toLocaleString()}</Text>
                </View>
              </View>
            </View>
            <View>

              {
                expenses.map((expense) => {
                  return (
                    <View key={expense.id} className='items-center justify-center'>
                      <View style={{ width: '50%', gap: 8 }} className=' flex-row justify-between items-center'>
                        <View style={{ width: '10%' }} className=' items-center justify-center' >
                          <View style={{ width: 12, height: 12, backgroundColor: expense.color }} className={`rounded-full border-[${expense.color}] h-3 bg-[${expense.color}]`} ></View>
                        </View>
                        <View style={{ flex: 1 }} className='flex-row justify-between '>
                          <Text>{expense.name}</Text>
                          <Text className='font-bold' >{currency}{expense.amount}</Text>
                        </View>
                      </View>
                    </View>)
                })
              }
            </View>
          </View>
          <View style={{ gap: 10 }} className='px-4'>
            <Text className='text-3xl font-bold'>Recent Transactions</Text>
            <View style={{ gap: 12 }}>
              {
                recentTransactions.map((expense) => {
                  return (
                    <TransactionCard key={expense.id} {...expense} currency={currency} />
                  )
                })
              }
            </View>
          </View>
        </View>
      </ScrollView>

    </View>
  )
}
