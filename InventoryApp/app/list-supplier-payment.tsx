import { Ionicons } from '@expo/vector-icons';
import { useRouter, useNavigation } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import HomeHeader from '@/components/HomeHeader';

const mockPayments = [
  { id: 'PAY001', poNumber: 'PO-001', supplierName: 'XYZ Supplies', amount: 40000, method: 'NEFT', date: '2025-01-05', status: 'Paid' },
  { id: 'PAY002', poNumber: 'PO-002', supplierName: 'ABC Materials', amount: 75000, method: 'Cheque', date: '2025-01-04', status: 'Paid' },
  { id: 'PAY003', poNumber: 'PO-003', supplierName: 'Global Traders', amount: 60000, method: 'Online', date: '2025-01-03', status: 'Pending' },
];

export default function ListSupplierPaymentScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions?.({ headerShown: false });
  }, [navigation]);

  const [searchText, setSearchText] = useState('');
  const [selectedEntries, setSelectedEntries] = useState('10');

  const filteredData = mockPayments.filter(payment =>
    payment.supplierName.toLowerCase().includes(searchText.toLowerCase()) ||
    payment.poNumber.toLowerCase().includes(searchText.toLowerCase()) ||
    payment.id.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Shared Home Header with Menu */}
      <HomeHeader />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Ionicons name="list-outline" size={28} color="#000" />
          <View style={styles.headerText}>
            <Text style={styles.title}>List Supplier Payment</Text>
            <Text style={styles.subtitle}>View all supplier payments</Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search payments..."
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
                <Text style={[styles.tableHeaderCell, { width: 110 }]}>PAYMENT ID</Text>
                <Text style={[styles.tableHeaderCell, { width: 100 }]}>PO NUMBER</Text>
                <Text style={[styles.tableHeaderCell, { width: 150 }]}>SUPPLIER NAME</Text>
                <Text style={[styles.tableHeaderCell, { width: 120 }]}>AMOUNT (Rs.)</Text>
                <Text style={[styles.tableHeaderCell, { width: 110 }]}>METHOD</Text>
                <Text style={[styles.tableHeaderCell, { width: 120 }]}>DATE</Text>
                <Text style={[styles.tableHeaderCell, { width: 100 }]}>STATUS</Text>
                <Text style={[styles.tableHeaderCell, { width: 80 }]}>ACTION</Text>
              </View>

              {filteredData.map((payment, index) => (
                <View key={payment.id} style={[styles.tableRow, index % 2 === 0 && styles.tableRowAlt]}>
                  <Text style={[styles.tableCell, { width: 50 }]}>{index + 1}</Text>
                  <Text style={[styles.tableCell, { width: 110 }]}>{payment.id}</Text>
                  <Text style={[styles.tableCell, { width: 100 }]}>{payment.poNumber}</Text>
                  <Text style={[styles.tableCell, { width: 150 }]}>{payment.supplierName}</Text>
                  <Text style={[styles.tableCell, { width: 120 }]}>
                    {payment.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </Text>
                  <Text style={[styles.tableCell, { width: 110 }]}>{payment.method}</Text>
                  <Text style={[styles.tableCell, { width: 120 }]}>{payment.date}</Text>
                  <View style={[styles.tableCell, { width: 100 }, styles.statusCell]}>
                    <View
                      style={[
                        styles.statusBadge,
                        payment.status === 'Paid' ? styles.statusPaid : styles.statusPending,
                      ]}
                    >
                      <Text style={styles.statusText}>{payment.status}</Text>
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
  statusPaid: {
    backgroundColor: '#000',
  },
  statusPending: {
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
