import React, { useState, useLayoutEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import HomeHeader from '@/components/HomeHeader';

export default function Settings() {
  const navigation = useNavigation();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const settingsSections = [
    {
      id: 'expense-categories',
      title: 'Expense Categories & Types',
      subtitle: 'Manage expense categories and types',
      icon: 'tag-outline',
      iconType: 'ionicons',
      iconColor: '#111',
    },
    {
      id: 'staff-permissions',
      title: 'Staff Permissions Management',
      subtitle: 'Configure staff roles and permissions',
      icon: 'shield-outline',
      iconType: 'ionicons',
      iconColor: '#111',
    },
    {
      id: 'system-config',
      title: 'System Configurations',
      subtitle: 'Manage system-wide settings',
      icon: 'tune',
      iconType: 'material-community',
      iconColor: '#111',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <HomeHeader />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <MaterialCommunityIcons name="cog" size={36} color="#111" />
          <Text style={styles.pageTitle}>System Settings</Text>
          <Text style={styles.pageSubtitle}>Manage all system configurations.</Text>
        </View>

        {settingsSections.map((section) => (
          <TouchableOpacity
            key={section.id}
            style={styles.settingsCard}
            onPress={() => toggleSection(section.id)}
          >
            <View style={styles.cardHeader}>
              <View style={styles.cardLeft}>
                {section.iconType === 'material-community' ? (
                  <MaterialCommunityIcons name={section.icon as any} size={24} color={section.iconColor} />
                ) : (
                  <Ionicons name={section.icon as any} size={24} color={section.iconColor} />
                )}
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>{section.title}</Text>
                </View>
              </View>
              <Ionicons
                name={expandedSections.includes(section.id) ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#111"
              />
            </View>

            {expandedSections.includes(section.id) && (
              <View style={styles.cardContent}>
                <Text style={styles.cardDesc}>{section.subtitle}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6f8' },
  content: { paddingHorizontal: 16 },
  headerSection: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  pageTitle: { fontSize: 28, fontWeight: '700', color: '#111', marginTop: 12 },
  pageSubtitle: { color: '#666', marginTop: 6, fontSize: 12 },
  settingsCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#111', marginBottom: 4 },
  cardContent: {
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  cardDesc: { color: '#666', fontSize: 12, marginTop: 8 },
});
