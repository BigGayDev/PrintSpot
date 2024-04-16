import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useUser } from "@clerk/clerk-expo";
import { Avatar, Icon } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function ProfileIcon() { // ! Fix onClick doesn't work on phones (use ExternalLink)
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) return (
    <Link href="/sign/in" asChild>
      <Avatar bg="white">
        <MaterialIcons name="supervised-user-circle" size={56} color="black" />
      </Avatar>
    </Link>
  );
  else return (
    <Link href="/modal" asChild> {/* Edit this using clerk account portal */}
      <Avatar bg="indigo.500" source={{ uri: user?.imageUrl }}>
        {(user.firstName || user.lastName) && user.firstName[0] + user.lastName[0]} 
      </Avatar>
    </Link>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerRight: ProfileIcon,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
