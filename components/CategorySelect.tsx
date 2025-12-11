import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Dialog } from "heroui-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { ExpenseCategories as categories } from '../assets/expenses';

export function CategorySelect({ selectedCategories, setSelectedCategories, ToggleItem, selectAll }: CategorySelectProps) {
  return (
    <Dialog className='flex-1'>
      <Dialog.Trigger className='bg-[#C8F5D6] flex-1 items-center rounded-full'>
        <View className='flex-1 w-full items-center rounded-full h-14 justify-center ' >
          <Text className='text-[#15c34f] text-lg font-bold ' >Categories</Text>
        </View>
      </Dialog.Trigger>
      <Dialog.Portal className='px-4 -mt-70'>
        <Dialog.Overlay />
        <Dialog.Content isSwipeable={false} className="rounded-2xl bg-white shadow-lg">

          {/* Header */}
          <View className="flex-row items-center justify-between border-b border-gray-200 px-4 py-3">
            <Text className="text-md font-bold uppercase tracking-wider text-gray-500">
              Select Categories
            </Text>

            <Pressable onPress={selectAll}>
              <Text className="text-md font-medium text-[#15c34f]">Select All</Text>
            </Pressable>
          </View>

          {/* Category list */}
          <ScrollView className="max-h-80 p-2 " contentContainerClassName='pb-4'>
            {categories.map((category) => {
              const isChecked = selectedCategories.includes(category.id);
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

          {/* Footer */}
          <View className="border-t border-gray-200 p-3">
            <Dialog.Close asChild>
              <Pressable
                // onPress={() => dialog.onOpenChange(false)}
                className="bg-black py-3 rounded-xl items-center"
              >
                <Text className="font-bold text-white">Apply Filters</Text>
              </Pressable>
            </Dialog.Close>
          </View>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}