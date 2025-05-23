import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';

export default function ConnectionsScreen() {
  const { userType } = useAuth();
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          {userType === 'student' ? 'Companies' : 'Students'}
        </Text>
      </View>
      
      <View style={styles.content}>
        <View style={[styles.placeholder, { backgroundColor: colors.gray[100] }]}>
          <Text style={[styles.placeholderText, { color: colors.gray[600] }]}>
            {userType === 'student' 
              ? 'This screen will show companies you can connect with.' 
              : 'This screen will show students you can connect with.'}
          </Text>
          <Text style={[styles.placeholderSubText, { color: colors.gray[500] }]}>
            This feature is coming soon.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    marginBottom: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    padding: 24,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  placeholderText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  placeholderSubText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    textAlign: 'center',
  },
});