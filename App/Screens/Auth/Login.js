import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Alert } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../../components/Background'
import Header from '../../components/Header'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton'
import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import { theme } from '../../core/theme'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginError } from "../../Redux/authSlice";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: null, error: '' })
  const [password, setPassword] = useState({ value: null, error: '' })
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state) => state.auth);
  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    console.log(emailError,"emailError");
    console.log(passwordError,"passwordError");

    if (emailError || passwordError) {
      console.log("errors")
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }

    setLoading(true)
    try {
      console.log("ex","response")
      const response = await axios.post('https://nusuki.creativedms.pro/api/v1/auth/login', {
        credential: email.value,
        password: password.value,
        device : "ios",
        fcmToken : "fcmToken",
        type : "user-api"
      })
      if (response.data.code === 200) {
        console.log(response.status)
        dispatch(loginSuccess({ email }));
        Alert.alert("Success", "You have successfully logged in!");
        navigation.navigate("App");
      }
      if (response.data.code === 200) {
        setLoading(false);
        navigation.navigate("App");
        dispatch(loginSuccess({ email }));
        Alert.alert("Success", "You have successfully logged in!");
      } else if (response.data.code === 403) {
        Alert.alert("Error",response.data.message);
        setLoading(false);
      }

    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  }


  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>Welcome back.</Header>
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
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('Register')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },

  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})