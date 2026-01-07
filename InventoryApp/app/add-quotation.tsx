import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useNavigation } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import HomeHeader from '@/components/HomeHeader';

export default function AddQuotationScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions?.({ headerShown: false });
  }, [navigation]);

  const [selectedCustomer, setSelectedCustomer] = useState('Walking Customer - 076908533');
  const [validUntil, setValidUntil] = useState('6 Feb 2026');
  const [productSearch, setProductSearch] = useState('');
  const [termsConditions, setTermsConditions] = useState(
    '1. This quotation is valid for 15 days.\n2. Prices are subject to change.'
  );
  const [quotationItems, setQuotationItems] = useState<any[]>([]);

  const handleCreateQuotation = () => {
    console.log('Creating quotation...');
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Shared Home Header with Menu */}
      <HomeHeader />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <View style={styles.titleRow}>
            <Ionicons name="document-text-outline" size={28} color="#000" />
            <View style={styles.titleTextContainer}>
              <Text style={styles.mainTitle}>Create Quotation</Text>
              <Text style={styles.subtitle}>Quickly create professional quotations for customers</Text>
            </View>
          </View>
        </View>

        {/* Customer Information Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleRow}>
              <Ionicons name="person-outline" size={24} color="#000" />
              <Text style={styles.cardTitle}>Customer{'\n'}Information</Text>
            </View>
            <TouchableOpacity style={styles.addNewBtn}>
              <Ionicons name="add-circle-outline" size={18} color="#fff" />
              <Text style={styles.addNewBtnText}>Add New{'\n'}Customer</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cardBody}>
            <Text style={styles.label}>Select Customer *</Text>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>{selectedCustomer}</Text>
              <Ionicons name="chevron-down" size={20} color="#000" />
            </TouchableOpacity>
            <View style={styles.infoRow}>
              <Ionicons name="information-circle-outline" size={18} color="#666" />
              <Text style={styles.infoText}>Using default walking customer</Text>
            </View>

            <Text style={styles.label}>Valid Until *</Text>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>{validUntil}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Add Products Card */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="search-outline" size={24} color="#000" />
            <Text style={styles.cardTitleSingle}>Add Products</Text>
          </View>

          <View style={styles.cardBody}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by product name, code, o"
              placeholderTextColor="#999"
              value={productSearch}
              onChangeText={setProductSearch}
            />
          </View>
        </View>

        {/* Quotation Items Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleRow}>
              <Ionicons name="cart-outline" size={24} color="#000" />
              <Text style={styles.cardTitleSingle}>Quotation Items</Text>
            </View>
            <View style={styles.itemsBadge}>
              <Text style={styles.itemsBadgeText}>{quotationItems.length} items</Text>
            </View>
          </View>

          <View style={styles.emptyState}>
            <Ionicons name="cart-outline" size={48} color="#ccc" />
            <Text style={styles.emptyStateText}>No items added yet</Text>
          </View>
        </View>

        {/* Terms & Conditions Card */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <MaterialCommunityIcons name="format-list-numbered" size={24} color="#000" />
            <Text style={styles.cardTitleSingle}>Terms & Conditions</Text>
          </View>

          <View style={styles.cardBody}>
            <TextInput
              style={styles.termsInput}
              multiline
              numberOfLines={5}
              value={termsConditions}
              onChangeText={setTermsConditions}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Create Quotation Button Card */}
        <View style={styles.card}>
          <TouchableOpacity style={styles.createBtn} onPress={handleCreateQuotation}>
            <Ionicons name="add-circle-outline" size={22} color="#fff" />
            <Text style={styles.createBtnText}>Create{'\n'}Quotation</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  titleSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  titleTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    lineHeight: 22,
  },
  cardTitleSingle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  addNewBtn: {
    backgroundColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addNewBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  cardBody: {
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
    marginTop: 12,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 14,
    color: '#000',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#000',
    backgroundColor: '#fff',
  },
  itemsBadge: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  itemsBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#999',
    marginTop: 12,
  },
  termsInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#000',
    backgroundColor: '#fff',
    minHeight: 120,
  },
  createBtn: {
    backgroundColor: '#333',
    paddingVertical: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  createBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
