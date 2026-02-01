import { Select } from "heroui-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text } from "react-native";

const dateRanges: DateRange[] = [
	{
		value: "0",
		label: "Today",
	},
	{
		value: "7",
		label: "Last 7 days",
	},
	{
		value: "30",
		label: "This month",
	},
	{
		value: "60",
		label: "Last month",
	},
	{
		value: "90",
		label: "Last 3 months",
	},
];

export const DeteSelect = ({
	selectedDateRange,
}: {
	selectedDateRange?: DateRange;
}) => {
	const [dateRange, setDaterange] = useState<DateRange>();
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Select
			value={selectedDateRange}
			onValueChange={(value) => setDaterange(value)}
			className="flex-1"
		>
			<Select.Trigger
				className={`flex-1 items-center rounded-full`}
				onPress={() => setIsOpen(true)}
			>
				<DateTrigger dateRange={dateRange} isOpen={isOpen} />
			</Select.Trigger>
			<Select.Portal className="w-full">
				<Select.Overlay
					className="absolute inset-0"
					onPress={() => setIsOpen(false)}
				/>
				<Select.Content className="bg-white shadow-[1px_1px_25px_5px_rgba(0,0,0,0.29)] border-0 w-1/2 gap-2 py-3 rounded-xl">
					{dateRanges.map((dateRange) => {
						return (
							<Select.Item
								value={dateRange.value}
								onPress={() => setIsOpen(false)}
								label={dateRange.label}
								key={dateRange.value}
								className="p-0"
							>
								{({ isSelected }) => {
									return (
										<View
											className={` px-4 flex-1 flex-row ${isSelected ? "bg-[#E7FDEE]" : ""} items-center w-full rounded-2xl h-12`}
										>
											<Select.ItemLabel
												className={` text-md ${isSelected ? "text-[#15c34f]" : ""} font-bold `}
											/>
											<Select.ItemIndicator iconProps={{ color: "#15c34f" }} />
										</View>
									);
								}}
							</Select.Item>
						);
					})}
				</Select.Content>
			</Select.Portal>
		</Select>
	);
};

const DateTrigger = ({
	dateRange,
	isOpen,
}: {
	dateRange?: DateRange;
	isOpen: boolean;
}) => {
	return (
		<View
			className={` ${isOpen || dateRange ? "bg-[#C8F5D6]" : "bg-[#EEF0F1]"} w-full items-center h-14 flex-row justify-between px-6 rounded-full`}
		>
			<Text
				className={`text-lg font-bold ${isOpen || dateRange ? "text-[#15c34f]" : ""}  `}
			>
				{dateRange?.label ?? "Date range"}
			</Text>
			{isOpen ? (
				<Feather name={"chevron-up"} color={`#15c34f`} size={20} />
			) : (
				<Feather
					name={"chevron-down"}
					color={`${dateRange && "#15c34f"}`}
					size={20}
				/>
			)}
		</View>
	);
};
