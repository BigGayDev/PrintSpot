// Components
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from 'react-native';

export default function TabOneScreen() {
  return (
    <View>
      <Text>Tab One</Text>
      <View />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}