import { Redirect, Tabs } from 'expo-router';
import { ActivityIndicator, Text, View } from 'react-native';
import { useAuth } from 'app/context/AuthContext';
import Icon, { IconName } from 'react-native-remix-icon';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useEffect } from 'react';

export default function TabLayout() {
  const { authStatus } = useAuth()
  if (authStatus === "loading") {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    )
  }
  if (authStatus === "unauthenticated") {
    return <Redirect href="/login" />
  }
  return (
    <AllTabs />
  );
}

const AllTabs = () => {
  return (
    <Tabs
      safeAreaInsets={{ bottom: 30 }}
      screenOptions={{
        tabBarStyle: {
          paddingTop: 10,
          backgroundColor: 'white',
        },
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ focused }) => <CustomIconTabs focused={focused} focusedIcon="home-5-fill" outOfFocusIcon="home-5-line" />,
          tabBarLabel: ({ focused }) => <Text style={{ fontFamily: focused ? 'Nunito_600SemiBold' : 'Nunito_400Regular', color: focused ? "#049F75" : "#8395A7" }} className='text-xs' >Home</Text>,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'transactions',
          tabBarIcon: ({ focused }) => <CustomIconTabs focused={focused} focusedIcon="receipt-fill" outOfFocusIcon="receipt-line" />,
          tabBarLabel: ({ focused }) => <Text style={{ fontFamily: focused ? 'Nunito_600SemiBold' : 'Nunito_400Regular', color: focused ? "#049F75" : "#8395A7" }} className='text-xs'>Transactions</Text>,
        }}
      />
      <Tabs.Screen
        name="budgets"
        options={{
          title: 'budgets',
          tabBarIcon: ({ focused }) => <CustomIconTabs focused={focused} focusedIcon="pie-chart-fill" outOfFocusIcon="pie-chart-line" />,
          tabBarLabel: ({ focused }) => <Text style={{ fontFamily: focused ? 'Nunito_600SemiBold' : 'Nunito_400Regular', color: focused ? "#049F75" : "#8395A7" }} className='text-xs'>Budgets</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'profile',
          tabBarIcon: ({ focused }) => <CustomIconTabs focused={focused} focusedIcon="user-fill" outOfFocusIcon="user-line" />,
          tabBarLabel: ({ focused }) => <Text style={{ fontFamily: focused ? 'Nunito_600SemiBold' : 'Nunito_400Regular', color: focused ? "#049F75" : "#8395A7" }} className='text-xs'>Profile</Text>,
        }}
      />
    </Tabs>
  )
}

const CustomIconTabs = ({
  focusedIcon,
  outOfFocusIcon,
  focused,
}: {
  focusedIcon: IconName
  outOfFocusIcon: IconName
  focused: boolean
}) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(focused ? 1.2 : 1, {
      damping: 15,
      stiffness: 150,
    });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={animatedStyle}
      className={`w-17 h-10 ${
        focused ? 'bg-[#CAF0F8]' : 'bg-white'
      } items-center rounded-4xl justify-center mb-4`}
    >
      <Icon
        name={focused ? focusedIcon : outOfFocusIcon}
        size={24}
        color={focused ? '#06D6A0' : '#8395A7'}
      />
    </Animated.View>
  );
};