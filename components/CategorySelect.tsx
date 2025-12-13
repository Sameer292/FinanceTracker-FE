import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Feather } from "@expo/vector-icons";
import { Dialog } from "heroui-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { ExpenseCategories as categories } from '../assets/expenses';
import { useState } from "react";

export function CategorySelect({ selectedCategories, ToggleItem, selectAll, removeAll, categorieslength }: CategorySelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const handleSelection = () => {
    if (selectedCategories.length > 0) {
      removeAll()
    } else if (selectedCategories.length === 0) {
      selectAll()
    }
  }
  return (
    <Dialog className='flex-1'>
      <Dialog.Trigger onPress={() => setIsOpen(true)} className={`${(isOpen || selectedCategories.length) ? 'bg-[#C8F5D6]' : 'bg-[#EEF0F1]'} flex-1 items-center rounded-full`}>
        <View className='flex-1 w-full items-center flex-row rounded-full h-14 justify-between px-6 ' >
          <Text className={`${(isOpen || selectedCategories.length) ? 'text-[#15c34f]' : ''} text-lg font-bold `} >Categories</Text>
          {
            isOpen ? (
              <Feather name={'chevron-up'} color={'#15c34f'} size={20} />
            ) : (
              <Feather name={'chevron-down'} color={`${selectedCategories.length && '#15c34f'}`} size={20} />
            )
          }
        </View>
      </Dialog.Trigger>
      <Dialog.Portal className='px-4 -mt-90 '>
        <Dialog.Overlay onPress={() => setIsOpen(false)} />
        <Dialog.Content isSwipeable={false} className="border border-[#F3F4F6] rounded-2xl bg-white shadow-[1px_1px_25px_5px_rgba(0,0,0,0.29)]">

          {/* Header */}
          <View className="flex-row items-center justify-between border-b border-[#F3F4F6] px-4 py-3">
            <Text className="text-md font-bold uppercase tracking-wider text-gray-500">
              Select Categories
            </Text>

            <Pressable onPress={handleSelection}>
              <Text className="text-md font-medium text-[#15c34f]">{(selectedCategories.length > 0) ? 'Deselect All' : 'Select All'}</Text>
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


          {/* Might be needed later */}
          {/* Footer
          <View className="border-t border-gray-200 p-3">
            <Dialog.Close asChild>
              <Pressable
                // onPress={() => dialog.onOpenChange(false)}
                className="bg-black py-3 rounded-xl items-center"
              >
                <Text className="font-bold text-white">Apply Filters</Text>
              </Pressable>
            </Dialog.Close>
          </View> */}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}