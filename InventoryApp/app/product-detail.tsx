import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProductDetailScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams();

  // Parse product data from params
  const product = {
    id: params.id as string,
    name: params.name as string,
    code: params.code as string,
    brand: params.brand as string,
    model: params.model as string,
    category: params.category as string,
    stock: parseInt(params.stock as string) || 0,
    supplierPrice: parseFloat(params.supplierPrice as string) || 0,
    sellingPrice: parseFloat(params.sellingPrice as string) || 0,
    discountPrice: parseFloat(params.discountPrice as string) || 0,
    damagedStock: parseInt(params.damagedStock as string) || 0,
    status: params.status as string,
  };

  const formatPrice = (price: number) => {
    return `Rs.${price.toFixed(2)}`;
  };

  const handleClose = () => {
    router.back();
  };

  useEffect(() => {
    // hide expo-router's default header for this route
    navigation.setOptions?.({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="cube-outline" size={24} color="#fff" />
          <Text style={styles.headerTitle}>Product Details</Text>
        </View>
        <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Image Card */}
        <View style={styles.productImageCard}>
          <View style={styles.statusBadge}>
            <Ionicons name="checkmark-circle" size={14} color="#fff" />
            <Text style={styles.statusBadgeText}>{product.status}</Text>
          </View>
          <View style={styles.imagePlaceholder}>
            <MaterialCommunityIcons name="cube-outline" size={60} color="#1a1a1a" />
            <MaterialCommunityIcons name="cube-outline" size={60} color="#1a1a1a" style={styles.cubeOverlap1} />
            <MaterialCommunityIcons name="cube-outline" size={60} color="#1a1a1a" style={styles.cubeOverlap2} />
          </View>
        </View>

        {/* Product Name & Code */}
        <Text style={styles.productName}>{product.name}</Text>
        <View style={styles.codeRow}>
          <Ionicons name="barcode-outline" size={18} color="#666" />
          <Text style={styles.productCode}>{product.code}</Text>
        </View>

        {/* Quick Info Cards */}
        <View style={styles.quickInfoRow}>
          <View style={styles.quickInfoCard}>
            <MaterialCommunityIcons name="cube-outline" size={28} color="#1a1a1a" />
            <Text style={styles.quickInfoValue}>{product.stock}</Text>
            <Text style={styles.quickInfoLabel}>In Stock</Text>
          </View>
          <View style={styles.quickInfoCard}>
            <Ionicons name="logo-usd" size={28} color="#1a1a1a" />
            <Text style={styles.quickInfoValue}>{formatPrice(product.sellingPrice)}</Text>
            <Text style={styles.quickInfoLabel}>Selling Price</Text>
          </View>
        </View>

        {/* Availability Banner */}
        <View style={[styles.availabilityBanner, product.stock > 0 ? styles.availableBanner : styles.unavailableBanner]}>
          <Ionicons 
            name={product.stock > 0 ? "checkmark-circle" : "close-circle"} 
            size={20} 
            color={product.stock > 0 ? "#1a1a1a" : "#666"} 
          />
          <Text style={[styles.availabilityText, product.stock > 0 ? styles.availableText : styles.unavailableText]}>
            {product.stock > 0 ? 'Available' : 'Out of Stock'}
            <Text style={styles.availabilitySubtext}> - {product.stock > 0 ? 'Ready to sell' : 'Not available'}</Text>
          </Text>
        </View>

        {/* Basic Information Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, styles.basicInfoIcon]}>
              <Ionicons name="information-circle" size={22} color="#fff" />
            </View>
            <Text style={styles.sectionTitle}>Basic Information</Text>
          </View>
          <View style={styles.sectionUnderline} />

          <View style={styles.infoField}>
            <Text style={styles.fieldLabel}>Product Name</Text>
            <Text style={styles.fieldValue}>{product.name}</Text>
          </View>

          <View style={styles.infoField}>
            <Text style={styles.fieldLabel}>Product Code</Text>
            <Text style={styles.fieldValue}>{product.code}</Text>
          </View>

          <View style={styles.infoField}>
            <Text style={styles.fieldLabel}>Model</Text>
            <Text style={styles.fieldValue}>{product.model || '-'}</Text>
          </View>

          <View style={styles.infoField}>
            <Text style={styles.fieldLabel}>Brand</Text>
            <Text style={styles.fieldValue}>{product.brand}</Text>
          </View>

          <View style={styles.infoField}>
            <Text style={styles.fieldLabel}>Category</Text>
            <Text style={styles.fieldValue}>{product.category}</Text>
          </View>
        </View>

        {/* Pricing Information Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, styles.pricingIcon]}>
              <Ionicons name="logo-usd" size={22} color="#1a1a1a" />
            </View>
            <Text style={styles.sectionTitle}>Pricing Information</Text>
          </View>
          <View style={styles.sectionUnderline} />

          <View style={styles.priceField}>
            <Text style={styles.priceLabelCenter}>Supplier Price</Text>
            <Text style={styles.priceValueCenter}>{formatPrice(product.supplierPrice)}</Text>
          </View>

          <View style={[styles.priceField, styles.sellingPriceField]}>
            <Text style={styles.sellingPriceLabel}>Selling Price</Text>
            <Text style={styles.sellingPriceValue}>{formatPrice(product.sellingPrice)}</Text>
          </View>

          <View style={styles.priceField}>
            <Text style={styles.priceLabelCenter}>Discount Price</Text>
            <Text style={styles.discountPriceValue}>{formatPrice(product.discountPrice)}</Text>
          </View>
        </View>

        {/* Stock Information Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, styles.stockIcon]}>
              <MaterialCommunityIcons name="package-variant" size={22} color="#1a1a1a" />
            </View>
            <Text style={styles.sectionTitle}>Stock Information</Text>
          </View>
          <View style={styles.sectionUnderline} />

          <View style={styles.stockCard}>
            <MaterialCommunityIcons name="cube-outline" size={36} color="#1a1a1a" />
            <Text style={styles.stockValue}>{product.stock}</Text>
            <Text style={styles.stockLabel}>Available Stock</Text>
          </View>

          <View style={styles.stockCard}>
            <Ionicons name="warning-outline" size={36} color="#999" />
            <Text style={styles.stockValue}>{product.damagedStock}</Text>
            <Text style={styles.stockLabel}>Damaged Stock</Text>
          </View>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* Floating Close Button */}
      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity style={styles.floatingCloseButton} onPress={handleClose}>
          <Ionicons name="close-circle" size={18} color="#fff" />
          <Text style={styles.floatingCloseText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 48,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  closeBtn: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  productImageCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  statusBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  imagePlaceholder: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cubeOverlap1: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  cubeOverlap2: {
    position: 'absolute',
    top: 20,
    right: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 6,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 20,
  },
  productCode: {
    fontSize: 15,
    color: '#666',
  },
  quickInfoRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  quickInfoCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  quickInfoValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: 10,
  },
  quickInfoLabel: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  availabilityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 24,
    gap: 8,
  },
  availableBanner: {
    backgroundColor: '#e8e8e8',
  },
  unavailableBanner: {
    backgroundColor: '#f0f0f0',
  },
  availabilityText: {
    fontSize: 16,
    fontWeight: '700',
  },
  availableText: {
    color: '#1a1a1a',
  },
  unavailableText: {
    color: '#666',
  },
  availabilitySubtext: {
    fontWeight: '400',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  sectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  basicInfoIcon: {
    backgroundColor: '#1a1a1a',
  },
  pricingIcon: {
    backgroundColor: '#e0e0e0',
  },
  stockIcon: {
    backgroundColor: '#d4d4d4',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  sectionUnderline: {
    height: 3,
    width: 80,
    backgroundColor: '#1a1a1a',
    borderRadius: 2,
    marginBottom: 16,
  },
  infoField: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  priceField: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
  },
  priceLabelCenter: {
    fontSize: 14,
    color: '#888',
    marginBottom: 6,
  },
  priceValueCenter: {
    fontSize: 24,
    fontWeight: '700',
    color: '#666',
  },
  sellingPriceField: {
    backgroundColor: '#e8e8e8',
    borderWidth: 2,
    borderColor: '#1a1a1a',
  },
  sellingPriceLabel: {
    fontSize: 14,
    color: '#1a1a1a',
    marginBottom: 6,
  },
  sellingPriceValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  discountPriceValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#999',
    textDecorationLine: 'line-through',
  },
  stockCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 24,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e6e6e6',
  },
  stockValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: 10,
  },
  stockLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  bottomSpace: {
    height: 80,
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 24,
    right: 16,
  },
  floatingCloseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  floatingCloseText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
});
