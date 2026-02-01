import { View } from "react-native";
import { SkeletonGroup } from "heroui-native";

export const ListSkeleton = ({ isLoading }: { isLoading: boolean }) => {
	return (
		<View className="w-full flex-row items-center gap-4 py-4 px-3 border border-[#E6EDF2] rounded-2xl overflow-hidden">
			<SkeletonGroup
				isLoading={isLoading}
				isSkeletonOnly
				variant="shimmer"
				className="flex-row items-center gap-4 flex-1"
			>
				<SkeletonGroup.Item className="size-15 rounded-full bg-[#E6EDF2]" />

				<View className="flex-1 gap-2">
					<SkeletonGroup.Item className="h-4 w-1/2 rounded bg-[#E6EDF2]" />
					<SkeletonGroup.Item className="h-3 w-1/3 rounded bg-[#F0F4F8]" />
				</View>
			</SkeletonGroup>
		</View>
	);
};
