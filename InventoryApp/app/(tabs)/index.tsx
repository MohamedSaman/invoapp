import { Ionicons, MaterialCommunityIcons, FontAwesome5, Feather, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

// Mock data - replace with actual data from API
const inventoryData = {
  totalUnits: 5198,
  soldUnits: 837,
  availableUnits: 4185,
  damagedUnits: 12,
  salesValue: 2496245.70,
  inventoryValue: 8169775.00,
  damageValue: 48710.50,
};

const categoryData = [
  { name: 'Default Category', value: 2564900 },
  { name: 'Brake System', value: 85000 },
  { name: 'Engine Parts', value: 120000 },
  { name: 'Gear Parts', value: 95000 },
  { name: 'Suspension Parts', value: 78000 },
  { name: 'Modifications', value: 65000 },
  { name: 'Cooling System', value: 55000 },
  { name: 'Body Parts', value: 45000 },
];

// Inventory status items
const inventoryStatus = [
  { name: 'Ignition Switch M. DI Tractor', sku: 'USN0007', status: 'Out of Stock', count: '0/0', progress: 0 },
  { name: 'Ignition Switch Ford Tractor', sku: 'USN0009', status: 'Out of Stock', count: '0/0', progress: 0 },
  { name: 'Steering Lock Assy. Tata 407', sku: 'USN0014', status: 'Out of Stock', count: '0/0', progress: 0 },
];

// Sidebar menu items
const menuItems = [
  { id: 'overview', label: 'Overview', icon: 'speedometer', iconType: 'material-community', hasDropdown: false, isActive: true },
  { id: 'products', label: 'Products', icon: 'cube-outline', iconType: 'material-community', hasDropdown: true, subItems: [
    { id: 'list-product', label: 'List Product', icon: 'reader-outline', route: '/list-product' },
    { id: 'product-brand', label: 'Product Brand', icon: 'pricetag-outline', route: '/product-brand' },
    { id: 'product-category', label: 'Product Category', icon: 'pricetag', route: '/product-category' },
  ]},
  { id: 'sales', label: 'Sales', icon: 'cash-register', iconType: 'font-awesome-5', hasDropdown: true, subItems: [
    { id: 'add-sales', label: 'Add Sales', icon: 'add-circle-outline', route: '/add-sales' },
    { id: 'list-sales', label: 'List Sales', icon: 'grid-outline', route: '/list-sales' },
    { id: 'pos-sales', label: 'POS Sales', icon: 'storefront-outline', route: '/pos-sales' },
  ]},
  { id: 'quotation', label: 'Quotation', icon: 'file-document-outline', iconType: 'material-community', hasDropdown: true, subItems: [
    { id: 'add-quotation', label: 'Add Quotation', icon: 'add-circle-outline', route: '/add-quotation' },
    { id: 'list-quotation', label: 'List Quotation', icon: 'grid-outline', route: '/list-quotation' },
  ]},
  { id: 'purchase', label: 'Purchase', icon: 'truck-delivery-outline', iconType: 'material-community', hasDropdown: true, subItems: [
    { id: 'purchase-order', label: 'Purchase Order', icon: 'clipboard-outline', route: '/purchase-order' },
    { id: 'grn', label: 'GRN', icon: 'cube-outline', route: '/grn' },
  ]},
  { id: 'return', label: 'Return', icon: 'refresh', iconType: 'ionicons', hasDropdown: true, subItems: [
    { id: 'add-customer-return', label: 'Add Customer Return', icon: 'arrow-back-outline', route: '/add-customer-return' },
    { id: 'list-customer-return', label: 'List Customer Return', icon: 'list-outline', route: '/list-customer-return' },
    { id: 'add-supplier-return', label: 'Add Supplier Return', icon: 'arrow-back-outline', route: '/add-supplier-return' },
    { id: 'list-supplier-return', label: 'List Supplier Return', icon: 'list-outline', route: '/list-supplier-return' },
  ]},
  { id: 'cheque', label: 'Cheque / Banks', icon: 'bank', iconType: 'material-community', hasDropdown: true, subItems: [
    { id: 'deposit-cash', label: 'Deposit By Cash', icon: 'cash-outline', route: '/deposit-by-cash' },
    { id: 'cheque-list', label: 'Cheque List', icon: 'list-outline', route: '/cheque-list' },
    { id: 'return-cheque', label: 'Return Cheque', icon: 'swap-horizontal-outline', route: '/return-cheque' },
  ]},
  { id: 'expenses', label: 'Expenses', icon: 'folder-open-outline', iconType: 'ionicons', hasDropdown: true, subItems: [
    { id: 'list-expenses', label: 'List Expenses', icon: 'list-outline', route: '/list-expenses' },
  ]},
  { id: 'payment', label: 'Payment Management', icon: 'view-grid-outline', iconType: 'material-community', hasDropdown: true, subItems: [
    { id: 'add-customer-receipt', label: 'Add Customer Receipt', icon: 'person-add-outline', route: '/add-customer-receipt' },
    { id: 'list-customer-receipt', label: 'List Customer Receipt', icon: 'list-outline', route: '/list-customer-receipt' },
    { id: 'add-supplier-payment', label: 'Add Supplier Payment', icon: 'card-outline', route: '/add-supplier-payment' },
    { id: 'list-supplier-payment', label: 'List Supplier Payment', icon: 'list-outline', route: '/list-supplier-payment' },
  ]},
  { id: 'people', label: 'People', icon: 'people', iconType: 'ionicons', hasDropdown: true, subItems: [
    { id: 'list-suppliers', label: 'List Suppliers', icon: 'briefcase-outline', route: '/list-suppliers' },
    { id: 'list-customer', label: 'List Customer', icon: 'person-outline', route: '/list-customer' },
    { id: 'list-staff', label: 'List Staff', icon: 'people-outline', route: '/list-staff' },
  ]},
  { id: 'day-summary', label: 'Day Summary', icon: 'file-chart-outline', iconType: 'material-community', hasDropdown: false },
  { id: 'reports', label: 'Reports', icon: 'file-chart-outline', iconType: 'material-community', hasDropdown: false },
  { id: 'analytics', label: 'Analytics', icon: 'chart-bar', iconType: 'material-community', hasDropdown: false },
  { id: 'profit-loss', label: 'Profit & Loss', icon: 'trending-up', iconType: 'ionicons', hasDropdown: false },
  { id: 'settings', label: 'Settings', icon: 'settings-outline', iconType: 'ionicons', hasDropdown: false },
];

const formatCurrency = (value: number) => {
  return `Rs.${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const screenWidth = Dimensions.get('window').width;

// Sidebar Menu Item Component
const MenuItemComponent = ({ item, onPress, isExpanded, onToggle }: { item: typeof menuItems[0]; onPress: () => void; isExpanded?: boolean; onToggle?: () => void }) => {
  const renderIcon = () => {
    const iconColor = '#fff';
    const iconSize = 22;
    
    switch (item.iconType) {
      case 'material-community':
        return <MaterialCommunityIcons name={item.icon as any} size={iconSize} color={iconColor} />;
      case 'font-awesome-5':
        return <FontAwesome5 name={item.icon as any} size={iconSize - 2} color={iconColor} />;
      case 'ionicons':
        return <Ionicons name={item.icon as any} size={iconSize} color={iconColor} />;
      default:
        return <Ionicons name="ellipse" size={iconSize} color={iconColor} />;
    }
  };

  const handlePress = () => {
    if (item.hasDropdown && onToggle) {
      onToggle();
    } else {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.menuItem, item.isActive && styles.menuItemActive, isExpanded && styles.menuItemExpanded]}
      onPress={handlePress}
    >
      <View style={styles.menuItemLeft}>
        {renderIcon()}
        <Text style={styles.menuItemText}>{item.label}</Text>
      </View>
      {item.hasDropdown && (
        <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={18} color="#888" />
      )}
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  
  const soldPercentage = ((inventoryData.soldUnits / inventoryData.totalUnits) * 100).toFixed(1);
  const availablePercentage = ((inventoryData.availableUnits / inventoryData.totalUnits) * 100).toFixed(1);
  const damagePercentage = ((inventoryData.damagedUnits / inventoryData.totalUnits) * 100).toFixed(1);

  const maxCategoryValue = Math.max(...categoryData.map(c => c.value));

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  const toggleMenuExpand = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const navigateToSubItem = (route: string) => {
    closeSidebar();
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Sidebar Modal */}
      <Modal
        visible={sidebarVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeSidebar}
      >
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={closeSidebar}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          
          <Animated.View style={styles.sidebar}>
            {/* Sidebar Header */}
            <View style={styles.sidebarHeader}>
              <Text style={styles.sidebarBrandText}>webxkey</Text>
            </View>

            {/* Menu Items */}
            <ScrollView style={styles.sidebarMenu} showsVerticalScrollIndicator={false}>
              {menuItems.map((item) => (
                <View key={item.id}>
                  <MenuItemComponent
                    item={item}
                    isExpanded={expandedMenus.includes(item.id)}
                    onToggle={() => toggleMenuExpand(item.id)}
                    onPress={() => {
                      closeSidebar();
                      // Handle navigation here
                    }}
                  />
                  {/* Sub-menu items */}
                  {item.hasDropdown && item.subItems && expandedMenus.includes(item.id) && (
                    <View style={styles.subMenuContainer}>
                      {item.subItems.map((subItem) => (
                        <TouchableOpacity
                          key={subItem.id}
                          style={styles.subMenuItem}
                          onPress={() => navigateToSubItem(subItem.route)}
                        >
                          <Ionicons name={subItem.icon as any} size={18} color="#ccc" />
                          <Text style={styles.subMenuText}>{subItem.label}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              ))}
              <View style={styles.sidebarBottomPadding} />
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
            <Ionicons name="menu" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
          <Text style={styles.adminText}>Admin</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Overview Section */}
        <View style={styles.overviewSection}>
          <View style={styles.overviewHeader}>
            <MaterialCommunityIcons name="speedometer" size={28} color="#1a1a1a" />
            <Text style={styles.overviewTitle}>Overview</Text>
          </View>
          <Text style={styles.overviewDescription}>
            Get a complete view of your product performance and stock activity.
          </Text>
        </View>

        {/* Total Sold Stocks Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Sold Stocks</Text>
          <View style={styles.unitsRow}>
            <Text style={styles.unitsValue}>{inventoryData.soldUnits.toLocaleString()}</Text>
            <Text style={styles.unitsLabel}> units</Text>
          </View>
          <View style={styles.percentageRow}>
            <Text style={styles.percentageLabel}>Sold Percentage</Text>
            <Text style={styles.percentageValue}>{soldPercentage}% of total</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, styles.progressBarGreen, { width: `${soldPercentage}%` }]} />
            <View style={[styles.progressBarBackground, { width: `${100 - parseFloat(soldPercentage)}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {inventoryData.soldUnits.toLocaleString()} of {inventoryData.totalUnits.toLocaleString()} units
          </Text>
          <View style={styles.divider} />
          <View style={styles.valueRow}>
            <View style={styles.valueIconContainer}>
              <MaterialCommunityIcons name="checkbox-marked" size={18} color="#1a1a1a" />
              <Text style={styles.valueLabel}>Sales Value</Text>
            </View>
            <View style={styles.valueBadgeGreen}>
              <Text style={styles.valueBadgeTextGreen}>{formatCurrency(inventoryData.salesValue)}</Text>
            </View>
          </View>
        </View>

        {/* Total Available Stocks Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Available Stocks</Text>
          <View style={styles.unitsRow}>
            <Text style={styles.unitsValue}>{inventoryData.availableUnits.toLocaleString()}</Text>
            <Text style={styles.unitsLabel}> units</Text>
          </View>
          <View style={styles.percentageRow}>
            <Text style={styles.percentageLabel}>Available Percentage</Text>
            <Text style={styles.percentageValue}>{availablePercentage}% of total</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, styles.progressBarBlue, { width: `${availablePercentage}%` }]} />
            <View style={[styles.progressBarBackground, { width: `${100 - parseFloat(availablePercentage)}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {inventoryData.availableUnits.toLocaleString()} of {inventoryData.totalUnits.toLocaleString()} units
          </Text>
          <View style={styles.divider} />
          <View style={styles.valueRow}>
            <View style={styles.valueIconContainer}>
              <MaterialCommunityIcons name="cube-outline" size={18} color="#1a1a1a" />
              <Text style={styles.valueLabel}>Inventory Value</Text>
            </View>
            <View style={styles.valueBadgeGreen}>
              <Text style={styles.valueBadgeTextGreen}>{formatCurrency(inventoryData.inventoryValue)}</Text>
            </View>
          </View>
        </View>

        {/* Damage Stocks Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitleDamage}>Damage Stocks</Text>
          <View style={styles.unitsRow}>
            <Text style={styles.unitsValue}>{inventoryData.damagedUnits}</Text>
            <Text style={styles.unitsLabel}> units</Text>
          </View>
          <View style={styles.percentageRow}>
            <Text style={styles.percentageLabelDamage}>Damage Percentage</Text>
            <Text style={styles.percentageValueDamage}>{damagePercentage}% of total</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, styles.progressBarRed, { width: `${parseFloat(damagePercentage) * 10}%` }]} />
            <View style={[styles.progressBarBackground, { width: `${100 - parseFloat(damagePercentage) * 10}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {inventoryData.damagedUnits} of {inventoryData.totalUnits.toLocaleString()} units
          </Text>
          <View style={styles.divider} />
          <View style={styles.valueRow}>
            <View style={styles.valueIconContainer}>
              <MaterialCommunityIcons name="alert" size={18} color="#666666" />
              <Text style={styles.valueLabel}>Damage Value</Text>
            </View>
            <View style={styles.valueBadgeRed}>
              <Text style={styles.valueBadgeTextRed}>{formatCurrency(inventoryData.damageValue)}</Text>
            </View>
          </View>
        </View>

        {/* Sales Overview By Categories */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sales Overview By Categories</Text>
          <Text style={styles.chartDescription}>Compare sales performance by Product Categories</Text>
          <View style={styles.divider} />
          
          {/* Bar Chart */}
          <View style={styles.chartContainer}>
            <View style={styles.yAxisLabels}>
              <Text style={styles.yAxisLabel}>3,000,000</Text>
              <Text style={styles.yAxisLabel}>2,500,000</Text>
              <Text style={styles.yAxisLabel}>2,000,000</Text>
              <Text style={styles.yAxisLabel}>1,500,000</Text>
              <Text style={styles.yAxisLabel}>1,000,000</Text>
              <Text style={styles.yAxisLabel}>500,000</Text>
              <Text style={styles.yAxisLabel}>0</Text>
            </View>
            <View style={styles.chartArea}>
              <View style={styles.gridLines}>
                {[...Array(7)].map((_, i) => (
                  <View key={i} style={styles.gridLine} />
                ))}
              </View>
              {/* explicit x-axis at zero baseline */}
              <View style={styles.xAxis} />
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.barsContainer}>
                  {categoryData.map((category, index) => (
                    <View key={index} style={styles.barColumn}>
                      <View style={styles.barArea}>
                        <View
                          style={[
                            styles.bar,
                            {
                              height: (category.value / maxCategoryValue) * 220,
                            },
                          ]}
                        />
                      </View>
                      <View style={styles.labelArea}>
                        <Text style={styles.barLabel} numberOfLines={2}>
                          {category.name}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
        </View>

        {/* Inventory Status Card */}
        <View style={styles.card}>
          <View style={styles.inventoryHeader}>
            <View>
              <Text style={styles.cardTitle}>Inventory Status</Text>
              <Text style={styles.overviewDescription}>Current stock levels and alerts</Text>
            </View>
            <View style={styles.inventoryIcon}>
              <MaterialCommunityIcons name="cube-outline" size={22} color="#1a1a1a" />
            </View>
          </View>

          {inventoryStatus.map((item, idx) => (
            <View key={idx} style={styles.inventoryItem}>
              <Text style={styles.inventoryName}>{item.name}</Text>
              <Text style={styles.inventorySku}>SKU: {item.sku}</Text>

              <View style={styles.stockRow}>
                <View style={styles.stockBadge}>
                  <Text style={styles.stockBadgeText}>{item.status}</Text>
                </View>
                <Text style={styles.stockCount}>{item.count}</Text>
              </View>

              <View style={styles.inventoryProgressBg}>
                <View style={[styles.inventoryProgressBar, { width: `${item.progress}%` }]} />
              </View>
            </View>
          ))}
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
  header: {
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuButton: {
    backgroundColor: '#1a1a1a',
    padding: 10,
    borderRadius: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
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
    backgroundColor: '#FFFFFF',
  },
  overviewSection: {
    marginTop: 20,
    marginBottom: 16,
  },
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  overviewTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  overviewDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  cardTitleDamage: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 12,
  },
  unitsRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  unitsValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  unitsLabel: {
    fontSize: 18,
    color: '#666666',
    fontWeight: '500',
  },
  percentageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  percentageLabel: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  percentageLabelDamage: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  percentageValue: {
    fontSize: 14,
    color: '#666666',
  },
  percentageValueDamage: {
    fontSize: 14,
    color: '#666666',
  },
  progressBarContainer: {
    flexDirection: 'row',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: '#E5E5E5',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  progressBarGreen: {
    backgroundColor: '#1a1a1a',
  },
  progressBarBlue: {
    backgroundColor: '#1a1a1a',
  },
  progressBarRed: {
    backgroundColor: '#666666',
  },
  progressBarBackground: {
    height: '100%',
    backgroundColor: '#E5E5E5',
  },
  progressText: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 12,
  },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  valueIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  valueLabel: {
    fontSize: 14,
    color: '#666666',
  },
  valueBadgeGreen: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  valueBadgeTextGreen: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  valueBadgeRed: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#666666',
  },
  valueBadgeTextRed: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  chartDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 360,
    marginTop: 8,
  },
  yAxisLabels: {
    width: 70,
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 80,
    paddingRight: 8,
  },
  yAxisLabel: {
    fontSize: 10,
    color: '#888888',
    textAlign: 'right',
  },
  chartArea: {
    flex: 1,
    position: 'relative',
  },
  gridLines: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    bottom: 80,
    justifyContent: 'space-between',
  },
  gridLine: {
    height: 1,
    backgroundColor: '#E5E5E5',
    width: '100%',
  },
  xAxis: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#D9D9D9',
    bottom: 80,
  },
  barsContainer: {
    flexDirection: 'row',
    height: 300,
    paddingTop: 10,
    gap: 10,
    paddingHorizontal: 4,
  },
  barColumn: {
    width: 75,
    alignItems: 'center',
  },
  barArea: {
    height: 220,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: 26,
    backgroundColor: '#1a1a1a',
    borderRadius: 2,
    minHeight: 4,
  },
  labelArea: {
    height: 90,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 8,
    marginLeft: -12,
  },
  barLabel: {
    fontSize: 11,
    color: '#666666',
    width: 90,
    transform: [{ rotate: '-45deg' }],
  },
  // Inventory Status styles
  inventoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  inventoryIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  inventoryItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  inventoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  inventorySku: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 8,
  },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  stockBadge: {
    backgroundColor: '#fce4e4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  stockBadgeText: {
    color: '#c0392b',
    fontWeight: '600',
    fontSize: 12,
  },
  stockCount: {
    color: '#888888',
    fontSize: 14,
  },
  inventoryProgressBg: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F0F0F0',
    overflow: 'hidden',
  },
  inventoryProgressBar: {
    height: '100%',
    backgroundColor: '#1a1a1a',
    borderRadius: 3,
  },
  // Sidebar styles
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    width: screenWidth * 0.75,
    backgroundColor: '#1a1a1a',
    height: '100%',
    paddingTop: 0,
  },
  sidebarHeader: {
    backgroundColor: '#2a2a2a',
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sidebarBrandText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  sidebarMenu: {
    flex: 1,
    paddingTop: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333333',
  },
  menuItemActive: {
    backgroundColor: '#333333',
  },
  menuItemExpanded: {
    backgroundColor: '#2a2a2a',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuItemText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  subMenuContainer: {
    backgroundColor: '#2a2a2a',
    paddingLeft: 0,
  },
  subMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    paddingLeft: 52,
    gap: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333333',
  },
  subMenuText: {
    fontSize: 14,
    color: '#cccccc',
    fontWeight: '400',
  },
  sidebarBottomPadding: {
    height: 40,
  },
});
