// UI
import { Input, Icon, Stack, Pressable, Button } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
// React
import { useState } from 'react';
// Clerk 
import { useSignUp } from '@clerk/clerk-expo';

export default function SignUp() {
  // UI hooks
  const [hidden, setHidden] = useState(true);
  // Clerk hooks
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

  if (!pendingVerification) return (
    <Stack space={4} w="100%" alignItems="center">
      <Input 
        autoCapitalize="none"
        value={firstName}
        placeholder="First Name"
        onChangeText={(firstName) => setFirstName(firstName)}
        w={{ base: "75%", md: "25%" }}
      />

      <Input 
        autoCapitalize="none"
        value={lastName}
        placeholder="Last Name"
        onChangeText={(lastName) => setLastName(lastName)}
        w={{ base: "75%", md: "25%" }}
      />

      <Input 
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        w={{ base: "75%", md: "25%" }}
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
        onPress={onSignUp} 
        endIcon={<Icon as={MaterialIcons} name="person-add" size="sm" color="muted.400" />}
      >
        Sign up
      </Button>
    </Stack>
  );

  if (pendingVerification) return (
    <Stack space={4} w="100%" alignItems="center">
      <Input
        value="code"
        placeholder="Code"
        onChangeText={(code) => setCode(code)}
        w={{ base: "75%", md: "25%" }}
      />

      <Button
        onPress={onVerify}
        endIcon={<Icon as={MaterialIcons} name="verified-user" size="sm" color="muted.400" />}
      >
        Verify Email
      </Button>
    </Stack>
  );
}