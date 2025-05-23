import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '@/components/ui/Button';
import { ChevronRight } from 'lucide-react-native';

export default function LandingScreen() {
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.logoContainer}>
        <View style={[styles.logo, { backgroundColor: colors.primary }]}>
          <Text style={styles.logoText}>CC</Text>
        </View>
        <Text style={[styles.appName, { color: colors.text }]}>Campus Connect</Text>
      </View>
      
      <View style={styles.heroContainer}>
        <Text style={[styles.heroTitle, { color: colors.text }]}>
          Connect Students with Corporates
        </Text>
        <Text style={[styles.heroSubtitle, { color: colors.gray[500] }]}>
          Bridge the gap between academic learning and professional opportunities
        </Text>
      </View>
      
      <View style={styles.actionsContainer}>
        <View style={styles.userTypeContainer}>
          <TouchableOpacity 
            style={[styles.userTypeCard, { backgroundColor: colors.gray[100] }]}
            onPress={() => router.push('/auth/student-signup')}
          >
            <View style={styles.userTypeContent}>
              <Text style={[styles.userTypeTitle, { color: colors.text }]}>Student</Text>
              <Text style={[styles.userTypeDescription, { color: colors.gray[500] }]}>
                Find internships, jobs, and mentorship opportunities
              </Text>
            </View>
            <ChevronRight size={20} color={colors.gray[400]} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.userTypeCard, { backgroundColor: colors.gray[100] }]}
            onPress={() => router.push('/auth/corporate-signup')}
          >
            <View style={styles.userTypeContent}>
              <Text style={[styles.userTypeTitle, { color: colors.text }]}>Corporate</Text>
              <Text style={[styles.userTypeDescription, { color: colors.gray[500] }]}>
                Connect with talented students and future employees
              </Text>
            </View>
            <ChevronRight size={20} color={colors.gray[400]} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.loginContainer}>
          <Text style={[styles.loginText, { color: colors.gray[500] }]}>
            Already have an account?
          </Text>
          <Button
            title="Login"
            variant="primary"
            onPress={() => router.push('/auth/login')}
            style={styles.loginButton}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoText: {
    color: 'white',
    fontSize: 28,
    fontFamily: 'Inter-Bold',
  },
  appName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  heroContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  heroTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 24,
  },
  actionsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  userTypeContainer: {
    gap: 16,
  },
  userTypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    padding: 16,
  },
  userTypeContent: {
    flex: 1,
    marginRight: 8,
  },
  userTypeTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  userTypeDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  loginContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  loginText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 16,
  },
  loginButton: {
    width: '100%',
    maxWidth: 280,
  },
});