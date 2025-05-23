import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import AuthLayout from '@/components/AuthLayout';
import TextInput from '@/components/ui/TextInput';
import Button from '@/components/ui/Button';
import Colors from '@/constants/Colors';
import { CorporateProfile } from '@/context/AuthContext';

export default function CorporateSignupScreen() {
  const [step, setStep] = useState(1);
  
  // Account Information
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Company Information
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [companySize, setCompanySize] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    industry: '',
    location: '',
    companySize: '',
  });
  
  const { signUp } = useAuth();
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme];

  const validateStep1 = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate email
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    } else {
      newErrors.email = '';
    }

    // Validate password
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    } else {
      newErrors.password = '';
    }

    // Validate confirm password
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    } else {
      newErrors.confirmPassword = '';
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateStep2 = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate company name
    if (!companyName) {
      newErrors.companyName = 'Company name is required';
      isValid = false;
    } else {
      newErrors.companyName = '';
    }

    // Validate industry
    if (!industry) {
      newErrors.industry = 'Industry is required';
      isValid = false;
    } else {
      newErrors.industry = '';
    }

    // Validate location
    if (!location) {
      newErrors.location = 'Company location is required';
      isValid = false;
    } else {
      newErrors.location = '';
    }

    // Validate company size
    if (!companySize) {
      newErrors.companySize = 'Company size is required';
      isValid = false;
    } else {
      newErrors.companySize = '';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSignup = async () => {
    if (!validateStep2()) return;

    setIsLoading(true);
    try {
      const corporateProfile: CorporateProfile = {
        companyName,
        industry,
        location,
        companySize,
      };

      await signUp(email, password, 'corporate', corporateProfile);
      router.replace('/(tabs)');
    } catch (error: any) {
      let errorMessage = 'Failed to create account. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use. Please use a different email or login.';
      }
      Alert.alert('Signup Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title={step === 1 ? "Create Corporate Account" : "Company Information"}
      subtitle={step === 1 ? "Sign up to connect with talented students" : "Tell us about your company"}
    >
      {step === 1 ? (
        <View style={styles.form}>
          <TextInput
            label="Corporate Email"
            placeholder="Enter your corporate email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <TextInput
            label="Password"
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={errors.password}
          />

          <TextInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            error={errors.confirmPassword}
          />

          <Button
            title="Next"
            onPress={handleNextStep}
            style={styles.button}
          />

          <View style={styles.loginContainer}>
            <Text style={[styles.loginText, { color: colors.gray[500] }]}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text style={[styles.loginLink, { color: colors.primary }]}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.form}>
          <TextInput
            label="Company Name"
            placeholder="Enter your company name"
            value={companyName}
            onChangeText={setCompanyName}
            error={errors.companyName}
          />

          <TextInput
            label="Industry"
            placeholder="Enter your company's industry"
            value={industry}
            onChangeText={setIndustry}
            error={errors.industry}
          />

          <TextInput
            label="Location"
            placeholder="Enter your company's location"
            value={location}
            onChangeText={setLocation}
            error={errors.location}
          />

          <TextInput
            label="Company Size"
            placeholder="Enter company size (e.g., 1-10, 11-50, 51-200)"
            value={companySize}
            onChangeText={setCompanySize}
            error={errors.companySize}
          />

          <View style={styles.buttonsContainer}>
            <Button
              title="Back"
              variant="outline"
              onPress={handlePrevStep}
              style={styles.backButton}
            />
            <Button
              title="Sign Up"
              onPress={handleSignup}
              isLoading={isLoading}
              style={styles.signupButton}
            />
          </View>
        </View>
      )}
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
  },
  button: {
    marginVertical: 24,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginRight: 4,
  },
  loginLink: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 24,
    marginBottom: 24,
  },
  backButton: {
    flex: 1,
    marginRight: 8,
  },
  signupButton: {
    flex: 2,
    marginLeft: 8,
  },
});