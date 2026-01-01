import { Select } from "heroui-native"
import { useState } from "react"
import { View, Text } from "react-native"
import Icon, { IconName } from "react-native-remix-icon"

const items: TransactionTypeSelect[] = [
    {
        value: 'all',
        label: 'All',
        icon: 'apps',
        textColor: '#0284C7',
        bgColor: '#E0F2FE'
    },
    {
        value: 'income',
        label: 'Income',
        icon: 'arrow-upward',
        textColor: '#16A34A',
        bgColor: '#D1FAE5'
    },
    {
        value: 'expense',
        label: 'Expense',
        icon: 'arrow-downward',
        textColor: '#EA580C',
        bgColor: '#FFEDD5'
    }
]

export const TransactionTypeSelect = ({ setectedTransactionType, setTransactionType, transactionType }: { setTransactionType: (transactionType: TransactionTypeSelect | undefined) => void, transactionType: TransactionTypeSelect | undefined, setectedTransactionType?: TransactionTypeSelect }) => {

    const [isOpen, setIsOpen] = useState(false)
    return (
        <Select
            value={setectedTransactionType}
            onValueChange={(value) => {
                const found = items.find(r => r.value === value?.value)
                setTransactionType(found)
            }}
            className='flex-1'>
            <Select.Trigger className={`flex-1 items-center rounded-full`} onPress={() => setIsOpen(true)}>
                <DateTrigger transactionType={transactionType} isOpen={isOpen} />
            </Select.Trigger >
            <Select.Portal className='w-full' >
                <Select.Overlay
                    className="absolute inset-0"
                    onPress={() => setIsOpen(false)}
                />
                <Select.Content
                    className="bg-white px-3 shadow-[1px_1px_25px_5px_rgba(0,0,0,0.29)] border-0 w-1/2 gap-2 py-2.5 rounded-3xl"
                >
                    {
                        items.map((transactionType) => {
                            return (

                                <Select.Item value={transactionType.value} onPress={() => setIsOpen(false)} label={transactionType.label} key={transactionType.value} className='p-0' >
                                    {
                                        ({ isSelected }) => {
                                            return (
                                                <View style={{ backgroundColor: isSelected ? transactionType.bgColor : '' }} className={`pr-4 pl-2.5 flex-1 gap-3 flex-row items-center w-full rounded-2xl h-16`}>
                                                    <View style={{ backgroundColor: `${transactionType.textColor}40`, borderRadius: '100%' }} className={`size-12 items-center justify-center rounded-full `}>
                                                        <Icon name={transactionType.icon as IconName} size={20} color={transactionType.textColor} />
                                                    </View>
                                                    <Select.ItemLabel style={{ color: isSelected ? transactionType.textColor : '' }} className={`text-md font-bold`} />
                                                    <Select.ItemIndicator iconProps={{ color: transactionType.textColor }} />
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
const DateTrigger = ({ transactionType, isOpen }: { transactionType?: TransactionTypeSelect, isOpen: boolean }) => {
    const bg = transactionType?.bgColor ?? '#EEF0F1'
    const text = transactionType?.textColor ?? '#111'

    return (
        <View
            style={{ backgroundColor: isOpen ? bg : bg }}
            className="w-full items-center h-14 flex-row justify-between pr-6 pl-4 rounded-full"
        >
            <View className="flex-row items-center gap-2">
                <View style={{ backgroundColor: `${text}40`, borderRadius: '100%' }} className={`size-10 items-center justify-center `}>
                    <Icon
                        name={transactionType?.icon as IconName}
                        size={16}
                        color={transactionType?.textColor}
                    />
                </View>
                <Text
                    style={{ color: text }}
                    className="text-lg font-bold"
                >
                    {transactionType?.label ?? 'Types'}
                </Text>
            </View>

            {
                isOpen ? (
                    <Icon name="arrow-up-s-line" size={20} color={text} />
                ) : (
                    <Icon name="arrow-down-s-line" size={20} color={text} />
                )
            }
        </View>
    )
}
