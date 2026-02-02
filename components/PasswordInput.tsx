import { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import Animated, {
	useSharedValue,
	interpolate,
	interpolateColor,
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";
import Icon from "react-native-remix-icon";

interface PasswordInputProps {
	value: string;
	onChangeText: (text: string) => void;
	error?: string;
	disabled?: boolean;
	placeholder?: string;
	label?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
	value,
	onChangeText,
	error,
	disabled = false,
	placeholder = "Enter password",
	label,
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const borderColorAnim = useSharedValue(0);
	const borderWidthAnim = useSharedValue(1);

	const handleFocus = () => {
		setIsFocused(true);
		borderColorAnim.value = withTiming(error ? 2 : 1, { duration: 200 });
	};

	const handleBlur = () => {
		setIsFocused(false);
		borderColorAnim.value = withTiming(error ? 2 : 0, { duration: 200 });
	};

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

	useEffect(() => {
		if (error) {
			borderColorAnim.value = 2;
			borderWidthAnim.value = 2;
		} else if (isFocused) {
			borderColorAnim.value = 1;
			borderWidthAnim.value = 2;
		} else {
			borderColorAnim.value = 0;
			borderWidthAnim.value = 1;
		}
	}, [error, isFocused, borderColorAnim, borderWidthAnim]);

	return (
		<View className="w-full">
			<Animated.View
				style={animatedStyle}
				className={`flex-row items-center rounded-xl border px-4 min-h-14`}
			>
				<TextInput
					value={value}
					onChangeText={onChangeText}
					onFocus={handleFocus}
					onBlur={handleBlur}
					secureTextEntry={!isPasswordVisible}
					editable={!disabled}
					placeholder={placeholder}
					placeholderTextColor="#9CA3AF"
					autoCapitalize="none"
					autoCorrect={false}
					autoComplete="password"
					textContentType="password"
					className={`flex-1 text-base py-3 pr-2 ${
						disabled ? "text-gray-400" : "text-gray-800"
					}`}
					accessibilityLabel={label || "Password input"}
					accessibilityState={{ disabled }}
					accessibilityHint={error ? `Error: ${error}` : undefined}
				/>

				<TouchableOpacity
					onPress={() => setIsPasswordVisible(!isPasswordVisible)}
					disabled={disabled}
					className="p-2 -mr-2"
					accessibilityRole="button"
					accessibilityLabel={
						isPasswordVisible ? "Hide password" : "Show password"
					}
				>
					<Icon
						name={isPasswordVisible ? "eye-line" : "eye-off-line"}
						size={27}
						color="#8395A7"
					/>
				</TouchableOpacity>
			</Animated.View>

			{error && (
				<View className="flex-row items-center mt-2 px-1">
					<Icon
						name="error-warning-line"
						size={16}
						color="#EF4444"
						className="mr-1.5"
					/>
					<Text className="text-sm text-red-500 flex-1">{error}</Text>
				</View>
			)}
		</View>
	);
};
