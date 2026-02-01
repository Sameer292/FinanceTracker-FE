import { View, Text, Pressable, TextInput, FlatList } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import Icon, { type IconName } from "react-native-remix-icon";
import { usePagerView } from "react-native-pager-view";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	type CategoryForm,
	categorySchema,
} from "app/lib/schemas/validationSchemas";
import { Colors, Icons } from "app/lib/constantValues";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory } from "app/lib/ApiCalls";

export default function AddCategories() {
	const queryClient = useQueryClient();
	const {
		mutate: createCategory,
		isPending,
		isError,
		error,
	} = useMutation({
		mutationFn: addCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			router.back();
		},
	});
	const { PagerView } = usePagerView({ pagesAmount: 3 });
	const [pageIndex, setPageIndex] = useState(0);
	const TOTAL_PAGES = 3;
	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<CategoryForm>({
		resolver: zodResolver(categorySchema),
		defaultValues: {
			name: "",
			icon: "box-3-fill",
			color: "#297EB5",
		},
		mode: "all",
	});
	const selectedIcon = watch("icon");
	const selectedColor = watch("color");

	const previewBg = selectedColor || "#D5DEE3";
	const iconColor = selectedColor ? "#fff" : "#8193A4";
	const onSubmit = (data: CategoryForm) => {
		console.log("CATEGORY →", data);
		createCategory({
			name: data.name,
			icon: data.icon,
			color: data.color,
		});
	};

	return (
		<View className="flex-1 bg-white px-4 pt-5 pb-10">
			{/* Header */}
			<View className="flex-row items-center gap-2 mb-10">
				<Pressable onPress={() => router.back()}>
					<Icon name="arrow-left-s-line" size={32} color="#444" />
				</Pressable>
				<Text className="text-xl font-nunito-bold">Add Category</Text>
			</View>

			{/* Body */}
			<View className="flex-1 justify-between">
				<View className="gap-8 flex-1">
					{/* Preview */}
					<View className="items-center">
						<View
							className="size-25 items-center justify-center"
							style={{
								backgroundColor: previewBg,
								borderRadius: 80,
							}}
						>
							<Icon name={selectedIcon} size={42} color={iconColor} />
						</View>
					</View>

					{/* Form */}
					<View className="gap-4 flex-1">
						<View className="gap-2">
							<Text className="text-lg font-nunito-medium">Category Name</Text>
							<Controller
								control={control}
								name="name"
								render={({ field }) => (
									<TextInput
										{...field}
										onChangeText={field.onChange}
										className={`border ${errors.name ? "border-[#EF476F]" : "border-[#D9E3E8]"} rounded-lg px-4 py-3`}
										placeholder="Enter category name"
									/>
								)}
							/>
							{errors.name && (
								<Text className="text-[#EF476F] text-sm font-nunito-medium">
									{errors.name.message}
								</Text>
							)}
						</View>

						<View className="gap-3">
							<Text className="text-lg font-nunito-medium">Category Icon</Text>
							<Controller
								control={control}
								name="icon"
								render={({ field }) => (
									<PagerView
										initialPage={0}
										onPageSelected={(e) => setPageIndex(e.nativeEvent.position)}
										style={{ height: 170 }}
									>
										{Array.from({ length: TOTAL_PAGES }).map((_, i) => (
											<FlatList
												key={i}
												numColumns={7}
												data={Icons}
												columnWrapperClassName="gap-2"
												contentContainerClassName="gap-2 justify-center items-center"
												keyExtractor={(item) => item}
												renderItem={({ item }) => (
													<CategoryIconSelect
														item={item}
														selectedIcon={field.value}
														onSelect={field.onChange}
													/>
												)}
											/>
										))}
									</PagerView>
								)}
							/>
						</View>
						<View className="flex-row justify-center gap-2 mt-2">
							{Array.from({ length: TOTAL_PAGES }).map((_, i) => (
								<View
									key={i}
									className={`size-2 rounded-full ${pageIndex === i ? "bg-[#38474F]" : "bg-[#858F93]"}`}
								/>
							))}
						</View>
						<View className="gap-2">
							<Text className="font-nunito-medium text-lg">Category Color</Text>
							<Controller
								control={control}
								name="color"
								render={({ field }) => (
									<FlatList
										horizontal
										showsHorizontalScrollIndicator={false}
										data={Colors}
										contentContainerClassName="gap-2 py-1"
										keyExtractor={(item) => item}
										renderItem={({ item }) => {
											const isSelected = item === field.value;
											return (
												<Pressable onPress={() => field.onChange(item)}>
													<View
														className="rounded-full size-14 justify-center items-center"
														style={{
															backgroundColor: item,
															borderWidth: isSelected ? 2 : 0,
															borderColor: isSelected
																? "#D9E3E8"
																: "transparent",
														}}
													>
														{isSelected && (
															<Icon name="check-line" size={30} color="#fff" />
														)}
													</View>
												</Pressable>
											);
										}}
									/>
								)}
							/>
						</View>
					</View>
				</View>

				{/* Save */}
				<View className="gap-2">
					{isError && (
						<Text className="text-[#EF476F] text-sm text-center font-nunito-medium">
							{(error as Error)?.message || "Something went wrong"}
						</Text>
					)}
					<Pressable
						disabled={isPending}
						onPress={handleSubmit(onSubmit)}
						className={`h-14 rounded-lg items-center justify-center ${
							isPending ? "bg-[#9FE8D6]" : "bg-[#07D19D]"
						}`}
					>
						<Text className="text-lg text-white font-nunito-bold">
							{isPending ? "Adding…" : "Add Category"}
						</Text>
					</Pressable>
					<Pressable
						onPress={() => router.back()}
						className={`h-14 border-2 border-[#118AB2] rounded-lg items-center justify-center`}
					>
						<Text className="text-lg text-[#118AB2] font-nunito-semibold">
							Cancel
						</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
}
const CategoryIconSelect = ({
	item,
	selectedIcon,
	onSelect,
}: {
	item: IconName;
	selectedIcon: IconName;
	onSelect: (icon: IconName) => void;
}) => {
	const isSelected = selectedIcon === item;
	return (
		<Pressable onPress={() => onSelect(item)}>
			<View
				className={`items-center justify-center size-14 ${selectedIcon === item ? "bg-[#C5EAF2] border border-[#118AB2]" : "bg-[#F0F4F8]"} rounded-full`}
			>
				<Icon
					name={item}
					size={24}
					color={isSelected ? "#1388AF" : "#8193A4"}
				/>
			</View>
		</Pressable>
	);
};
