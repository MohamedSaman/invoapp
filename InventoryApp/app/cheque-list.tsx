import { Ionicons } from '@expo/vector-icons';
import { useRouter, useNavigation } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import HomeHeader from '@/components/HomeHeader';

const mockCheques = [
  { id: 1, chequeNo: 'CHQ001', bankName: 'State Bank', amount: 50000, date: '2024-01-15', status: 'Cleared' },
  { id: 2, chequeNo: 'CHQ002', bankName: 'HBL', amount: 75000, date: '2024-01-14', status: 'Pending' },
  { id: 3, chequeNo: 'CHQ003', bankName: 'UBL', amount: 30000, date: '2024-01-13', status: 'Bounced' },
];

export default function ChequeListScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions?.({ headerShown: false });
  }, [navigation]);

  const [searchText, setSearchText] = useState('');

  const filteredCheques = mockCheques.filter(c =>
    c.chequeNo.toLowerCase().includes(searchText.toLowerCase()) ||
    c.bankName.toLowerCase().includes(searchText.toLowerCase())
  );

  const formatPrice = (price: number) => {
    return `Rs.${price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Shared Home Header with Menu */}
      <HomeHeader />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Ionicons name="list-outline" size={28} color="#000" />
          <View style={styles.headerText}>
            <Text style={styles.title}>Cheque List</Text>
            <Text style={styles.subtitle}>View all cheques</Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search cheque no, bank..."
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
              <Text style={[styles.tableCell, styles.colCheque]}>CHEQUE NO</Text>
              <Text style={[styles.tableCell, styles.colBank]}>BANK NAME</Text>
              <Text style={[styles.tableCell, styles.colAmount]}>AMOUNT</Text>
              <Text style={[styles.tableCell, styles.colDate]}>DATE</Text>
              <Text style={[styles.tableCell, styles.colStatus]}>STATUS</Text>
              <Text style={[styles.tableCell, styles.colAction]}>ACTION</Text>
            </View>

            {filteredCheques.map((cheque, index) => (
              <View key={cheque.id} style={[styles.tableRow, index % 2 === 0 && styles.tableRowAlternate]}>
                <Text style={[styles.tableCell, styles.colId]}>{index + 1}</Text>
                <Text style={[styles.tableCell, styles.colCheque]}>{cheque.chequeNo}</Text>
                <Text style={[styles.tableCell, styles.colBank]}>{cheque.bankName}</Text>
                <Text style={[styles.tableCell, styles.colAmount]}>{formatPrice(cheque.amount)}</Text>
                <Text style={[styles.tableCell, styles.colDate]}>{cheque.date}</Text>
                <View style={[styles.tableCell, styles.colStatus]}>
                  <View style={[styles.statusBadge, 
                    cheque.status === 'Cleared' ? styles.statusCleared : 
                    cheque.status === 'Bounced' ? styles.statusBounced : 
                    styles.statusPending]}>
                    <Text style={styles.statusText}>{cheque.status}</Text>
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
            Showing 1 to {filteredCheques.length} of {filteredCheques.length} entries
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
  colCheque: {
    width: 100,
    color: '#1a1a1a',
  },
  colBank: {
    width: 120,
    color: '#1a1a1a',
  },
  colAmount: {
    width: 130,
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
  statusCleared: {
    backgroundColor: '#000',
  },
  statusBounced: {
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
  },
  paginationText: {
    fontSize: 13,
    color: '#666',
  },
});
