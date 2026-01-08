import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';
import HomeHeader from '@/components/HomeHeader';

// Mock categories data
const mockCategories = [
  { id: 1, name: 'Electrical Parts' },
  { id: 2, name: 'Cooling System' },
  { id: 3, name: 'EGR System' },
  { id: 4, name: 'Wheel System' },
  { id: 5, name: 'Wiring Section' },
  { id: 6, name: 'Gear Parts' },
  { id: 7, name: 'Engine Parts' },
  { id: 8, name: 'Brake system' },
  { id: 9, name: 'Suspension Parts' },
  { id: 10, name: 'Body Parts' },
  { id: 11, name: 'Default Category' },
];

export default function ProductCategoryScreen() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Shared Home Header with Menu */}
      <HomeHeader />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <View style={styles.titleLeft}>
            <View style={styles.titleIcon}>
              <Ionicons name="grid-outline" size={28} color="#000" />
            </View>
            <View>
              <Text style={styles.mainTitle}>Product Category</Text>
              <Text style={styles.mainTitle}>Management</Text>
              <Text style={styles.subtitle}>Manage and organize your product categories efficiently</Text>
            </View>
          </View>
            <TouchableOpacity style={styles.addButton} onPress={() => setAddModalVisible(true)}>
            <Ionicons name="add-outline" size={20} color="#fff" />
            <Text style={styles.addButtonText}>Add{'\n'}Category</Text>
          </TouchableOpacity>
        </View>
        
          {/* Add Category Modal */}
          <Modal visible={addModalVisible} transparent animationType="slide">
            <TouchableWithoutFeedback onPress={() => setAddModalVisible(false)}>
              <View style={styles.modalOverlay} />
            </TouchableWithoutFeedback>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalWrapper}>
              <View style={styles.modalCard}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Add Category</Text>
                  <TouchableOpacity onPress={() => setAddModalVisible(false)}>
                    <Ionicons name="close" size={26} color="#111" />
                  </TouchableOpacity>
                </View>
                <View style={styles.modalDivider} />
                <View style={styles.modalBody}>
                  <Text style={styles.formLabel}>Category Name</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Enter category name"
                    placeholderTextColor="#999"
                    value={categoryName}
                    onChangeText={setCategoryName}
                  />
                </View>
                <View style={styles.modalFooter}>
                  <TouchableOpacity style={styles.closeBtn} onPress={() => setAddModalVisible(false)}>
                    <Text style={styles.closeBtnText}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.saveBtn} onPress={() => { setAddModalVisible(false); setCategoryName(''); }}>
                    <Text style={styles.saveBtnText}>Save Category</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </Modal>

        {/* Category List Card */}
        <View style={styles.listCard}>
          <View style={styles.listHeader}>
            <Ionicons name="list-outline" size={24} color="#000" />
            <View style={styles.listTitleContainer}>
              <Text style={styles.listTitle}>Category List</Text>
              <Text style={styles.listSubtitle}>View and manage all product categories</Text>
            </View>
          </View>

          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.colNo]}>NO</Text>
            <Text style={[styles.tableHeaderText, styles.colName]}>CATEGORY NAME</Text>
            <Text style={[styles.tableHeaderText, styles.colActions]}>ACTIONS</Text>
          </View>

          {/* Table Rows */}
          {mockCategories.map((category, index) => (
            <View key={category.id} style={[styles.tableRow, index % 2 === 1 && styles.tableRowAlt]}>
              <Text style={[styles.tableCell, styles.colNo]}>{category.id}</Text>
              <Text style={[styles.tableCell, styles.colName]}>{category.name}</Text>
              <View style={[styles.actionsCell, styles.colActions]}>
                <TouchableOpacity style={styles.editButton}>
                  <Ionicons name="pencil-outline" size={16} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton}>
                  <Ionicons name="trash-outline" size={16} color="#666" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 20,
    marginBottom: 20,
  },
  titleLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  titleIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    lineHeight: 30,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  addButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 4,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
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
    marginBottom: 16,
  },
  listTitleContainer: {
    marginLeft: 12,
    flex: 1,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  listSubtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  tableHeaderText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 14,
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
  colNo: {
    width: 40,
  },
  colName: {
    flex: 1,
  },
  colActions: {
    width: 100,
    justifyContent: 'flex-end',
  },
  actionsCell: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  editButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 6,
    padding: 8,
  },
  deleteButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 6,
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalWrapper: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: 60,
    bottom: 24,
    justifyContent: 'center',
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111'
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#eee'
  },
  modalBody: {
    padding: 16,
    backgroundColor: '#fff'
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
    marginBottom: 8
  },
  formInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: '#111'
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  closeBtn: {
    backgroundColor: '#6b6b6b',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8
  },
  closeBtnText: {
    color: '#fff',
    fontWeight: '600'
  },
  saveBtn: {
    backgroundColor: '#000',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: '600'
  }
});
