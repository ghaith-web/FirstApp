import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../../core/theme'

import Background from '../../components/Background'
import Header from '../../components/Header'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton'
import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import { nameValidator } from '../../helpers/nameValidator'
import axios from 'axios'

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: null, error: '' })
  const [email, setEmail] = useState({ value: null, error: '' })
  const [password, setPassword] = useState({ value: null, error: '' })
  const [passwordConfirmation, setPasswordConfirmation] = useState({ value: null, error: '' })
  const [phoneNumber, setPhoneNumber] = useState({ value: null, error: '' })

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{8}$/ 
    return phoneRegex.test(phone) ? '' : 'Phone number must be 8 digits'
  }

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const passwordConfirmationError = password.value !== passwordConfirmation.value 
      ? 'Passwords do not match' 
      : ''
    const phoneNumberError = validatePhoneNumber(phoneNumber.value)

    if (nameError || emailError || passwordError || passwordConfirmationError || phoneNumberError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setPasswordConfirmation({ ...passwordConfirmation, error: passwordConfirmationError })
      setPhoneNumber({ ...phoneNumber, error: phoneNumberError })
      return
    }

    try {
      const response = await axios.post('https://nusuki.creativedms.pro/api/v1/auth/register', {
        full_name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value,
        phone_number: phoneNumber.value,
        governorate_id: 7,
        type: 'Hajj',
      })

      if (response.status === 200) {
        Alert.alert('Success', 'Your account has been created!')
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.'
      Alert.alert('Error', errorMessage)
    }
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Phone Number"
        returnKeyType="next"
        value={phoneNumber.value}
        onChangeText={(text) => setPhoneNumber({ value: text, error: '' })}
        error={!!phoneNumber.error}
        errorText={phoneNumber.error}
        keyboardType="phone-pad"
      />
      <TextInput
        label="Password"
        returnKeyType="next"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="Confirm Password"
        returnKeyType="done"
        value={passwordConfirmation.value}
        onChangeText={(text) => setPasswordConfirmation({ value: text, error: '' })}
        error={!!passwordConfirmation.error}
        errorText={passwordConfirmation.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
