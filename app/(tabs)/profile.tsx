import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Alert, useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import { router } from 'expo-router';
import { LogOut, Settings, User, Building2 } from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, userType, userProfile, logOut } = useAuth();
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme];

  const handleLogout = async () => {
    try {
      await logOut();
      router.replace('/');
    } catch (error) {
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  const formatProfileData = () => {
    if (!userProfile) return [];

    if (userType === 'student') {
      const profile = userProfile as any;
      return [
        { label: 'Full Name', value: profile.fullName },
        { label: 'University', value: profile.university },
        { label: 'Department', value: profile.department },
        { label: 'Graduation Year', value: profile.graduationYear },
      ];
    } else {
      const profile = userProfile as any;
      return [
        { label: 'Company Name', value: profile.companyName },
        { label: 'Industry', value: profile.industry },
        { label: 'Location', value: profile.location },
        { label: 'Company Size', value: profile.companySize },
      ];
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => Alert.alert('Coming Soon', 'Settings page will be implemented in future updates.')}
        >
          <Settings size={24} color={colors.gray[600]} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={[styles.profileHeader, { backgroundColor: colors.primary }]}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarPlaceholder}>
              {userType === 'student' ? (
                <User size={32} color="#FFFFFF" />
              ) : (
                <Building2 size={32} color="#FFFFFF" />
              )}
            </View>
          </View>
          <Text style={styles.profileEmail}>{user?.email}</Text>
          <Text style={styles.profileType}>
            {userType === 'student' ? 'Student Account' : 'Corporate Account'}
          </Text>
        </View>

        <View style={[styles.profileDetails, { backgroundColor: colors.gray[100] }]}>
          {formatProfileData().map((item, index) => (
            <View key={index} style={styles.profileItem}>
              <Text style={[styles.profileLabel, { color: colors.gray[500] }]}>
                {item.label}
              </Text>
              <Text style={[styles.profileValue, { color: colors.text }]}>
                {item.value}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.actionsContainer}>
          <Button
            title="Edit Profile"
            variant="outline"
            onPress={() => Alert.alert('Coming Soon', 'Profile editing will be implemented in future updates.')}
            style={styles.editButton}
          />
          <Button
            title="Logout"
            variant="primary"
            onPress={handleLogout}
            style={styles.logoutButton}
            icon={<LogOut size={18} color="#FFFFFF" />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
  },
  settingsButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileHeader: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileEmail: {
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 8,
  },
  profileType: {
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  profileDetails: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  profileItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  profileLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 4,
  },
  profileValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  actionsContainer: {
    gap: 12,
  },
  editButton: {
    marginBottom: 8,
  },
  logoutButton: {
    backgroundColor: '#EF4444', // Use error color for logout
  },
});