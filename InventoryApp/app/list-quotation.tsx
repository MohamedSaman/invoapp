import { Ionicons } from '@expo/vector-icons';
import { useRouter, useNavigation } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import HomeHeader from '@/components/HomeHeader';

// Mock quotations data
const mockQuotations = [
  { id: 1, quotationNo: 'QT001', customer: 'Ahmad Trading', product: 'Flasher Musical 12 V', quantity: 50, total: 23000.00, date: '2024-01-15', status: 'Pending' },
  { id: 2, quotationNo: 'QT002', customer: 'Hassan Enterprises', product: 'Ignition Switch', quantity: 30, total: 10500.00, date: '2024-01-14', status: 'Accepted' },
  { id: 3, quotationNo: 'QT003', customer: 'Zarai Auto Parts', product: 'Flasher Electrical 24 V', quantity: 25, total: 11000.00, date: '2024-01-13', status: 'Pending' },
];

export default function ListQuotationScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions?.({ headerShown: false });
  }, [navigation]);

  const [searchText, setSearchText] = useState('');
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredQuotations = mockQuotations.filter(q =>
    q.quotationNo.toLowerCase().includes(searchText.toLowerCase()) ||
    q.customer.toLowerCase().includes(searchText.toLowerCase()) ||
    q.product.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalPages = Math.ceil(filteredQuotations.length / itemsPerPage);

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

  const formatPrice = (price: number) => {
    return `Rs.${price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Shared Home Header with Menu */}
      <HomeHeader />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Ionicons name="grid-outline" size={28} color="#000" />
          <View style={styles.headerText}>
            <Text style={styles.title}>List Quotation</Text>
            <Text style={styles.subtitle}>View all quotations</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search quotation, customer, product..."
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
              <Text style={[styles.tableCell, styles.colQuotation]}>QUOTATION NO</Text>
              <Text style={[styles.tableCell, styles.colCustomer]}>CUSTOMER</Text>
              <Text style={[styles.tableCell, styles.colProduct]}>PRODUCT</Text>
              <Text style={[styles.tableCell, styles.colQty]}>QTY</Text>
              <Text style={[styles.tableCell, styles.colTotal]}>TOTAL</Text>
              <Text style={[styles.tableCell, styles.colDate]}>DATE</Text>
              <Text style={[styles.tableCell, styles.colStatus]}>STATUS</Text>
              <Text style={[styles.tableCell, styles.colAction]}>ACTION</Text>
            </View>

            {/* Table Rows */}
            {filteredQuotations.map((quotation, index) => (
              <View key={quotation.id} style={[styles.tableRow, index % 2 === 0 && styles.tableRowAlternate]}>
                <Text style={[styles.tableCell, styles.colId]}>{index + 1}</Text>
                <Text style={[styles.tableCell, styles.colQuotation]}>{quotation.quotationNo}</Text>
                <Text style={[styles.tableCell, styles.colCustomer]}>{quotation.customer}</Text>
                <Text style={[styles.tableCell, styles.colProduct]}>{quotation.product}</Text>
                <Text style={[styles.tableCell, styles.colQty]}>{quotation.quantity}</Text>
                <Text style={[styles.tableCell, styles.colTotal]}>{formatPrice(quotation.total)}</Text>
                <Text style={[styles.tableCell, styles.colDate]}>{quotation.date}</Text>
                <View style={[styles.tableCell, styles.colStatus]}>
                  <View style={[styles.statusBadge, quotation.status === 'Accepted' ? styles.statusAccepted : styles.statusPending]}>
                    <Text style={styles.statusText}>{quotation.status}</Text>
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
            Showing 1 to {filteredQuotations.length} of {filteredQuotations.length} entries
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
  colQuotation: {
    width: 100,
    color: '#1a1a1a',
  },
  colCustomer: {
    width: 130,
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
  colTotal: {
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
  statusAccepted: {
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
  tableHeader: {
    backgroundColor: '#1a1a1a',
  },
  colId: {
    width: 50,
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
