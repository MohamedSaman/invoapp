import { Ionicons } from '@expo/vector-icons';
import { useRouter, useNavigation } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import HomeHeader from '@/components/HomeHeader';

// Mock product data based on screenshots
const mockProducts = [
  { id: 1, name: 'Flasher Musical 12 V', code: 'USN0001', brand: 'Default Brand', model: '-', category: 'Electrical Parts', stock: 5, damagedStock: 0, supplierPrice: 304.00, sellingPrice: 460.00, discountPrice: 0, status: 'Active' },
  { id: 2, name: 'Flasher Musical 24 V', code: 'USN0002', brand: 'Default Brand', model: '-', category: 'Electrical Parts', stock: 5, damagedStock: 0, supplierPrice: 304.00, sellingPrice: 460.00, discountPrice: 0, status: 'Active' },
  { id: 3, name: 'Flasher Electrical 12 V', code: 'USN0003', brand: 'Default Brand', model: '-', category: 'Electrical Parts', stock: 2, damagedStock: 0, supplierPrice: 296.00, sellingPrice: 440.00, discountPrice: 0, status: 'Active' },
  { id: 4, name: 'Flasher Electrical 24 V', code: 'USN0004', brand: 'Default Brand', model: '-', category: 'Electrical Parts', stock: 3, damagedStock: 0, supplierPrice: 296.00, sellingPrice: 440.00, discountPrice: 0, status: 'Active' },
  { id: 5, name: 'Flasher Tata Ace 12 V', code: 'USN0005', brand: 'Default Brand', model: '-', category: 'Electrical Parts', stock: 2, damagedStock: 0, supplierPrice: 520.00, sellingPrice: 780.00, discountPrice: 0, status: 'Active' },
  { id: 6, name: 'Flasher 8 Pin Bolero', code: 'USN0006', brand: 'Default Brand', model: '-', category: 'Electrical Parts', stock: 3, damagedStock: 0, supplierPrice: 2064.00, sellingPrice: 3100.00, discountPrice: 0, status: 'Active' },
  { id: 7, name: 'Ignition Switch M. DI Tractor', code: 'USN0007', brand: 'Default Brand', model: '-', category: 'Electrical Parts', stock: 0, damagedStock: 0, supplierPrice: 0.00, sellingPrice: 0.00, discountPrice: 0, status: 'Active' },
  { id: 8, name: 'Ignition Switch Bolero o/m', code: 'USN0008', brand: 'Default Brand', model: '-', category: 'Electrical Parts', stock: 4, damagedStock: 0, supplierPrice: 350.00, sellingPrice: 520.00, discountPrice: 0, status: 'Active' },
  { id: 9, name: 'Ignition Switch Ford Tractor', code: 'USN0009', brand: 'Default Brand', model: '-', category: 'Electrical Parts', stock: 6, damagedStock: 0, supplierPrice: 420.00, sellingPrice: 630.00, discountPrice: 0, status: 'Active' },
  { id: 10, name: 'Ignition Switch Tata 1210', code: 'USN0010', brand: 'Default Brand', model: '-', category: 'Electrical Parts', stock: 8, damagedStock: 0, supplierPrice: 280.00, sellingPrice: 420.00, discountPrice: 0, status: 'Active' },
];

const LOW_STOCK_THRESHOLD = 10;

export default function ListProductScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  useEffect(() => {
    // Hide the default navigator header so only our custom header shows
    navigation.setOptions?.({ headerShown: false });
  }, [navigation]);
  const [searchText, setSearchText] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEntriesDropdown, setShowEntriesDropdown] = useState(false);

  const openProductDetail = (product: typeof mockProducts[0]) => {
    router.push({
      pathname: '/product-detail',
      params: {
        id: product.id.toString(),
        name: product.name,
        code: product.code,
        brand: product.brand,
        model: product.model,
        category: product.category,
        stock: product.stock.toString(),
        supplierPrice: product.supplierPrice.toString(),
        sellingPrice: product.sellingPrice.toString(),
        discountPrice: product.discountPrice.toString(),
        damagedStock: product.damagedStock.toString(),
        status: product.status,
      },
    });
  };

  const totalEntries = 4622; // Mock total
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const entriesOptions = [10, 25, 50, 100];

  const formatPrice = (price: number) => {
    return `Rs.${price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const renderPaginationNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    for (let i = 1; i <= Math.min(maxVisible, 10); i++) {
      pages.push(
        <TouchableOpacity
          key={i}
          style={[styles.pageNumber, currentPage === i && styles.pageNumberActive]}
          onPress={() => setCurrentPage(i)}
        >
          <Text style={[styles.pageNumberText, currentPage === i && styles.pageNumberTextActive]}>
            {i}
          </Text>
        </TouchableOpacity>
      );
    }

    if (totalPages > 10) {
      pages.push(
        <Text key="dots" style={styles.pageDots}>...</Text>
      );
      pages.push(
        <TouchableOpacity
          key={462}
          style={styles.pageNumber}
          onPress={() => setCurrentPage(462)}
        >
          <Text style={styles.pageNumberText}>462</Text>
        </TouchableOpacity>
      );
      pages.push(
        <TouchableOpacity
          key={463}
          style={styles.pageNumber}
          onPress={() => setCurrentPage(463)}
        >
          <Text style={styles.pageNumberText}>463</Text>
        </TouchableOpacity>
      );
    }

    return pages;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Shared Home Header with Menu */}
      <HomeHeader />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <View style={styles.titleIcon}>
            <Ionicons name="cube-outline" size={32} color="#000" />
          </View>
          <View>
            <Text style={styles.mainTitle}>Product Inventory</Text>
            <Text style={styles.mainTitle}>Management</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Manage your product catalog and inventory levels efficiently</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Products..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="checkbox-outline" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Products List Card */}
        <View style={styles.listCard}>
          <View style={styles.listHeader}>
            <Ionicons name="list" size={24} color="#000" />
            <View style={styles.listTitleContainer}>
              <Text style={styles.listTitle}>Products</Text>
              <Text style={styles.listTitle}>List</Text>
              <Text style={styles.listSubtitle}>View and manage all products in your inventory</Text>
            </View>
            <View style={styles.entriesSelector}>
              <Text style={styles.showText}>Show</Text>
              <TouchableOpacity 
                style={styles.entriesDropdown}
                onPress={() => setShowEntriesDropdown(!showEntriesDropdown)}
              >
                <Text style={styles.entriesValue}>{entriesPerPage}</Text>
                <Ionicons name="chevron-down" size={16} color="#333" />
              </TouchableOpacity>
              <Text style={styles.entriesText}>entries</Text>
            </View>
          </View>

          {showEntriesDropdown && (
            <View style={styles.dropdownMenu}>
              {entriesOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setEntriesPerPage(option);
                    setShowEntriesDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Table Header */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, styles.colNo]}>NO</Text>
                <Text style={[styles.tableHeaderText, styles.colName]}>PRODUCT NAME</Text>
                <Text style={[styles.tableHeaderText, styles.colCode]}>CODE</Text>
                <Text style={[styles.tableHeaderText, styles.colBrand]}>BRAND</Text>
                <Text style={[styles.tableHeaderText, styles.colModel]}>MODEL</Text>
                <Text style={[styles.tableHeaderText, styles.colStock]}>STOCK</Text>
                <Text style={[styles.tableHeaderText, styles.colPrice]}>SUPPLIER PRICE</Text>
                <Text style={[styles.tableHeaderText, styles.colPrice]}>SELLING PRICE</Text>
                <Text style={[styles.tableHeaderText, styles.colStatus]}>STATUS</Text>
                <Text style={[styles.tableHeaderText, styles.colActions]}>ACTIONS</Text>
              </View>

              {/* Table Rows */}
              {mockProducts.map((product) => (
                <TouchableOpacity key={product.id} style={styles.tableRow} onPress={() => openProductDetail(product)}>
                  <Text style={[styles.tableCell, styles.colNo]}>{product.id}</Text>
                  <Text style={[styles.tableCell, styles.colName]}>{product.name}</Text>
                  <Text style={[styles.tableCell, styles.colCode]}>{product.code}</Text>
                  <Text style={[styles.tableCell, styles.colBrand]}>{product.brand}</Text>
                  <Text style={[styles.tableCell, styles.colModel]}>{product.model}</Text>
                  <View style={[styles.stockCell, styles.colStock]}>
                    <Text style={styles.stockText}>{product.stock}</Text>
                    {product.stock < LOW_STOCK_THRESHOLD && (
                      <Ionicons name="warning" size={14} color="#ff4444" style={styles.warningIcon} />
                    )}
                  </View>
                  <Text style={[styles.tableCell, styles.colPrice]}>{formatPrice(product.supplierPrice)}</Text>
                  <Text style={[styles.tableCell, styles.colPrice]}>{formatPrice(product.sellingPrice)}</Text>
                  <View style={[styles.statusCell, styles.colStatus]}>
                    <View style={styles.statusBadge}>
                      <Text style={styles.statusText}>{product.status}</Text>
                    </View>
                  </View>
                  <View style={[styles.actionsCell, styles.colActions]}>
                    <TouchableOpacity style={styles.actionsButton} onPress={() => openProductDetail(product)}>
                      <Ionicons name="settings" size={12} color="#fff" />
                      <Text style={styles.actionsButtonText}>Actions</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Pagination */}
          <View style={styles.paginationContainer}>
            <Text style={styles.paginationInfo}>
              Showing <Text style={styles.paginationHighlight}>1</Text> to <Text style={styles.paginationHighlight}>10</Text> of <Text style={styles.paginationHighlight}>{totalEntries}</Text> entries
            </Text>
            
            <View style={styles.paginationControls}>
              <TouchableOpacity style={styles.paginationArrow} disabled={currentPage === 1}>
                <Ionicons name="chevron-back-outline" size={16} color="#999" />
                <Ionicons name="chevron-back-outline" size={16} color="#999" style={{ marginLeft: -10 }} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.paginationArrow} disabled={currentPage === 1}>
                <Ionicons name="chevron-back" size={18} color="#999" />
              </TouchableOpacity>
              
              <View style={styles.pageNumbers}>
                {renderPaginationNumbers()}
              </View>

              <TouchableOpacity style={styles.paginationArrow} disabled={currentPage === totalPages}>
                <Ionicons name="chevron-forward" size={18} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.paginationArrow} disabled={currentPage === totalPages}>
                <Ionicons name="chevron-forward-outline" size={16} color="#333" />
                <Ionicons name="chevron-forward-outline" size={16} color="#333" style={{ marginLeft: -10 }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    paddingTop: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  placeholder: {
    width: 40,
  },
  menuButton: {
    backgroundColor: '#4a5a23',
    padding: 10,
    borderRadius: 8,
  },
  posButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 12,
  },
  posText: {
    color: '#000',
    fontWeight: '600',
    marginLeft: 6,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
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
    paddingBottom: 12,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
  titleIcon: {
    marginRight: 12,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e6e6e6',
  },
  searchIcon: {
    marginRight: 8,
    color: '#333',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  actionBtn: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
  },
  listCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  listTitleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  listSubtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  entriesSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showText: {
    fontSize: 14,
    color: '#333',
    marginRight: 8,
  },
  entriesDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  entriesValue: {
    fontSize: 14,
    color: '#333',
    marginRight: 8,
  },
  entriesText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 100,
    right: 60,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    zIndex: 1000,
    elevation: 5,
  },
  dropdownItem: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  tableHeaderText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 11,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  tableCell: {
    fontSize: 13,
    color: '#000',
  },
  colNo: {
    width: 40,
  },
  colName: {
    width: 100,
  },
  colCode: {
    width: 80,
  },
  colBrand: {
    width: 80,
  },
  colModel: {
    width: 50,
  },
  colStock: {
    width: 60,
  },
  colPrice: {
    width: 90,
  },
  colStatus: {
    width: 70,
  },
  colActions: {
    width: 90,
  },
  stockCell: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockText: {
    fontSize: 13,
    color: '#000',
  },
  warningIcon: {
    marginLeft: 4,
  },
  statusCell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  actionsCell: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 4,
  },
  actionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  actionsButtonText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 6,
  },
  paginationContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
  paginationInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  paginationHighlight: {
    color: '#000',
    fontWeight: '600',
  },
  paginationControls: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  paginationArrow: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 4,
  },
  pageNumbers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    marginVertical: 4,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e6e6e6',
  },
  pageNumberActive: {
    backgroundColor: '#000',
  },
  pageNumberText: {
    fontSize: 13,
    color: '#000',
  },
  pageNumberTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  pageDots: {
    fontSize: 14,
    color: '#555',
    marginHorizontal: 8,
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
});
