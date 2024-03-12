// Styles
import global from '@/assets/styles/global';
// React
import { useState } from 'react';
// React Native
import { TextInput, TouchableOpacity } from 'react-native'; // ! Replace with themed
import { Text, View } from '@/components/Themed';
// Clerk
import { useSignIn } from "@clerk/clerk-expo";

export default function SignIn() { // ? https://clerk.com/docs/quickstarts/expo#o-auth-sign-in
  //Clerk hook
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
    <View style={global.container}>
      <View>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email..."
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
      </View>
      <View>
        <TextInput
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity onPress={onSignIn}>
        <Text>Sign in</Text>
      </TouchableOpacity>
    </View>
  )
}