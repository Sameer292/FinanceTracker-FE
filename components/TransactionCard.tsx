import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { useQuery } from "@tanstack/react-query"
import { getCategories } from "app/lib/ApiCalls"
import { View, Text } from "react-native"

export const TransactionCard = ({ note, amount, currency, transaction_date, category_id, transaction_type }: TransactionCardType) => {
  const {data:Categories} = useQuery<{ categories: Category[] }>({
    queryKey: ['Categories'],
    queryFn: getCategories,
  })
  console.log({transaction_type})
  const categories = Categories?.categories
  const category = categories?.find((c) => c.id === category_id)
  return (
    <View className='shadow-md py-4 px-4 min-h-[50] items-center bg-white rounded-3xl justify-center'>
      <View className='gap-2 flex-row justify-between w-full items-center'>
        <View className="flex-1 flex-row gap-3 items-center">
          <View style={{ backgroundColor: `${category?.color}40` }} className={` w-15 h-15 justify-center items-center rounded-full `} >
            <MaterialIcons name={category?.icon as any} size={20} color={category?.color} />
          </View>
          <View style={{ gap: 4 }}>
            <Text className='text-xl font-bold'>{note}</Text>

            <View className="flex-row gap-3 items-center">
              {transaction_date && (
                <Text
                  style={{ fontSize: 14 }}
                  className="text-gray-500"
                >
                  {new Date(transaction_date).toDateString().slice(4)}
                </Text>
              )}

              {category && (
                <View className="px-2 py-px rounded-full" style={{ backgroundColor: `${category.color}15` }}>
                  <Text
                    style={{ fontSize: 14 }}
                    className="text-black font-semibold"
                  >
                    {category.name}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
        <View  >
          <Text
            className={` ${transaction_type === 'income' ? 'text-[#1DB954]' : 'text-[#EC1345]'} text-xl font-bold text-right`}>
            {transaction_type === 'income' ? '+' : '-'}{currency}{amount}
          </Text>
        </View>
      </View>
    </View>
  )
}