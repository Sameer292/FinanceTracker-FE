import { Feather } from "@expo/vector-icons";
import Icon from "react-native-remix-icon";
import { Dialog } from "heroui-native";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { BlurView } from 'expo-blur';
import { IconName } from "react-native-remix-icon";

export function ItemsSelect({ items, selectedItems, setSelectedItems, ToggleItem, selectAll, removeAll, itemslength, title }: CategorySelectProps) {

  const [isOpen, setIsOpen] = useState(false)
  const handleSelection = () => {
    if (selectedItems.length > 0) {
      removeAll()
    } else if (selectedItems.length === 0) {
      selectAll()
    }
  }
  return (
    <>
    <Dialog className='flex-1 h-14'>
      <Dialog.Trigger onPress={() => setIsOpen(true)} className={`${(isOpen || selectedItems.length) ? 'bg-[#C8F5D6]' : 'bg-[#EEF0F1]'} flex-1 items-center rounded-full`}>
        <View className='flex-1 w-full items-center flex-row rounded-full h-14 justify-between px-6 ' >
          <Text className={`${(isOpen || selectedItems?.length) ? 'text-[#15c34f]' : ''} text-lg font-bold `}>{title}</Text>
          {
            isOpen ? (
              <Feather name={'chevron-up'} color={'#15c34f'} size={20} />
            ) : (
              <Feather name={'chevron-down'} color={`${selectedItems.length && '#15c34f'}`} size={20} />
            )
          }
        </View>
      </Dialog.Trigger>
      <Dialog.Portal className='px-4 -mt-90 '>
            {isOpen && (
              <BlurView
                intensity={100}
                tint="default"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              />
            )}
        <Dialog.Overlay onPress={() => setIsOpen(false)} />
        <Dialog.Content isSwipeable={false} className="border border-[#F3F4F6] rounded-2xl bg-white shadow-[1px_1px_25px_5px_rgba(0,0,0,0.29)]">

          {/* Header */}
          <View className="flex-row items-center justify-between border-b border-[#F3F4F6] px-4 py-3">
            <Text className="text-md font-bold uppercase tracking-wider text-gray-500">
              Select {title}
            </Text>

            <Pressable onPress={handleSelection}>
              <Text className="text-md font-medium text-[#15c34f]">{(selectedItems.length > 0) ? 'Deselect All' : 'Select All'}</Text>
            </Pressable>
          </View>

          {/* Category list */}
          <ScrollView className="max-h-80 p-2 " contentContainerClassName='pb-4'>
            {items?.map((item) => {
              const isChecked = selectedItems.includes(item.id);
              return (
                <Pressable
                  key={item.id}
                  onPress={() => ToggleItem(item.id)}
                  className="flex-row items-center gap-3 rounded-xl p-2"
                >
                  {/* Icon bubble */}
                  {
                    item.icon && 
                  <View
                    style={{ backgroundColor: `${item.color}20` }}
                    className="size-11 rounded-full items-center justify-center"
                  >
                    <Icon name={item.icon as IconName} size={20} color={item.color} />
                  </View>
                  }
                  {/* Label */}
                  <Text className="flex-1 text-md capitalize font-semibold text-gray-700">
                    {item.name}
                  </Text>

                  {/* Checkbox */}
                  <View
                    className={`
                    h-6 w-6 rounded  
                    ${isChecked ? "bg-[#15c34f] border-0" : "border-gray-300 border"} 
                    flex justify-center items-center
                      `}>
                    <Icon name={'check-line'} className=' font-bold self-center text-900' size={15} color={'white'} />
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>


          {/* Might be needed later */}
          {/* Footer */}
          {/* <View className="border-t border-gray-200 p-3">
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
    </>
  );
}