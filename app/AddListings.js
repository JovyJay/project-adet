import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Modal, Pressable, Image } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const CATEGORIES = [
  ['Vegetable', 'Meat'],
  ['Fruit', 'Fish'],
  ['Poultry', 'Hair'],
  ['Grocery', 'Pasalubong'],
];

export default function AddListings() {
  const [filterVisible, setFilterVisible] = useState(false);
  const [importVisible, setImportVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  const handleBack = () => {
    router.back();
  };

  // Only close modal if user clicks outside the import box
  const handleOverlayPress = (event) => {
    if (event.target === event.currentTarget) {
      setImportVisible(false);
    }
  };

  // Show success banner
  const handleAddListing = () => {
    setSuccessVisible(true);
  };

  // Go back to ManageBusiness screen
  const handleGoManageBusiness = () => {
    router.replace('/ManageBusiness');
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Feather name="arrow-left" size={22} color="#222" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add your listings</Text>
        </View>
        <Text style={styles.subtitle}>
          Search for products or services that you want to add to your listings. You can filter by category as well.
        </Text>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search listing"
            placeholderTextColor="#666"
          />
          <Feather name="search" size={18} color="#666" />
          <TouchableOpacity style={styles.filterButton} onPress={() => setFilterVisible(true)}>
            <Feather name="filter" size={18} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Filter Modal */}
        <Modal
          visible={filterVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setFilterVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.filterModal}>
              <View style={styles.filterHeader}>
                <Feather name="filter" size={18} color="#222" />
                <Text style={styles.filterTitle}>Filter by category</Text>
              </View>
              <View style={styles.categoryGrid}>
                {CATEGORIES.map((row, i) => (
                  <View style={styles.categoryRow} key={i}>
                    {row.map((cat, j) => (
                      <Text style={styles.categoryItem} key={j}>{cat}</Text>
                    ))}
                  </View>
                ))}
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={() => setFilterVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Import Listings */}
        <View style={styles.importRow}>
          <Text style={styles.importText}>Import listings</Text>
          <TouchableOpacity onPress={() => setImportVisible(true)}>
            <MaterialCommunityIcons name="import" size={18} color="#222" style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </View>

        {/* Import Modal */}
        <Modal
          visible={importVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setImportVisible(false)}
        >
          <Pressable style={styles.modalOverlay} onPress={handleOverlayPress}>
            <View style={styles.importModal}>
              <View style={styles.importBox}>
                <Text style={styles.importDragText}>
                  Drag and drop your <Text style={{ fontWeight: 'bold' }}>.txt</Text> file here
                </Text>
                <Text style={styles.importOrText}>or</Text>
                <View style={styles.chooseFileButton}>
                  <Text style={styles.chooseFileButtonText}>Choose File</Text>
                </View>
              </View>
            </View>
          </Pressable>
        </Modal>

        {/* Listings Grid */}
        <View style={styles.listingsRow}>
          {/* Listing Card 1 */}
          <View style={styles.listingCard}>
            <Image
              source={require('../assets/banana.png')}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.productName}>Banana</Text>
            <Text style={styles.productType}>Fruit</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAddListing}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
          {/* Listing Card 2 */}
          <View style={styles.listingCard}>
            <Image
              source={require('../assets/baguio_beans.png')}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.productName}>Baguio Beans</Text>
            <Text style={styles.productType}>Vegetables</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAddListing}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Success Banner */}
      {successVisible && (
        <View style={styles.successBannerColumn}>
          <TouchableOpacity style={styles.dashboardButton} onPress={handleGoManageBusiness}>
            <Text style={styles.dashboardButtonText}>Go to Manage Business</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <Feather name="check-circle" size={20} color="#4CAF50" />
            <Text style={styles.successText}>
              <Text style={{ fontWeight: 'bold' }}>Success:</Text> Listing successfully added.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    marginLeft: 2,
  },
  backButton: {
    marginRight: 14,
    padding: 4,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 14,
    marginTop: 2,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f0e6',
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 40,
    marginBottom: 18,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#222',
  },
  filterButton: {
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.10)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  filterModal: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 18,
    minWidth: 280,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#bdbdbd',
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 8,
    color: '#222',
  },
  categoryGrid: {
    marginBottom: 14,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  categoryItem: {
    fontSize: 14,
    color: '#222',
    width: 110,
    marginVertical: 2,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
  },
  closeButtonText: {
    color: '#222',
    fontWeight: '500',
    fontSize: 13,
  },
  importRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  importText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222',
  },
  importModal: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 24,
    minWidth: 260,
    alignItems: 'center',
    elevation: 4,
    borderWidth: 1,
    borderColor: '#bdbdbd',
  },
  importBox: {
    borderWidth: 1,
    borderColor: '#6BA06B',
    borderStyle: 'dashed',
    borderRadius: 6,
    padding: 24,
    alignItems: 'center',
    marginBottom: 18,
    width: 220,
    backgroundColor: '#f8f8f8',
  },
  importDragText: {
    color: '#222',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 8,
  },
  importOrText: {
    color: '#888',
    fontSize: 13,
    marginVertical: 8,
    textAlign: 'center',
  },
  chooseFileButton: {
    backgroundColor: '#6BA06B',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 4,
  },
  chooseFileButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  listingsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 16,
  },
  listingCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    width: 120,
    marginRight: 12,
    alignItems: 'center',
    paddingBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  image: {
    width: '100%',
    height: 70,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
    marginBottom: 2,
    marginTop: 2,
    alignSelf: 'flex-start',
    marginLeft: 8,
  },
  productType: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    alignSelf: 'flex-start',
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: '#6BA06B',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 24,
    marginTop: 4,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  successBannerColumn: {
    backgroundColor: '#E8F5E9',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    margin: 18,
    borderWidth: 1,
    borderColor: '#A5D6A7',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    alignItems: 'center',
  },
  dashboardButton: {
    backgroundColor: '#6BA06B',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  dashboardButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  successOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
  },
  successBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#A5D6A7',
  },
  successText: {
    color: '#388E3C',
    fontSize: 14,
    marginLeft: 8,
  },
});