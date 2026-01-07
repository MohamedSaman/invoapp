import { Ionicons } from '@expo/vector-icons';
import { useRouter, useNavigation } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import HomeHeader from '@/components/HomeHeader';

// Mock GRN data
const mockGRN = [
  { id: 1, grnNumber: 'GRN001', poNumber: 'PO001', supplier: 'Ahmad Trading', product: 'Flasher Musical 12 V', quantity: 50, received: 50, date: '2024-01-15', status: 'Completed' },
  { id: 2, grnNumber: 'GRN002', poNumber: 'PO002', supplier: 'Hassan Enterprises', product: 'Ignition Switch', quantity: 30, received: 28, date: '2024-01-14', status: 'Partial' },
  { id: 3, grnNumber: 'GRN003', poNumber: 'PO003', supplier: 'Zarai Auto Parts', product: 'Flasher Electrical 24 V', quantity: 25, received: 0, date: '2024-01-13', status: 'Pending' },
];

export default function GRNScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions?.({ headerShown: false });
  }, [navigation]);

  const [searchText, setSearchText] = useState('');
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredGRN = mockGRN.filter(grn =>
    grn.grnNumber.toLowerCase().includes(searchText.toLowerCase()) ||
    grn.poNumber.toLowerCase().includes(searchText.toLowerCase()) ||
    grn.supplier.toLowerCase().includes(searchText.toLowerCase()) ||
    grn.product.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalPages = Math.ceil(filteredGRN.length / itemsPerPage);

  const renderPaginationNumbers = () => {
    const pagination = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pagination.push(
          <TouchableOpacity
            key={i}
            style={[styles.pageBtn, currentPage === i && styles.pageActive]}
            onPress={() => setCurrentPage(i)}
          >
            <Text style={[styles.pageText, currentPage === i && styles.pageActiveText]}>{i}</Text>
          </TouchableOpacity>
        );
      }
    } else {
      for (let i = 1; i <= 3; i++) {
        pagination.push(
          <TouchableOpacity
            key={i}
            style={[styles.pageBtn, currentPage === i && styles.pageActive]}
            onPress={() => setCurrentPage(i)}
          >
            <Text style={[styles.pageText, currentPage === i && styles.pageActiveText]}>{i}</Text>
          </TouchableOpacity>
        );
      }
      pagination.push(<Text key="dots" style={styles.dotText}>...</Text>);
      for (let i = totalPages - 1; i <= totalPages; i++) {
        pagination.push(
          <TouchableOpacity
            key={i}
            style={[styles.pageBtn, currentPage === i && styles.pageActive]}
            onPress={() => setCurrentPage(i)}
          >
            <Text style={[styles.pageText, currentPage === i && styles.pageActiveText]}>{i}</Text>
          </TouchableOpacity>
        );
      }
    }
    return pagination;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Shared Home Header with Menu */}
      <HomeHeader />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Ionicons name="package-variant-outline" size={28} color="#000" />
          <View style={styles.headerText}>
            <Text style={styles.title}>Goods Received Note (GRN)</Text>
            <Text style={styles.subtitle}>Manage received goods</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search GRN, PO, supplier, product..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Entries Selector */}
        <View style={styles.entriesContainer}>
          <Text style={styles.entriesText}>Show</Text>
          <View style={styles.entriesSelector}>
            <TouchableOpacity style={styles.entriesOption}>
              <Text style={styles.entriesOptionText}>10</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.entriesOption}>
              <Text style={styles.entriesOptionText}>25</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.entriesOption}>
              <Text style={styles.entriesOptionText}>50</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.entriesOption}>
              <Text style={styles.entriesOptionText}>100</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.entriesText}>entries</Text>
        </View>

        {/* Table */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tableContainer}>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, styles.colId]}>NO</Text>
              <Text style={[styles.tableCell, styles.colGRN]}>GRN NO</Text>
              <Text style={[styles.tableCell, styles.colPO]}>PO NO</Text>
              <Text style={[styles.tableCell, styles.colSupplier]}>SUPPLIER</Text>
              <Text style={[styles.tableCell, styles.colProduct]}>PRODUCT</Text>
              <Text style={[styles.tableCell, styles.colQtyOrdered]}>QTY ORDERED</Text>
              <Text style={[styles.tableCell, styles.colQtyReceived]}>QTY RECEIVED</Text>
              <Text style={[styles.tableCell, styles.colDate]}>DATE</Text>
              <Text style={[styles.tableCell, styles.colStatus]}>STATUS</Text>
              <Text style={[styles.tableCell, styles.colAction]}>ACTION</Text>
            </View>

            {/* Table Rows */}
            {filteredGRN.map((grn, index) => (
              <View key={grn.id} style={[styles.tableRow, index % 2 === 0 && styles.tableRowAlternate]}>
                <Text style={[styles.tableCell, styles.colId]}>{index + 1}</Text>
                <Text style={[styles.tableCell, styles.colGRN]}>{grn.grnNumber}</Text>
                <Text style={[styles.tableCell, styles.colPO]}>{grn.poNumber}</Text>
                <Text style={[styles.tableCell, styles.colSupplier]}>{grn.supplier}</Text>
                <Text style={[styles.tableCell, styles.colProduct]}>{grn.product}</Text>
                <Text style={[styles.tableCell, styles.colQtyOrdered]}>{grn.quantity}</Text>
                <Text style={[styles.tableCell, styles.colQtyReceived]}>{grn.received}</Text>
                <Text style={[styles.tableCell, styles.colDate]}>{grn.date}</Text>
                <View style={[styles.tableCell, styles.colStatus]}>
                  <View style={[styles.statusBadge, grn.status === 'Completed' ? styles.statusCompleted : grn.status === 'Partial' ? styles.statusPartial : styles.statusPending]}>
                    <Text style={styles.statusText}>{grn.status}</Text>
                  </View>
                </View>
                <TouchableOpacity style={[styles.tableCell, styles.colAction]}>
                  <Ionicons name="eye-outline" size={18} color="#1a1a1a" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Pagination Info */}
        <View style={styles.paginationInfo}>
          <Text style={styles.paginationText}>
            Showing 1 to {filteredGRN.length} of {filteredGRN.length} entries
          </Text>
        </View>

        {/* Pagination Controls */}
        <View style={styles.pagination}>
          {renderPaginationNumbers()}
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
  colGRN: {
    width: 90,
    color: '#1a1a1a',
  },
  colPO: {
    width: 80,
    color: '#1a1a1a',
  },
  colSupplier: {
    width: 120,
    color: '#1a1a1a',
  },
  colProduct: {
    width: 150,
    color: '#1a1a1a',
  },
  colQtyOrdered: {
    width: 100,
    color: '#1a1a1a',
  },
  colQtyReceived: {
    width: 100,
    color: '#1a1a1a',
    fontWeight: '600',
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
  statusCompleted: {
    backgroundColor: '#000',
  },
  statusPartial: {
    backgroundColor: '#999',
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
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  paginationText: {
    fontSize: 13,
    color: '#666',
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    marginBottom: 20,
  },
  pageBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  pageActive: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  pageText: {
    fontSize: 12,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  pageActiveText: {
    color: '#fff',
  },
  dotText: {
    fontSize: 12,
    color: '#666',
    alignSelf: 'center',
    marginHorizontal: 4,
  },
});