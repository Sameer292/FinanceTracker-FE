import React, { useState } from "react";
import { View, TextInput, type TextInputProps } from "react-native";
import Icon from "react-native-remix-icon";

type SecureTextFieldProps = TextInputProps & {
	error?: boolean;
};

export const SecureTextField = React.forwardRef<
	TextInput,
	SecureTextFieldProps
>(({ error, ...props }, ref) => {
	const [visible, setVisible] = useState(false);

	return (
		<View
			className={`flex-row items-center border rounded-lg pr-2 ${
				error ? "border-[#EF476F]" : "border-[#D9E3E8]"
			}`}
		>
			<TextInput
				ref={ref}
				secureTextEntry={!visible}
				placeholderTextColor="#8395A7"
				className="flex-1 h-13 text-[#37474F] font-nunito-regular text-lg rounded-lg pl-4 py-2.5"
				{...props}
			/>
			<Icon
				onPress={() => setVisible((v) => !v)}
				name={visible ? "eye-off-line" : "eye-line"}
				size={27}
				color="#8395A7"
			/>
		</View>
	);
});

SecureTextField.displayName = "SecureTextField";
