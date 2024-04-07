// UI
import { Input, Icon, Stack, Pressable, Button } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
// React
import { useState } from 'react';
// Clerk
import { useSignIn } from '@clerk/clerk-expo';

export default function SignIn() { // ? https://clerk.com/docs/quickstarts/expo#o-auth-sign-in
  // UI hooks
  const [hidden, setHidden] = useState(true);
  //Clerk hooks
  const { isLoaded, signIn, setActive } = useSignIn();
  // States
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  // Function
  const onSignIn = async () => {
    if (!isLoaded) return;

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  }

  return (
    <Stack space={4} w="100%" alignItems="center">
      <Input 
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email" 
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        w={{ base: "75%", md: "25%" }} 
        InputLeftElement={<Icon as={<MaterialIcons name="mail" />} size={5} ml="2" color="muted.400" />} 
      />

      <Input 
        value={password}
        secureTextEntry={hidden}
        placeholder="Password" 
        onChangeText={(password) => setPassword(password)}
        w={{ base: "75%", md: "25%" }} 
        InputRightElement={
          <Pressable onPress={() => setHidden(!hidden)}>
            <Icon as={<MaterialIcons name={hidden ? "visibility-off" : "visibility"} />} size={5} mr="2" color="muted.400" />
          </Pressable>
        } 
      />

      <Button 
        onPress={onSignIn} 
        endIcon={<Icon as={MaterialIcons} name="login" size="sm" color="muted.400" />}
      >
        Sign in
      </Button>
    </Stack>
  );
}