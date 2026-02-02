import { HomeIcon } from "app/assets/SVGIcons/SVGIconsCustom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "app/context/AuthContext";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	ScrollView,
	Text,
	TouchableHighlight,
	Keyboard,
	Platform,
	View,
} from "react-native";
import {
	loginSchema,
	type loginSchemaType,
} from "app/lib/schemas/validationSchemas";
import { TextField } from "heroui-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
	interpolate,
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	interpolateColor,
} from "react-native-reanimated";
import { PasswordInput } from "app/components/PasswordInput";

export default function login() {
	const { login, isLoading } = useAuth();

	const {
		formState: { errors, isValid },
		...methods
	} = useForm<loginSchemaType>({
		defaultValues: {
			email: "iamsameer@gmail.com",
			password: "iamsameer",
		},
		mode: "onChange",
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (loginData: loginSchemaType) => {
		Keyboard.dismiss();
		login(loginData);
	};

	const [isFocused, setIsFocused] = useState(false);
	const borderColorAnim = useSharedValue(0);
	const borderWidthAnim = useSharedValue(1);

	const handleFocus = () => {
		setIsFocused(true);
		borderColorAnim.value = withTiming(errors.email ? 2 : 1, { duration: 200 });
		borderWidthAnim.value = withTiming(2, { duration: 200 });
	};

	const handleBlur = () => {
		setIsFocused(false);
		borderColorAnim.value = withTiming(errors.email ? 2 : 0, { duration: 200 });
		borderWidthAnim.value = withTiming(1, { duration: 200 });
	};

	useEffect(() => {
		if (errors.email) {
			borderColorAnim.value = 2;
		} else if (isFocused) {
			borderColorAnim.value = 1;
			borderWidthAnim.value = 2;
		} else {
			borderColorAnim.value = 0;
			borderWidthAnim.value = 1;
		}
	}, [errors.email, isFocused, borderColorAnim, borderWidthAnim]);

	const animatedStyle = useAnimatedStyle(() => {
		const borderColor = interpolateColor(
			borderColorAnim.value,
			[0, 1, 2],
			["#D4DEE3", "#09e6ae", "#EF4444"],
		);

		const borderWidth = interpolate(borderWidthAnim.value, [1, 2], [1, 2]);

		return {
			borderColor,
			borderWidth,
		};
	});

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<ScrollView
				style={{ flex: 1 }}
				keyboardDismissMode="on-drag"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
			>
				<View className="gap-12 px-4 -mt-20 h-max w-full justify-center items-center">
					{/* Header */}
					<View className="gap-7 justify-center items-center">
						<View className="rounded-full size-20 items-center justify-center">
							<HomeIcon />
						</View>
						<View className="items-center gap-1">
							<Text className="font-nunito-bold text-4xl text-[#073B4C]">
								Welcome back!
							</Text>
							<Text className="font-nunito-regular text-center text-[#8395A7]">
								Login to access your personal expense dashboard.
							</Text>
						</View>
					</View>
					<View className="w-full gap-5">
						<View className="gap-2">
							<Controller
								control={methods.control}
								name="email"
								render={({ field }) => (
									<TextField isInvalid={!!errors.email}>
										<TextField.Label className="text-lg text-[#1E1E1E] font-nunito-medium">
											Email
										</TextField.Label>
										<Animated.View style={animatedStyle} className="rounded-xl">
											<TextField.Input
												{...field}
												keyboardType="email-address"
												onChangeText={field.onChange}
												className="text-lg font-nunito-regular border-0 px-4 min-h-14 text-[#37474F]"
												onFocus={handleFocus}
												onBlur={() => {
													field.onBlur();
													handleBlur();
												}}
												placeholder="Enter your email"
												autoCapitalize="none"
												autoCorrect={false}
												autoComplete="email"
											/>
										</Animated.View>
										{errors.email && (
											<TextField.ErrorMessage>
												<View className="flex-row items-center mt-2 px-1">
													<Ionicons
														name="alert-circle"
														size={16}
														color="#EF4444"
														className="mr-1.5"
													/>
													<Text className="text-sm text-red-500 flex-1">
														{errors?.email?.message}
													</Text>
												</View>
											</TextField.ErrorMessage>
										)}
									</TextField>
								)}
							/>
						</View>
						<View className="gap-2">
							<Text className="font-nunito-medium text-lg text-[#1E1E1E]">
								Password
							</Text>
							<Controller
								control={methods.control}
								name="password"
								render={({ field }) => (
									<PasswordInput
										{...field}
										error={errors.password?.message}
										onChangeText={field.onChange}
									/>
								)}
							/>
						</View>
						<TouchableHighlight
							disabled={!isValid || isLoading}
							underlayColor={"#04bf8f"}
							className={`h-12 justify-center rounded-xl items-center ${
								isLoading || !isValid ? "bg-[#035440]" : "bg-[#07D19D]"
							}`}
							onPress={methods.handleSubmit(onSubmit)}
						>
							{isLoading ? (
								<ActivityIndicator size="small" color="white" />
							) : (
								<Text className="text-lg text-white font-nunito-bold">
									Login
								</Text>
							)}
						</TouchableHighlight>
						<View className="flex flex-row gap-1 items-center justify-center">
							<Text className="font-nunito-regular text-[#8395A7] text-md">
								Don't have an account?
							</Text>
							<Link href={"/signup"}>
								<Text className="text-[#06D6A0] text-md">Sign Up</Text>
							</Link>
						</View>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
