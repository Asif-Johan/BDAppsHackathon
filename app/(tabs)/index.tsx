import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';

export default function HomeScreen() {
  const { user, userType, userProfile } = useAuth();
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme];

  const greeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getDisplayName = () => {
    if (!userProfile) return '';
    
    if (userType === 'student') {
      return (userProfile as any).fullName;
    } else {
      return (userProfile as any).companyName;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: colors.text }]}>
            {greeting()}
          </Text>
          <Text style={[styles.name, { color: colors.text }]}>
            {getDisplayName()}
          </Text>
        </View>

        <View style={styles.content}>
          <View style={[styles.card, { backgroundColor: colors.gray[100] }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Welcome to Campus Connect
            </Text>
            <Text style={[styles.cardDescription, { color: colors.gray[600] }]}>
              This is a placeholder for the home screen. The full functionality will be implemented as we progress.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 8,
  },
  cardDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 22,
  },
});