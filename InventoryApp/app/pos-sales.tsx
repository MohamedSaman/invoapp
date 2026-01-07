import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import HomeHeader from '@/components/HomeHeader';

// Mock POS sales data matching the screenshots
const mockSales = [
  { id: 1, invoice: 'INV-20260105-0004', saleId: '#SALE-20260105-0004', customer: 'Walking Customer', phone: 'xxxxx', date: 'Jan 05, 2026', amount: 2600.00, paymentStatus: 'Paid', saleType: 'POS' },
  { id: 2, invoice: 'INV-20260105-0003', saleId: '#SALE-20260105-0003', customer: 'Walking Customer', phone: 'xxxxx', date: 'Jan 05, 2026', amount: 4600.00, paymentStatus: 'Paid', saleType: 'POS' },
  { id: 3, invoice: 'INV-20260105-0002', saleId: '#SALE-20260105-0002', customer: 'Walking Customer', phone: 'xxxxx', date: 'Jan 05, 2026', amount: 2200.00, paymentStatus: 'Paid', saleType: 'POS' },
  { id: 4, invoice: 'INV-20260105-0001', saleId: '#SALE-20260105-0001', customer: 'Walking Customer', phone: 'xxxxx', date: 'Jan 05, 2026', amount: 6000.00, paymentStatus: 'Paid', saleType: 'POS' },
  { id: 5, invoice: 'INV-20260104-0002', saleId: '#SALE-20260104-0002', customer: 'Walking Customer', phone: 'xxxxx', date: 'Jan 04, 2026', amount: 475.00, paymentStatus: 'Paid', saleType: 'POS' },
  { id: 6, invoice: 'INV-20251231-0003', saleId: '#SALE-20251231-0003', customer: 'Walking Customer', phone: 'xxxxx', date: 'Dec 31, 2025', amount: 3500.00, paymentStatus: 'Paid', saleType: 'POS' },
  { id: 7, invoice: 'INV-20251231-0002', saleId: '#SALE-20251231-0002', customer: 'Walking Customer', phone: 'xxxxx', date: 'Dec 31, 2025', amount: 3200.00, paymentStatus: 'Paid', saleType: 'POS' },
  { id: 8, invoice: 'INV-20251231-0001', saleId: '#SALE-20251231-0001', customer: 'Walking Customer', phone: 'xxxxx', date: 'Dec 31, 2025', amount: 2800.00, paymentStatus: 'Paid', saleType: 'POS' },
];

export default function POSSalesScreen() {
  const router = useRouter();
  
  const [searchText, setSearchText] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const totalRecords = 98;
  const totalPages = Math.ceil(totalRecords / entriesPerPage);

  const formatPrice = (price: number) => {
    return `Rs.${price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleReset = () => {
    setSearchText('');
    setPaymentStatus('All Status');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Shared Home Header with Menu */}
      <HomeHeader />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <View style={styles.titleRow}>
            <View style={styles.titleLeft}>
              <View style={styles.titleIcon}>
                <Ionicons name="wallet-outline" size={28} color="#000" />
              </View>
              <View>
                <Text style={styles.mainTitle}>POS Sales</Text>
                <Text style={styles.mainTitle}>Management</Text>
                <Text style={styles.subtitle}>View and manage POS sales</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.newSaleButton}>
              <Ionicons name="add-circle-outline" size={18} color="#fff" />
              <Text style={styles.newSaleText}>New{'\n'}POS Sale</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            {/* Total POS Sales */}
            <View style={[styles.statCard, styles.blackBorderCard, styles.statHalf, { marginRight: 8 }]}>
              <Text style={styles.statLabel}>TOTAL POS SALES</Text>
              <Text style={styles.statValue} numberOfLines={1} ellipsizeMode="tail">98</Text>
              <View style={styles.statIconContainer}>
                <Ionicons name="cart-outline" size={18} color="#999" />
              </View>
            </View>

            {/* Total Revenue */}
            <View style={[styles.statCard, styles.blackBorderCard, styles.statHalf]}>
              <Text style={styles.statLabel}>TOTAL REVENUE</Text>
              <Text style={styles.statValue} numberOfLines={1} ellipsizeMode="tail">Rs.647,665.00</Text>
              <View style={styles.statIconContainer}>
                <Ionicons name="logo-usd" size={18} color="#999" />
              </View>
            </View>
          </View>

          <View style={styles.statsRow}>
            {/* Pending Payments */}
            <View style={[styles.statCard, styles.blackBorderCard, styles.statHalf, { marginRight: 8 }]}>
              <Text style={styles.statLabel}>PENDING PAYMENTS</Text>
              <Text style={styles.statValue} numberOfLines={1} ellipsizeMode="tail">Rs.0.00</Text>
              <View style={styles.statIconContainer}>
                <Ionicons name="time-outline" size={18} color="#999" />
              </View>
            </View>

            {/* Today's Sales */}
            <View style={[styles.statCard, styles.blackBorderCard, styles.statHalf]}>
              <Text style={styles.statLabel}>TODAY'S SALES</Text>
              <Text style={styles.statValue} numberOfLines={1} ellipsizeMode="tail">0</Text>
              <View style={styles.statIconContainer}>
                <Ionicons name="calendar-outline" size={18} color="#999" />
              </View>
            </View>
          </View>
        </View>

        {/* Search/Filter Section */}
        <View style={styles.filterCard}>
          <Text style={styles.filterLabel}>Search</Text>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by invoice, customer name or p..."
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          <Text style={styles.filterLabel}>Payment Status</Text>
          <TouchableOpacity style={styles.dropdownContainer}>
            <Text style={styles.dropdownText}>{paymentStatus}</Text>
            <Ionicons name="chevron-down" size={20} color="#000" />
          </TouchableOpacity>

          <Text style={styles.filterLabel}>Date</Text>
          <TouchableOpacity style={styles.dropdownContainer}>
            <Text style={styles.dropdownPlaceholder}></Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Ionicons name="refresh-outline" size={18} color="#999" />
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* POS Sales List */}
        <View style={styles.listCard}>
          <View style={styles.listHeader}>
            <Ionicons name="list-outline" size={24} color="#000" />
            <View style={styles.listTitleContainer}>
              <Text style={styles.listTitle}>POS</Text>
              <Text style={styles.listTitle}>Sales List</Text>
            </View>
            <View style={styles.entriesContainer}>
              <Text style={styles.showText}>Show</Text>
              <TouchableOpacity style={styles.entriesDropdown}>
                <Text style={styles.entriesValue}>{entriesPerPage}</Text>
                <Ionicons name="chevron-down" size={16} color="#000" />
              </TouchableOpacity>
              <Text style={styles.entriesText}>entries</Text>
            </View>
          </View>
          
          <View style={styles.recordsBadge}>
            <Text style={styles.recordsText}>{totalRecords} records</Text>
          </View>

          {/* Combined Horizontal Scrollable Table */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollContainer}>
            <View>
              {/* Combined Table Header */}
              <View style={styles.combinedTableHeader}>
                <View style={styles.colInvoice}><Text style={styles.tableHeaderText}>INVOICE</Text></View>
                <View style={styles.colCustomer}><Text style={styles.tableHeaderText}>CUSTOMER</Text></View>
                <View style={styles.colDate}><Text style={[styles.tableHeaderText, styles.headerTextCenter]}>DATE</Text></View>
                <View style={styles.colAmount}><Text style={[styles.tableHeaderText, styles.headerTextCenter]}>AMOUNT</Text></View>
                <View style={styles.colPaymentStatus}><Text style={[styles.tableHeaderText, styles.headerTextCenter]}>PAYMENT STATUS</Text></View>
                <View style={styles.colSaleType}><Text style={[styles.tableHeaderText, styles.headerTextCenter]}>SALE TYPE</Text></View>
                <View style={styles.colActions}><Text style={[styles.tableHeaderText, styles.headerTextCenter]}>ACTIONS</Text></View>
              </View>

              {/* Combined Table Rows */}
              {mockSales.map((sale, index) => {
                const getStatusStyle = (status: string) => {
                  switch(status) {
                    case 'Pending':
                      return styles.statusPending;
                    case 'Partial':
                      return styles.statusPartial;
                    case 'Paid':
                      return styles.statusPaid;
                    default:
                      return styles.statusPending;
                  }
                };

                return (
                  <View key={sale.id} style={[styles.combinedTableRow, index % 2 === 1 && styles.tableRowAlt]}>
                    <View style={styles.colInvoice}>
                      <TouchableOpacity>
                        <Text style={styles.invoiceLink}>{sale.invoice}</Text>
                      </TouchableOpacity>
                      <Text style={styles.saleIdText}>{sale.saleId}</Text>
                    </View>
                    <View style={styles.colCustomer}>
                      <Text style={styles.customerName}>{sale.customer}</Text>
                      <TouchableOpacity>
                        <Text style={styles.phoneLink}>{sale.phone}</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.colDate}>
                      <Text style={[styles.tableCell, styles.cellCenter]}>{sale.date}</Text>
                    </View>
                    <View style={styles.colAmount}>
                      <Text style={[styles.tableCell, styles.amountText, styles.cellRight]}>{formatPrice(sale.amount)}</Text>
                    </View>
                    <View style={styles.colPaymentStatus}>
                      <View style={[styles.badge, getStatusStyle(sale.paymentStatus)]}>
                        <Text style={styles.badgeText}>{sale.paymentStatus}</Text>
                      </View>
                    </View>
                    <View style={styles.colSaleType}>
                      <View style={[styles.badge, styles.saleTypeBadge]}>
                        <Text style={styles.badgeText}>{sale.saleType}</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={[styles.actionButton, styles.colActionsBtn]}>
                      <Ionicons name="settings-outline" size={16} color="#999" />
                      <Text style={styles.actionButtonText}>Actions</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </ScrollView>

          {/* Pagination */}
          <View style={styles.paginationContainer}>
            <Text style={styles.paginationInfo}>
              Showing <Text style={styles.paginationBold}>1</Text> to <Text style={styles.paginationBold}>{entriesPerPage}</Text> of <Text style={styles.paginationBold}>{totalRecords}</Text> entries
            </Text>
            <View style={styles.paginationButtons}>
              <TouchableOpacity style={styles.paginationBtn} disabled>
                <Ionicons name="chevron-back-outline" size={14} color="#999" />
                <Ionicons name="chevron-back-outline" size={14} color="#999" style={{ marginLeft: -8 }} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.paginationBtn} disabled>
                <Ionicons name="chevron-back-outline" size={16} color="#999" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.paginationBtn, styles.paginationActive]}>
                <Text style={styles.paginationActiveText}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.paginationBtn}>
                <Text style={styles.paginationNumber}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.paginationBtn}>
                <Text style={styles.paginationNumber}>3</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.paginationBtn}>
                <Text style={styles.paginationNumber}>4</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.paginationBtn}>
                <Text style={styles.paginationNumber}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.paginationBtn}>
                <Text style={styles.paginationNumber}>6</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.paginationBtn}>
                <Text style={styles.paginationNumber}>7</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.paginationBtn}>
                <Text style={styles.paginationNumber}>8</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.paginationBtn}>
                <Text style={styles.paginationNumber}>9</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.paginationBtn}>
                <Text style={styles.paginationNumber}>10</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.paginationBtn}>
                <Ionicons name="chevron-forward-outline" size={16} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.paginationBtn}>
                <Ionicons name="chevron-forward-outline" size={14} color="#000" />
                <Ionicons name="chevron-forward-outline" size={14} color="#000" style={{ marginLeft: -8 }} />
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
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  titleIcon: {
    marginRight: 12,
    marginTop: 4,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    lineHeight: 30,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  newSaleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  newSaleText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
    textAlign: 'center',
  },
  statsContainer: {
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  statHalf: {
    flex: 1,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 3,
    position: 'relative',
    minHeight: 80,
  },
  blackBorderCard: {
    borderColor: '#000',
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
    marginBottom: 6,
  },
  statIconContainer: {
    position: 'absolute',
    right: 12,
    bottom: 2,
  },
  statValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
    flexShrink: 1,
  },
  filterCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
    marginTop: 12,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#000',
  },
  dropdownContainer: {
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
  dropdownPlaceholder: {
    fontSize: 14,
    color: '#999',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  resetButtonText: {
    color: '#999',
    fontWeight: '600',
    fontSize: 16,
  },
  listCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  listTitleContainer: {
    marginLeft: 12,
    flex: 1,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    lineHeight: 26,
  },
  entriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showText: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  entriesDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  entriesValue: {
    fontSize: 14,
    color: '#000',
    marginRight: 4,
  },
  entriesText: {
    fontSize: 14,
    color: '#666',
  },
  recordsBadge: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  recordsText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  horizontalScrollContainer: {
    marginTop: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  combinedTableHeader: {
    flexDirection: 'row',
    backgroundColor: '#333',
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  tableHeaderText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  headerTextCenter: {
    textAlign: 'center',
  },
  combinedTableRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    alignItems: 'center',
  },
  tableRowAlt: {
    backgroundColor: '#F9F9F9',
  },
  tableCell: {
    fontSize: 13,
    color: '#000',
  },
  cellCenter: {
    textAlign: 'center',
  },
  cellRight: {
    textAlign: 'right',
  },
  colInvoice: { width: 130 },
  colCustomer: { width: 130 },
  colDate: { width: 90 },
  colAmount: { width: 110 },
  colPaymentStatus: { width: 120, justifyContent: 'center', alignItems: 'center' },
  colSaleType: { width: 90, justifyContent: 'center', alignItems: 'center' },
  colActions: { width: 100, justifyContent: 'center', alignItems: 'center' },
  colActionsBtn: { width: 100 },
  invoiceLink: {
    fontSize: 13,
    color: '#000',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  saleIdText: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
  },
  customerName: {
    fontSize: 13,
    color: '#000',
    fontWeight: '500',
  },
  phoneLink: {
    fontSize: 12,
    color: '#000',
    marginTop: 4,
    textDecorationLine: 'underline',
  },
  amountText: {
    fontWeight: '600',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'center',
  },
  statusPending: {
    backgroundColor: '#808080',
  },
  statusPartial: {
    backgroundColor: '#A9A9A9',
  },
  statusPaid: {
    backgroundColor: '#000',
  },
  saleTypeBadge: {
    backgroundColor: '#333',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 4,
  },
  actionButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#999',
  },
  paginationContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  paginationInfo: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },
  paginationBold: {
    fontWeight: '700',
    color: '#000',
  },
  paginationButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
  },
  paginationBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paginationActive: {
    backgroundColor: '#333',
  },
  paginationActiveText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  paginationNumber: {
    color: '#000',
    fontWeight: '600',
    fontSize: 14,
  },
});
