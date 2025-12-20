import { Redirect, Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ActivityIndicator, Text, View } from 'react-native';
import { useAuth } from 'app/context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F8F6' }} edges={['top']}  >
      <AllTabs />
    </SafeAreaView>
  );
}

const AllTabs = () => {
  return (
    <Tabs
      safeAreaInsets={{ bottom: 30 }}
      screenOptions={{
        tabBarStyle: {
          paddingTop: 10,
          backgroundColor: '#F6F8F6',
        },
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ focused }) => <MaterialIcons size={25} name="dashboard" color={focused ? "#13EC5B" : "#4C9A66"} />,
          tabBarLabel: ({ focused }) => <Text style={{ color: focused ? "#13EC5B" : "#4C9A66", fontSize: 14, fontWeight: focused ? "bold" : 'semibold' }} >Dashboard</Text>,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'transactions',
          tabBarIcon: ({ focused }) => <MaterialIcons size={25} name="receipt-long" color={focused ? "#13EC5B" : "#4C9A66"} />,
          tabBarLabel: ({ focused }) => <Text style={{ color: focused ? "#13EC5B" : "#4C9A66", fontSize: 12, fontWeight: focused ? 'bold' : 'semibold' }}>Transactions</Text>,
        }}
      />
      <Tabs.Screen
        name="budgets"
        options={{
          title: 'budgets',
          tabBarIcon: ({ focused }) => <MaterialIcons size={25} name="pie-chart" color={focused ? "#13EC5B" : "#4C9A66"} />,
          tabBarLabel: ({ focused }) => <Text style={{ color: focused ? "#13EC5B" : "#4C9A66", fontSize: 12, fontWeight: focused ? 'bold' : 'semibold' }}>Budgets</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'profile',
          tabBarIcon: ({ focused }) => <MaterialIcons size={25} name="person" color={focused ? "#13EC5B" : "#4C9A66"} />,
          tabBarLabel: ({ focused }) => <Text style={{ color: focused ? "#13EC5B" : "#4C9A66", fontSize: 12, fontWeight: focused ? 'bold' : 'semibold' }}>Profile</Text>,
        }}
      />
    </Tabs>
  )
}