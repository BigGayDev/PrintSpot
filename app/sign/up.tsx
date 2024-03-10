// Styles
import global from '@/assets/styles/global';
// React
import { useState } from 'react';
// React Native
import { TextInput, TouchableOpacity } from 'react-native'; // ! Replace with themed
import { Text, View } from '@/components/Themed';
// Clerk 
import { useSignUp } from '@clerk/clerk-expo';

export default function SignUp() {
  // Clerk hook
  const { isLoaded, signUp, setActive } = useSignUp();
  // States
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  // Functions
  const onSignUp = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setPendingVerification(true);
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  }

  const onVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  }

  return (
    <View style={global.container}>
      {!pendingVerification && (
        <View>
        <View>
            <TextInput
              autoCapitalize="none"
              value={firstName}
              placeholder="First Name..."
              onChangeText={(firstName) => setFirstName(firstName)}
            />
          </View>
          <View>
            <TextInput
              autoCapitalize="none"
              value={lastName}
              placeholder="Last Name..."
              onChangeText={(lastName) => setLastName(lastName)}
            />
          </View>
          <View>
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={(email) => setEmailAddress(email)}
            />
          </View>
          <View>
            <TextInput
              value={password}
              placeholder="Password..."
              placeholderTextColor="#000"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
          <TouchableOpacity onPress={onSignUp}>
            <Text>Sign up</Text>
          </TouchableOpacity>
        </View>
      )}

      {pendingVerification && (
        <View>
          <View>
            <TextInput
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <TouchableOpacity onPress={onVerify}>
            <Text>Verify Email</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}