import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']} >
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
        }
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ focused }) => <MaterialIcons size={25} name="dashboard" color={focused ? "#13EC5B" : "#4C9A66"} />,
          tabBarLabel: ({ focused }) => <Text style={{ color: focused ? "#13EC5B" : "#4C9A66", fontSize: 14, fontWeight: focused ? "bold" : 'semibold' }} >Dashboard</Text>,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'transactions',
          tabBarIcon: ({ focused }) => <MaterialIcons size={25} name="receipt-long" color={focused ? "#13EC5B" : "#4C9A66"} />,
          tabBarLabel: ({ focused }) => <Text style={{ color: focused ? "#13EC5B" : "#4C9A66", fontSize: 12, fontWeight: focused ? 'bold' : 'semibold' }}>Transactions</Text>,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="budgets"
        options={{
          title: 'budgets',
          tabBarIcon: ({ focused }) => <MaterialIcons size={25} name="pie-chart" color={focused ? "#13EC5B" : "#4C9A66"} />,
          tabBarLabel: ({ focused }) => <Text style={{ color: focused ? "#13EC5B" : "#4C9A66", fontSize: 12, fontWeight: focused ? 'bold' : 'semibold' }}>Budgets</Text>,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'profile',
          tabBarIcon: ({ focused }) => <MaterialIcons size={25} name="person" color={focused ? "#13EC5B" : "#4C9A66"} />,
          tabBarLabel: ({ focused }) => <Text style={{ color: focused ? "#13EC5B" : "#4C9A66", fontSize: 12, fontWeight: focused ? 'bold' : 'semibold' }}>Profile</Text>,
          headerShown: false
        }}
      />
    </Tabs>
  )
}