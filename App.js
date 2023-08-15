import { useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Yup from "yup";
import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, "should be minimum 4 Charecter")
    .max(15, "should be maximum 15 Charecter")
    .required("This Field is Required")
})

const App = () => {

  const [password, setPassword] = useState("");
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);

  const [lowerCase, setLowerCase] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);


  // const generatePasswordString = (passLength) => {
  //   let characterList = "";
  //   const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  //   const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
  //   const specialChars = "!@#$%^&*()_+={}[]|\:";
  //   const digitChars = "0123456789";

  //   if (upperCase) {
  //     characterList += upperCase
  //   }
  //   if (lowerCase) {
  //     characterList += lowerCase
  //   }
  //   if (numbers) {
  //     characterList += numbers
  //   }
  //   if (symbols) {
  //     characterList += symbols
  //   }

  //   const generatedPass = createPassword(characterList, passLength);
  //   setPassword(generatedPass);
  //   setIsPasswordGenerated(true)
  // };

  const generatePasswordString = (passLength) => {
    let characterList = "";
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const specialChars = "!@#$%^&*()_+={}[]|:";
    const digitChars = "0123456789";

    if (lowerCase) {
      characterList += lowerCaseChars;
    }
    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (numbers) {
      characterList += digitChars;
    }
    if (symbols) {
      characterList += specialChars;
    }

    const generatedPass = createPassword(characterList, passLength);
    setPassword(generatedPass);
    setIsPasswordGenerated(true);
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

    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}> Password Generator</Text>

          <Formik
            initialValues={{ passwordLength: "" }}
            validationSchema={PasswordSchema}
            onSubmit={(values) => { generatePasswordString(Number(values.passwordLength)) }}

          >


            {({
              values,
              errors,
              touched,
              handleChange,
              handleReset,
              handleSubmit,
              isSubmitting,
              isValid
            }) => (
              <View>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}> Password Length:  </Text>
                    {
                      touched.passwordLength && errors.passwordLength && (
                        <Text style={styles.errorText}> {errors.passwordLength} </Text>
                      )
                    }
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange("passwordLength")}
                    placeholder={"EX:8"}
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Lowercase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={lowerCase}
                    onPress={() => setLowerCase(!lowerCase)}
                    fillColor="#29AB87"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Uppercase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={upperCase}
                    onPress={() => setUpperCase(!upperCase)}
                    fillColor="#E6425E"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numbers</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor="#51E1ED"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Speacial Charecter:</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="#120E43"
                  />
                </View>


                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.primaryBtnTxt}> Generate Password</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => { handleReset(); resetPassword() }}
                  >
                    <Text style={styles.secondaryBtnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>


              </View>
            )}
          </Formik>
        </View>

        {
          isPasswordGenerated ? (
            <View style={[styles.card, styles.cardElevated]}>
              <Text style={styles.subTitle}> Result:</Text>
              <Text style={styles.description}> Long Press To Copy</Text>
              <Text selectable style={styles.generatedPassword}> {password} </Text>
            </View>
          )
            : null
        }

      </SafeAreaView>


    </ScrollView>


  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000'
  },
});


export default App;