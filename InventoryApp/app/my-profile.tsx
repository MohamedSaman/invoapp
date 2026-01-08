import React, { useState, useLayoutEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import HomeHeader from '@/components/HomeHeader';

export default function MyProfile() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  const [name, setName] = useState('Staff');
  const [email, setEmail] = useState('staff@gmail.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const mockSessions = [
    { id: 1, label: 'Windows - Chrome', ip: '112.134.230.100', lastActive: 'Last active 9 minutes ago', isCurrent: false, icon: 'desktop-outline' },
    { id: 2, label: 'iOS - Chrome', ip: '112.134.230.100', lastActive: 'This device', isCurrent: true, icon: 'phone-portrait-outline' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <HomeHeader />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>My Profile</Text>
        <Text style={styles.pageSubtitle}>Manage your account information and security settings</Text>

        {/* Profile Information Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Profile Information</Text>
          <Text style={styles.cardDesc}>Update your account's profile information and email address.</Text>

          <View style={styles.innerCard}>
            <Text style={styles.fieldLabel}>Name</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />

            <Text style={styles.fieldLabel}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

            <View style={styles.cardFooter}>
              <TouchableOpacity style={styles.saveBtn} onPress={() => { /* save logic */ }}>
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Update Password Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Update Password</Text>
          <Text style={styles.cardDesc}>Ensure your account is using a long, random password to stay secure.</Text>

          <View style={styles.innerCard}>
            <Text style={styles.fieldLabel}>Current Password</Text>
            <TextInput style={styles.input} value={currentPassword} onChangeText={setCurrentPassword} secureTextEntry />

            <Text style={styles.fieldLabel}>New Password</Text>
            <TextInput style={styles.input} value={newPassword} onChangeText={setNewPassword} secureTextEntry />

            <Text style={styles.fieldLabel}>Confirm Password</Text>
            <TextInput style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

            <View style={styles.cardFooter}>
              <TouchableOpacity style={styles.saveBtn} onPress={() => { /* update password */ }}>
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Two Factor Authentication Card (placeholder) */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Two Factor Authentication</Text>
          <Text style={styles.cardDesc}>Add additional security to your account using two factor authentication.</Text>

          <View style={styles.innerCardAlt}>
            <Text style={styles.bigText}>You have not enabled two factor authentication.</Text>
            <Text style={[styles.cardDesc, { marginTop: 8 }]}>When two factor authentication is enabled, you will be prompted for a secure token during authentication.</Text>

            <View style={styles.cardFooter}>
              <TouchableOpacity style={styles.saveBtn} onPress={() => { /* enable 2fa */ }}>
                <Text style={styles.saveBtnText}>Enable</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Browser Sessions Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Browser Sessions</Text>
          <Text style={styles.cardDesc}>Manage and log out your active sessions on other browsers and devices.</Text>

          <View style={styles.innerCardAlt}>
            <Text style={styles.cardDesc}>If necessary, you may log out of all of your other browser sessions across all of your devices. Some of your recent sessions are listed below; however, this list may not be exhaustive.</Text>

            {mockSessions.map((s) => (
              <View key={s.id} style={styles.sessionRow}>
                <View style={styles.sessionInfo}>
                  <Ionicons name={s.icon as any} size={20} color="#666" />
                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text style={styles.sessionLabel}>{s.label}</Text>
                    <Text style={styles.sessionMeta}>{s.ip}, <Text style={s.isCurrent ? styles.thisDeviceText : {}}>{s.lastActive}</Text></Text>
                  </View>
                </View>
              </View>
            ))}

            <View style={styles.cardFooterRow}>
              <TouchableOpacity style={styles.logoutOtherBtn} onPress={() => { /* logout other sessions */ }}>
                <Text style={styles.logoutOtherBtnText}>Log Out Other Browser Sessions</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Delete Account Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Delete Account</Text>
          <Text style={styles.cardDesc}>Permanently delete your account.</Text>

          <View style={styles.innerCardAlt}>
            <Text style={styles.cardDesc}>Once your account is deleted, all of its resources and data will be permanently deleted.</Text>

            <View style={styles.cardFooter}>
              <TouchableOpacity style={[styles.deleteBtn]} onPress={() => { /* delete account */ }}>
                <Text style={styles.deleteBtnText}>Delete Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6f8' },
  content: { paddingHorizontal: 16 },
  pageTitle: { fontSize: 32, fontWeight: '700', color: '#111', marginTop: 20 },
  pageSubtitle: { color: '#666', marginTop: 6, marginBottom: 12 },

  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginTop: 16, borderWidth: 1, borderColor: '#eee' },
  cardTitle: { fontSize: 22, fontWeight: '700', color: '#111', marginBottom: 6 },
  cardDesc: { color: '#666', marginBottom: 12 },

  innerCard: { backgroundColor: '#fff', borderRadius: 10, padding: 16, borderWidth: 1, borderColor: '#f0f0f0' },
  innerCardAlt: { backgroundColor: '#fff', borderRadius: 10, padding: 16, borderWidth: 1, borderColor: '#f0f0f0' },

  fieldLabel: { fontSize: 16, fontWeight: '700', color: '#111', marginTop: 8 },
  input: { marginTop: 8, borderWidth: 1, borderColor: '#e6e6e6', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, color: '#111', backgroundColor: '#fff' },

  cardFooter: { marginTop: 12, alignItems: 'flex-end' },
  saveBtn: { backgroundColor: '#111', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  saveBtnText: { color: '#fff', fontWeight: '600' },

  deleteBtn: { backgroundColor: '#c0392b', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  deleteBtnText: { color: '#fff', fontWeight: '700' },

  bigText: { fontSize: 20, color: '#111', fontWeight: '600' },
  sessionRow: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sessionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  sessionMeta: {
    color: '#666',
    marginTop: 4,
  },
  thisDeviceText: {
    color: '#111',
    fontWeight: '700',
  },
  cardFooterRow: {
    marginTop: 12,
    alignItems: 'center',
  },
  logoutOtherBtn: {
    backgroundColor: '#111',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  logoutOtherBtnText: {
    color: '#fff',
    fontWeight: '700',
  },
});
