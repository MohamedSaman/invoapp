import { Ionicons } from '@expo/vector-icons';
import { useRouter, useNavigation } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import HomeHeader from '@/components/HomeHeader';

export default function AddSupplierPaymentScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions?.({ headerShown: false });
  }, [navigation]);

  const [formData, setFormData] = useState({
    poNumber: '',
    supplierName: '',
    amount: '',
    paymentMethod: '',
    paymentDate: '',
    notes: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Supplier Payment submitted:', formData);
    setFormData({
      poNumber: '',
      supplierName: '',
      amount: '',
      paymentMethod: '',
      paymentDate: '',
      notes: '',
    });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Shared Home Header with Menu */}
      <HomeHeader />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Ionicons name="card-outline" size={28} color="#000" />
          <View style={styles.headerText}>
            <Text style={styles.title}>Add Supplier Payment</Text>
            <Text style={styles.subtitle}>Record supplier payment</Text>
          </View>
        </View>

        <View style={styles.formCard}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Purchase Order Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter PO number"
              placeholderTextColor="#999"
              value={formData.poNumber}
              onChangeText={(value) => handleInputChange('poNumber', value)}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Supplier Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter supplier name"
              placeholderTextColor="#999"
              value={formData.supplierName}
              onChangeText={(value) => handleInputChange('supplierName', value)}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Amount Paid (Rs.)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
              value={formData.amount}
              onChangeText={(value) => handleInputChange('amount', value)}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Payment Method</Text>
            <TextInput
              style={styles.input}
              placeholder="Cash, Cheque, Online, NEFT, etc."
              placeholderTextColor="#999"
              value={formData.paymentMethod}
              onChangeText={(value) => handleInputChange('paymentMethod', value)}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Payment Date</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#999"
              value={formData.paymentDate}
              onChangeText={(value) => handleInputChange('paymentDate', value)}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter additional notes"
              placeholderTextColor="#999"
              multiline={true}
              numberOfLines={4}
              value={formData.notes}
              onChangeText={(value) => handleInputChange('notes', value)}
            />
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Ionicons name="checkmark-circle" size={20} color="#fff" />
              <Text style={styles.submitBtnText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
              <Ionicons name="close-circle" size={20} color="#1a1a1a" />
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: 24,
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
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 6,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fff',
  },
  textArea: {
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  submitBtn: {
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  cancelBtnText: {
    color: '#1a1a1a',
    fontSize: 14,
    fontWeight: '600',
  },
});
