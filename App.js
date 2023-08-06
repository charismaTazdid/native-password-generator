import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import * as Yup from "yup";

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, "should be minimum 4 Charecter")
    .max(15, "should be maximum 15 Charecter")
    .required("This Field is Required")
})

const App = () => {

  const [password, setPassword] = useState("");
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);

  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);


  const generatePasswordString = (passLength) => {
    const characterList = "";
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const specialChars = "!@#$%^&*()_+={}[]|\:";
    const digitChars = "0123456789";

    if (upperCase) {
      characterList += upperCase
    }
    if (lowerCase) {
      characterList += lowerCase
    }
    if (numbers) {
      characterList += numbers
    }
    if (symbols) {
      characterList += symbols
    }

    const generatedPass = createPassword(characterList, passLength);
    setPassword(generatedPass);
    setIsPasswordGenerated(true)
  };

  const createPassword = (characters, passLength) => {
    let result = "";
    for (let i = 0; i < passLength; i++) {
      const charIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(charIndex);
    }
    return result;
  };

  const resetPassword = () => {
    setPassword("");
    setIsPasswordGenerated(false)
    setLowerCase(true)
    setUpperCase(false)
    setNumbers(false)
    setSymbols(false)
  };


  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>Hello</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242B2E',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App;