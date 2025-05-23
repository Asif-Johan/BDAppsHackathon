import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import AuthLayout from '@/components/AuthLayout';
import TextInput from '@/components/ui/TextInput';
import Button from '@/components/ui/Button';
import Colors from '@/constants/Colors';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  
  const { signIn } = useAuth();
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme];

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await signIn(email, password);
      router.replace('/(tabs)');
    } catch (error: any) {
      let errorMessage = 'Failed to sign in. Please check your credentials.';
      if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password. Please try again.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'User not found. Please check your email or sign up.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      }
      Alert.alert('Login Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to continue your journey"
    >
      <View style={styles.form}>
        <TextInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />

        <TextInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={errors.password}
        />

        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => Alert.alert('Feature', 'Password reset functionality will be implemented soon.')}
        >
          <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        <Button
          title="Login"
          onPress={handleLogin}
          isLoading={isLoading}
          style={styles.button}
        />

        <View style={styles.signupContainer}>
          <Text style={[styles.signupText, { color: colors.gray[500] }]}>
            Don't have an account?
          </Text>
          <View style={styles.signupOptions}>
            <TouchableOpacity onPress={() => router.push('/auth/student-signup')}>
              <Text style={[styles.signupLink, { color: colors.primary }]}>
                Student Sign Up
              </Text>
            </TouchableOpacity>
            <Text style={[styles.signupDivider, { color: colors.gray[500] }]}>|</Text>
            <TouchableOpacity onPress={() => router.push('/auth/corporate-signup')}>
              <Text style={[styles.signupLink, { color: colors.primary }]}>
                Corporate Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  button: {
    marginBottom: 24,
  },
  signupContainer: {
    alignItems: 'center',
  },
  signupText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 8,
  },
  signupOptions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signupLink: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    paddingHorizontal: 8,
  },
  signupDivider: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});