import { Select } from "heroui-native"
import { useState } from "react"
import { View, Text } from "react-native"

const dateRanges: DateRange[] = [
  {
    value: '0',
    label: 'Today'
  },
  {
    value: '7',
    label: 'Last 7 days'
  },
  {
    value: '30',
    label: 'This month'
  },
  {
    value: '60',
    label: 'Last month'
  },
  {
    value: '90',
    label: 'Last 3 months'
  }
]

export const DeteSelect = ({ selectedDateRange }: { selectedDateRange?: DateRange }) => {
  const [dateRange, setDaterange] = useState<DateRange>()
  return (
    <Select value={selectedDateRange} onValueChange={(value) => setDaterange(value)} className='flex-1'>
      <Select.Trigger className='bg-[#EEF0F1] flex-1 items-center rounded-full'>
        <View className=' flex-1 w-full items-center rounded-full h-14 justify-center' >
          <Text className='text-lg font-bold'>{dateRange?.label ?? 'Date range'}</Text>
        </View>
      </Select.Trigger>
      <Select.Portal className='w-full' >
        <Select.Overlay
          className="absolute inset-0"
        />
        <Select.Content
          className="bg-white border-0 w-1/2 gap-2 py-3 shadow-lg rounded-xl"
        >
          {
            dateRanges.map((dateRange) => {
              return (

                <Select.Item value={dateRange.value} label={dateRange.label} key={dateRange.value} className='p-0' >
                  {
                    ({ isDisabled, isSelected, value }) => {
                      return (
                        <View className={` px-4 flex-1 flex-row ${isSelected ? 'bg-[#E7FDEE]' : ''} items-center w-full rounded-2xl h-12`}>
                          <Select.ItemLabel className={` text-md ${isSelected ? 'text-[#15c34f]' : ''} font-bold `} />
                          <Select.ItemIndicator iconProps={{ color: '#15c34f' }} />
                        </View>
                      )
                    }
                  }
                </Select.Item>
              )
            })
          }
        </Select.Content>
      </Select.Portal>
    </Select>
  )
}
