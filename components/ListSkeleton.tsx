import { View } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated'
import { useEffect } from 'react'

export const ListSkeleton = () => {
  const shimmer = useSharedValue(0)

  useEffect(() => {
    shimmer.value = withRepeat(
      withTiming(1, { duration: 1200 }),
      -1,
      false
    )
  }, [])

  const shimmerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(shimmer.value, [0, 0.5, 1], [0.4, 0.8, 0.4])
    return { opacity }
  })

  return (
    <View className="w-full flex-row items-center gap-4 py-4 px-3 border border-[#E6EDF2] rounded-2xl overflow-hidden">
      <Animated.View
        style={shimmerStyle}
        className="size-15 rounded-full bg-[#E6EDF2]"
      />
      <View className="flex-1 gap-2">
        <Animated.View
          style={shimmerStyle}
          className="h-4 w-1/2 rounded bg-[#E6EDF2]"
        />
        <Animated.View
          style={shimmerStyle}
          className="h-3 w-1/3 rounded bg-[#F0F4F8]"
        />
      </View>
    </View>
  )
}
