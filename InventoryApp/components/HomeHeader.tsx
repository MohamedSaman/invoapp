import React, { useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Sidebar menu items
const menuItems = [
  { id: 'overview', label: 'Overview', icon: 'speedometer', iconType: 'material-community', hasDropdown: false, isActive: true, route: '/' },
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

// Menu Item Component
const MenuItemComponent = ({ item, isExpanded, onToggle, onPress }: { 
  item: typeof menuItems[0]; 
  isExpanded?: boolean; 
  onToggle?: () => void;
  onPress: () => void;
}) => {
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

export default function HomeHeader() {
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

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

  const navigateToItem = (item: typeof menuItems[0]) => {
    if (item.route) {
      closeSidebar();
      router.push(item.route as any);
    }
  };

  return (
    <>
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
                    onPress={() => navigateToItem(item)}
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
    </>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuButton: {
    backgroundColor: '#1a1a1a',
    padding: 10,
    borderRadius: 8,
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
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: screenWidth * 0.75,
    backgroundColor: '#000',
    paddingTop: 0,
  },
  sidebarHeader: {
    paddingHorizontal: 20,
    paddingVertical: 28,
    paddingTop: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
    alignItems: 'center',
  },
  sidebarBrandText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  sidebarMenu: {
    flex: 1,
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  menuItemActive: {
    backgroundColor: '#1a1a1a',
  },
  menuItemExpanded: {
    backgroundColor: '#0a0a0a',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '500',
  },
  subMenuContainer: {
    backgroundColor: '#0a0a0a',
    paddingLeft: 20,
  },
  subMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  subMenuText: {
    fontSize: 14,
    color: '#ccc',
  },
  sidebarBottomPadding: {
    height: 40,
  },
});
