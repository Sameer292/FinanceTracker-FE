import { useQuery } from "@tanstack/react-query"
import { getCategories } from "app/lib/ApiCalls"
import { isValidIcon } from "app/lib/utilityFns"
import { View, Text } from "react-native"
import Icon, { IconName } from "react-native-remix-icon"
export const TransactionCard = ({ note, amount, currency, transaction_date, category_id, transaction_type }: TransactionCardType) => {
  const { data: Categories } = useQuery<{ categories: Category[] }>({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
  const categories = Categories?.categories
  const category = categories?.find((c) => c.id === category_id)
  return (
    <View className='border border-[#D9E3E8] py-4 px-4 min-h-[50] items-center bg-white rounded-lg justify-center'>
      <View className='gap-2 flex-row justify-between w-full items-center'>
        <View className="flex-1 flex-row gap-5 items-center ">
          <View style={{ backgroundColor: category?.color, borderRadius: '100%' }} className={`size-15 justify-center items-center`} >
            <Icon
              name={isValidIcon(category?.icon ?? '') ? category?.icon as IconName : 'question-mark'}
              size={24}
              color="white"
            />
          </View>
          <View style={{ gap: 4 }}>
            <Text className='font-nunito-bold text-xl text-[#37474F]'>{note}</Text>

            <View className="flex-row gap-3 items-center">
              {transaction_date && (
                <Text
                  className="text-gray-500 font-nunito-semibold text-sm"
                >
                  {
                    new Date(transaction_date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  }
                </Text>
              )}
            </View>
          </View>
        </View>
        <View  >
          <Text
            className={`font-nunito-medium ${transaction_type === 'income' ? 'text-[#27AE60]' : 'text-[#EB5757]'} text-lg text-right`}>
            {transaction_type === 'income' ? '+' : '-'}{currency}{amount.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  )
}