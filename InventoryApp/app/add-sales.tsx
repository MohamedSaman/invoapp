import { Ionicons } from '@expo/vector-icons';
import { useRouter, useNavigation } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import HomeHeader from '@/components/HomeHeader';

export default function AddSalesScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions?.({ headerShown: false });
  }, [navigation]);

  const [selectedCustomer, setSelectedCustomer] = useState('Walking Customer - xxxxx (Default)');
  const [productSearch, setProductSearch] = useState('');
  const [notes, setNotes] = useState('');
  const [saleItems, setSaleItems] = useState<any[]>([]);

  const [customerModalVisible, setCustomerModalVisible] = useState(false);
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [custType, setCustType] = useState('Retail');
  const [custBusiness, setCustBusiness] = useState('');
  const [custAddress, setCustAddress] = useState('');

  const grandTotal = saleItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <HomeHeader />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Customer Information Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleRow}>
              <Ionicons name="person-outline" size={24} color="#1a1a1a" />
              <Text style={styles.cardTitle}>Customer{'\n'}Information</Text>
            </View>
            <TouchableOpacity style={styles.addCustomerBtn} onPress={() => setCustomerModalVisible(true)}>
              <Ionicons name="add-circle-outline" size={16} color="#fff" />
              <Text style={styles.addCustomerText}>Add New{'\n'}Customer</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Select Customer *</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>{selectedCustomer}</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>

          <View style={styles.infoRow}>
            <Ionicons name="information-circle-outline" size={18} color="#00bcd4" />
            <Text style={styles.infoText}>Using default walking customer</Text>
          </View>
        </View>

        {/* Add Products Card */}
        <View style={styles.card}>
          <View style={styles.cardTitleRowSimple}>
            <Ionicons name="search-outline" size={24} color="#1a1a1a" />
            <Text style={styles.cardTitleSingle}>Add Products</Text>
          </View>

          <TextInput
            style={styles.searchInput}
            placeholder="Search by product name, code, or model."
            placeholderTextColor="#999"
            value={productSearch}
            onChangeText={setProductSearch}
          />
        </View>

        {/* Sale Items Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleRowSimple}>
              <Ionicons name="cart-outline" size={24} color="#1a1a1a" />
              <Text style={styles.cardTitleSingle}>Sale Items</Text>
            </View>
            <View style={styles.itemsBadge}>
              <Text style={styles.itemsBadgeText}>{saleItems.length} items</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {saleItems.length === 0 ? (
            <View style={styles.emptyCart}>
              <Ionicons name="cart-outline" size={48} color="#ccc" />
              <Text style={styles.emptyCartText}>No items added yet</Text>
            </View>
          ) : (
            saleItems.map((item, index) => (
              <View key={index} style={styles.saleItem}>
                <Text>{item.name}</Text>
                <Text>Rs.{(item.price * item.qty).toFixed(2)}</Text>
              </View>
            ))
          )}
        </View>

        {/* Notes Card */}
        <View style={styles.card}>
          <View style={styles.cardTitleRowSimple}>
            <Ionicons name="document-text-outline" size={24} color="#1a1a1a" />
            <Text style={styles.cardTitleSingle}>Notes</Text>
          </View>

          <TextInput
            style={styles.notesInput}
            placeholder="Add any notes for this sale..."
            placeholderTextColor="#999"
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {/* Grand Total Card */}
        <View style={styles.card}>
          <Text style={styles.grandTotalLabel}>Grand Total</Text>
          <Text style={styles.grandTotalValue}>Rs.{grandTotal.toFixed(2)}</Text>

          <TouchableOpacity style={styles.completeSaleBtn}>
            <Ionicons name="cart-outline" size={18} color="#fff" />
            <Text style={styles.completeSaleText}>Complete Sale</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Add Customer Modal */}
      <Modal
        visible={customerModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCustomerModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
          <View style={styles.modalOverlay}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalWrapper}>
              <View style={styles.modalCard}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Add New Customer</Text>
                  <TouchableOpacity onPress={() => setCustomerModalVisible(false)}>
                    <Ionicons name="close" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.modalBody} keyboardShouldPersistTaps="handled">
                  <Text style={styles.formLabel}>Name *</Text>
                  <TextInput style={styles.formInput} placeholder="Enter customer name" value={custName} onChangeText={setCustName} />

                  <Text style={styles.formLabel}>Phone *</Text>
                  <TextInput style={styles.formInput} placeholder="Enter phone number" value={custPhone} onChangeText={setCustPhone} keyboardType="phone-pad" />

                  <Text style={styles.formLabel}>Email</Text>
                  <TextInput style={styles.formInput} placeholder="Enter email address" value={custEmail} onChangeText={setCustEmail} keyboardType="email-address" />

                  <Text style={styles.formLabel}>Customer Type *</Text>
                  <TouchableOpacity style={styles.formInput} onPress={() => {}}>
                    <Text style={{ color: '#111' }}>{custType}</Text>
                  </TouchableOpacity>

                  <Text style={styles.formLabel}>Business Name</Text>
                  <TextInput style={styles.formInput} placeholder="Enter business name" value={custBusiness} onChangeText={setCustBusiness} />

                  <Text style={styles.formLabel}>Address *</Text>
                  <TextInput style={[styles.formInput, { minHeight: 80 }]} placeholder="Enter address" value={custAddress} onChangeText={setCustAddress} multiline />

                </ScrollView>

                <View style={styles.modalFooterContainer}>
                  <TouchableOpacity style={styles.cancelBtn} onPress={() => setCustomerModalVisible(false)}>
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.createBtn} onPress={() => {
                    setCustomerModalVisible(false);
                    setCustName(''); setCustPhone(''); setCustEmail(''); setCustType('Retail'); setCustBusiness(''); setCustAddress('');
                  }}>
                    <Text style={styles.createBtnText}>Create Customer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  cardTitleRowSimple: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    lineHeight: 24,
  },
  cardTitleSingle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  addCustomerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  addCustomerText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 14,
    color: '#1a1a1a',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    color: '#666666',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 14,
    color: '#1a1a1a',
    backgroundColor: '#fff',
  },
  itemsBadge: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  itemsBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: 20,
  },
  emptyCart: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyCartText: {
    marginTop: 12,
    fontSize: 14,
    color: '#999',
  },
  saleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1a1a1a',
    backgroundColor: '#fff',
    minHeight: 80,
  },
  grandTotalLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  grandTotalValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  completeSaleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
    alignSelf: 'center',
    paddingHorizontal: 24,
  },
  completeSaleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalWrapper: {
    width: '100%',
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    maxHeight: '90%'
  },
  modalHeader: {
    backgroundColor: '#111',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#fff' },
  modalBody: { padding: 16, paddingBottom: 24 },
  formLabel: { fontSize: 14, fontWeight: '600', color: '#111', marginTop: 8 },
  formInput: { marginTop: 8, borderWidth: 1, borderColor: '#e6e6e6', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, color: '#111', backgroundColor: '#fff' },
  modalFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, gap: 12 },
  modalFooterContainer: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderTopWidth: 1, borderTopColor: '#eee', backgroundColor: '#fff' },
  cancelBtn: { backgroundColor: '#777', paddingVertical: 10, paddingHorizontal: 18, borderRadius: 8 },
  cancelBtnText: { color: '#fff', fontWeight: '700' },
  createBtn: { backgroundColor: '#111', paddingVertical: 10, paddingHorizontal: 18, borderRadius: 8 },
  createBtnText: { color: '#fff', fontWeight: '700' },
});

