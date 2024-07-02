import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { BioDataProvider } from '@/components/src/BioDataContext';
import { useColorScheme } from 'react-native';
import Colors from '@/components/Colors';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <BioDataProvider>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Bio Data',
          tabBarIcon: () => <TabBarIcon name="user" color={'blue'} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Clinic Visitation Data',
          tabBarIcon: () => <MaterialIcons name="medical-services" size={28} color="blue" />,
        }}
      />
    </Tabs>
    </BioDataProvider>
  );
}
