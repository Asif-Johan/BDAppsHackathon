import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import AuthLayout from '@/components/AuthLayout';
import TextInput from '@/components/ui/TextInput';
import Button from '@/components/ui/Button';
import Colors from '@/constants/Colors';
import { StudentProfile } from '@/context/AuthContext';

export default function StudentSignupScreen() {
  const [step, setStep] = useState(1);
  
  // Account Information
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Profile Information
  const [fullName, setFullName] = useState('');
  const [university, setUniversity] = useState('');
  const [department, setDepartment] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    university: '',
    department: '',
    graduationYear: '',
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

    // Validate full name
    if (!fullName) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    } else {
      newErrors.fullName = '';
    }

    // Validate university
    if (!university) {
      newErrors.university = 'University name is required';
      isValid = false;
    } else {
      newErrors.university = '';
    }

    // Validate department
    if (!department) {
      newErrors.department = 'Department is required';
      isValid = false;
    } else {
      newErrors.department = '';
    }

    // Validate graduation year
    if (!graduationYear) {
      newErrors.graduationYear = 'Graduation year is required';
      isValid = false;
    } else if (!/^\d{4}$/.test(graduationYear)) {
      newErrors.graduationYear = 'Please enter a valid year (e.g., 2024)';
      isValid = false;
    } else {
      newErrors.graduationYear = '';
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
      const studentProfile: StudentProfile = {
        fullName,
        university,
        department,
        graduationYear,
      };

      await signUp(email, password, 'student', studentProfile);
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
      title={step === 1 ? "Create Student Account" : "Student Information"}
      subtitle={step === 1 ? "Sign up to connect with companies and opportunities" : "Tell us about your academic background"}
    >
      {step === 1 ? (
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
            label="Full Name"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
            error={errors.fullName}
          />

          <TextInput
            label="University/College"
            placeholder="Enter your university or college name"
            value={university}
            onChangeText={setUniversity}
            error={errors.university}
          />

          <TextInput
            label="Department/Major"
            placeholder="Enter your department or major"
            value={department}
            onChangeText={setDepartment}
            error={errors.department}
          />

          <TextInput
            label="Graduation Year"
            placeholder="Enter your graduation year (e.g., 2024)"
            value={graduationYear}
            onChangeText={setGraduationYear}
            keyboardType="numeric"
            error={errors.graduationYear}
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