import { Ionicons } from '@expo/vector-icons';
import { useRouter, useNavigation } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import HomeHeader from '@/components/HomeHeader';

const mockSuppliers = [
  { id: 'SUP001', supplierName: 'XYZ Supplies', contactPerson: 'Mr. Ahmed', email: 'ahmed@xyzsupplies.com', phone: '03001234567', city: 'Karachi', status: 'Active' },
  { id: 'SUP002', supplierName: 'Global Traders', contactPerson: 'Ms. Fatima', email: 'fatima@globaltraders.com', phone: '03005678900', city: 'Lahore', status: 'Active' },
  { id: 'SUP003', supplierName: 'ABC Materials', contactPerson: 'Mr. Hassan', email: 'hassan@abcmaterials.com', phone: '03009876543', city: 'Islamabad', status: 'Inactive' },
];

export default function ListSuppliersScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions?.({ headerShown: false });
  }, [navigation]);

  const [searchText, setSearchText] = useState('');
  const [selectedEntries, setSelectedEntries] = useState('10');

  const filteredData = mockSuppliers.filter(supplier =>
    supplier.supplierName.toLowerCase().includes(searchText.toLowerCase()) ||
    supplier.contactPerson.toLowerCase().includes(searchText.toLowerCase()) ||
    supplier.id.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Shared Home Header with Menu */}
      <HomeHeader />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Ionicons name="briefcase-outline" size={28} color="#000" />
          <View style={styles.headerText}>
            <Text style={styles.title}>List Suppliers</Text>
            <Text style={styles.subtitle}>View all suppliers</Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search suppliers..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <View style={styles.entriesContainer}>
          <Text style={styles.entriesLabel}>Entries per page:</Text>
          <View style={styles.entriesSelector}>
            {['10', '25', '50', '100'].map(num => (
              <TouchableOpacity
                key={num}
                style={[styles.entryBtn, selectedEntries === num && styles.entryBtnActive]}
                onPress={() => setSelectedEntries(num)}
              >
                <Text style={[styles.entryBtnText, selectedEntries === num && styles.entryBtnTextActive]}>
                  {num}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.tableContainer}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderCell, { width: 50 }]}>NO</Text>
                <Text style={[styles.tableHeaderCell, { width: 110 }]}>SUPPLIER ID</Text>
                <Text style={[styles.tableHeaderCell, { width: 150 }]}>SUPPLIER NAME</Text>
                <Text style={[styles.tableHeaderCell, { width: 140 }]}>CONTACT PERSON</Text>
                <Text style={[styles.tableHeaderCell, { width: 180 }]}>EMAIL</Text>
                <Text style={[styles.tableHeaderCell, { width: 130 }]}>PHONE</Text>
                <Text style={[styles.tableHeaderCell, { width: 100 }]}>CITY</Text>
                <Text style={[styles.tableHeaderCell, { width: 100 }]}>STATUS</Text>
                <Text style={[styles.tableHeaderCell, { width: 80 }]}>ACTION</Text>
              </View>

              {filteredData.map((supplier, index) => (
                <View key={supplier.id} style={[styles.tableRow, index % 2 === 0 && styles.tableRowAlt]}>
                  <Text style={[styles.tableCell, { width: 50 }]}>{index + 1}</Text>
                  <Text style={[styles.tableCell, { width: 110 }]}>{supplier.id}</Text>
                  <Text style={[styles.tableCell, { width: 150 }]}>{supplier.supplierName}</Text>
                  <Text style={[styles.tableCell, { width: 140 }]}>{supplier.contactPerson}</Text>
                  <Text style={[styles.tableCell, { width: 180 }]}>{supplier.email}</Text>
                  <Text style={[styles.tableCell, { width: 130 }]}>{supplier.phone}</Text>
                  <Text style={[styles.tableCell, { width: 100 }]}>{supplier.city}</Text>
                  <View style={[styles.tableCell, { width: 100 }, styles.statusCell]}>
                    <View
                      style={[
                        styles.statusBadge,
                        supplier.status === 'Active' ? styles.statusActive : styles.statusInactive,
                      ]}
                    >
                      <Text style={styles.statusText}>{supplier.status}</Text>
                    </View>
                  </View>
                  <View style={[styles.tableCell, { width: 80 }, styles.actionCell]}>
                    <TouchableOpacity>
                      <Ionicons name="eye-outline" size={18} color="#1a1a1a" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.paginationInfo}>
          <Text style={styles.paginationText}>
            Showing 1 to {Math.min(filteredData.length, parseInt(selectedEntries))} of {filteredData.length} entries
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingTop: 48,
  },
  homeMenu: {
    backgroundColor: '#1a1a1a',
    padding: 14,
    borderRadius: 8,
  },
  homeAdmin: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  adminBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminInitial: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  adminText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    marginLeft: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
  },
  entriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  entriesLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  entriesSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  entryBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  entryBtnActive: {
    backgroundColor: '#1a1a1a',
    borderColor: '#1a1a1a',
  },
  entryBtnText: {
    fontSize: 12,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  entryBtnTextActive: {
    color: '#fff',
  },
  tableContainer: {
    marginBottom: 20,
  },
  table: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  tableHeaderCell: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
    paddingHorizontal: 8,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  tableRowAlt: {
    backgroundColor: '#f9f9f9',
  },
  tableCell: {
    fontSize: 13,
    color: '#333',
    paddingHorizontal: 8,
  },
  statusCell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusActive: {
    backgroundColor: '#000',
  },
  statusInactive: {
    backgroundColor: '#E5E5E5',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  actionCell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationInfo: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  paginationText: {
    fontSize: 13,
    color: '#666',
  },
});
