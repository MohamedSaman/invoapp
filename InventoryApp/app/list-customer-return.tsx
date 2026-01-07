import { Ionicons } from '@expo/vector-icons';
import { useRouter, useNavigation } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import HomeHeader from '@/components/HomeHeader';

const mockReturns = [
  { id: 1, returnNo: 'CR001', customer: 'Ahmad Trading', product: 'Flasher Musical 12 V', quantity: 5, reason: 'Defective', date: '2024-01-15', status: 'Approved' },
  { id: 2, returnNo: 'CR002', customer: 'Hassan Enterprises', product: 'Ignition Switch', quantity: 3, reason: 'Damaged', date: '2024-01-14', status: 'Pending' },
  { id: 3, returnNo: 'CR003', customer: 'Zarai Auto Parts', product: 'Flasher Electrical 24 V', quantity: 2, reason: 'Not as Ordered', date: '2024-01-13', status: 'Approved' },
];

export default function ListCustomerReturnScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions?.({ headerShown: false });
  }, [navigation]);

  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredReturns = mockReturns.filter(r =>
    r.returnNo.toLowerCase().includes(searchText.toLowerCase()) ||
    r.customer.toLowerCase().includes(searchText.toLowerCase()) ||
    r.product.toLowerCase().includes(searchText.toLowerCase())
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
            <Text style={styles.title}>List Customer Return</Text>
            <Text style={styles.subtitle}>View all customer returns</Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search return no, customer, product..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <View style={styles.entriesContainer}>
          <Text style={styles.entriesText}>Show</Text>
          <View style={styles.entriesSelector}>
            {[10, 25, 50, 100].map(num => (
              <TouchableOpacity key={num} style={styles.entriesOption}>
                <Text style={styles.entriesOptionText}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.entriesText}>entries</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tableContainer}>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, styles.colId]}>NO</Text>
              <Text style={[styles.tableCell, styles.colReturn]}>RETURN NO</Text>
              <Text style={[styles.tableCell, styles.colCustomer]}>CUSTOMER</Text>
              <Text style={[styles.tableCell, styles.colProduct]}>PRODUCT</Text>
              <Text style={[styles.tableCell, styles.colQty]}>QTY</Text>
              <Text style={[styles.tableCell, styles.colReason]}>REASON</Text>
              <Text style={[styles.tableCell, styles.colDate]}>DATE</Text>
              <Text style={[styles.tableCell, styles.colStatus]}>STATUS</Text>
              <Text style={[styles.tableCell, styles.colAction]}>ACTION</Text>
            </View>

            {filteredReturns.map((ret, index) => (
              <View key={ret.id} style={[styles.tableRow, index % 2 === 0 && styles.tableRowAlternate]}>
                <Text style={[styles.tableCell, styles.colId]}>{index + 1}</Text>
                <Text style={[styles.tableCell, styles.colReturn]}>{ret.returnNo}</Text>
                <Text style={[styles.tableCell, styles.colCustomer]}>{ret.customer}</Text>
                <Text style={[styles.tableCell, styles.colProduct]}>{ret.product}</Text>
                <Text style={[styles.tableCell, styles.colQty]}>{ret.quantity}</Text>
                <Text style={[styles.tableCell, styles.colReason]}>{ret.reason}</Text>
                <Text style={[styles.tableCell, styles.colDate]}>{ret.date}</Text>
                <View style={[styles.tableCell, styles.colStatus]}>
                  <View style={[styles.statusBadge, ret.status === 'Approved' ? styles.statusApproved : styles.statusPending]}>
                    <Text style={styles.statusText}>{ret.status}</Text>
                  </View>
                </View>
                <TouchableOpacity style={[styles.tableCell, styles.colAction]}>
                  <Ionicons name="eye-outline" size={18} color="#1a1a1a" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.paginationInfo}>
          <Text style={styles.paginationText}>
            Showing 1 to {filteredReturns.length} of {filteredReturns.length} entries
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
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
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
    marginBottom: 12,
    gap: 8,
  },
  entriesText: {
    fontSize: 13,
    color: '#666',
  },
  entriesSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  entriesOption: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  entriesOptionText: {
    fontSize: 12,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  tableContainer: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    overflow: 'hidden',
  },
  table: {
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    minHeight: 44,
  },
  tableHeader: {
    backgroundColor: '#1a1a1a',
  },
  tableRowAlternate: {
    backgroundColor: '#f9f9f9',
  },
  tableCell: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 12,
    justifyContent: 'center',
  },
  colId: {
    width: 50,
    color: '#fff',
  },
  colReturn: {
    width: 90,
    color: '#1a1a1a',
  },
  colCustomer: {
    width: 120,
    color: '#1a1a1a',
  },
  colProduct: {
    width: 150,
    color: '#1a1a1a',
  },
  colQty: {
    width: 60,
    color: '#1a1a1a',
  },
  colReason: {
    width: 110,
    color: '#1a1a1a',
  },
  colDate: {
    width: 100,
    color: '#1a1a1a',
  },
  colStatus: {
    width: 100,
    justifyContent: 'center',
  },
  colAction: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignItems: 'center',
  },
  statusApproved: {
    backgroundColor: '#000',
  },
  statusPending: {
    backgroundColor: '#E5E5E5',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },
  paginationInfo: {
    paddingVertical: 12,
  },
  paginationText: {
    fontSize: 13,
    color: '#666',
  },
});
