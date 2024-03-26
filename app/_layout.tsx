// Expo
import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { NativeBaseProvider } from "native-base";
import { useFonts } from 'expo-font';
import { Stack/*, useRouter*/ } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
// React
import { useEffect } from 'react';
// Clerk
import { ClerkProvider/*, useAuth*/ } from '@clerk/clerk-expo';
// Constants
import CLERK_PUBLISHABLE_KEY from '@/constants/PublishableKey';
// Components
// import { useColorScheme } from '@/components/useColorScheme';
// Cache
import * as SecureStore from 'expo-secure-store';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Token cache
const tokenCache = { // ! Fix this
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};


export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={CLERK_PUBLISHABLE_KEY!}>
      <RootLayoutNav />
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  // const colorScheme = useColorScheme(); // ! Fix this

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <NativeBaseProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </NativeBaseProvider>
    // </ThemeProvider>
  );
}
