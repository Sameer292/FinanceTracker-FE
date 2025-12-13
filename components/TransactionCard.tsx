import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { View, Text } from "react-native"

export const TransactionCard = ({ name, amount, currency, date, category, type }: TransactionCardType) => {
  return (
    <View className='shadow-md py-4 px-4 min-h-[50] items-center bg-white rounded-3xl justify-center'>
      <View className='gap-2 flex-row justify-between w-full items-center'>
        <View className="flex-1 flex-row gap-3 items-center">
          <View style={{ backgroundColor: `${category?.color}40` }} className={` w-15 h-15 justify-center items-center rounded-full `} >
            <MaterialIcons name={category?.icon as any} size={20} color={category?.color} />
          </View>
          <View style={{ gap: 4 }}>
            <Text className='text-xl font-bold'>{name}</Text>

            <View className="flex-row gap-3 items-center">
              {date && (
                <Text
                  style={{ fontSize: 14 }}
                  className="text-gray-500"
                >
                  {new Date(date).toDateString().slice(4)}
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
            className={` ${type == 'expense' ? 'text-[#EC1345]' : 'text-[#1DB954]'} text-xl font-bold text-right`}>
            {type === 'income' ? '+' : '-'}{currency}{amount}
          </Text>
        </View>
      </View>
    </View>
  )
}