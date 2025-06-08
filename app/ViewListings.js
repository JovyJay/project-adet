import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Alert,
  Modal,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ViewListings() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [listings, setListings] = useState([
    {
      id: '1',
      name: 'Banana',
      category: 'Fruits',
      price: '',
      status: 'Available',
      image: 'https://images.pexels.com/photos/461208/pexels-photo-461208.jpeg',
    },
    // Add more items as needed
  ]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [editedPrice, setEditedPrice] = useState('');
  const [editedStatus, setEditedStatus] = useState('Available');
  const [isEditing, setIsEditing] = useState(false);

  // Remove logic
  const handleRemove = (id) => {
    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to remove this listing?')) {
        setListings(listings.filter(item => item.id !== id));
      }
    } else {
      Alert.alert(
        'Remove Listing',
        'Are you sure you want to remove this listing?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Remove',
            style: 'destructive',
            onPress: () => setListings(listings.filter(item => item.id !== id)),
          },
        ]
      );
    }
  };

  // Open Edit Modal
  const handleEdit = (item) => {
    setSelectedListing(item);
    setEditedPrice(item.price);
    setEditedStatus(item.status);
    setIsEditing(false);
    setEditModalVisible(true);
  };

  // Save changes in modal
  const handleSaveChanges = () => {
    setListings(listings.map(item =>
      item.id === selectedListing.id
        ? { ...item, price: editedPrice, status: editedStatus }
        : item
    ));
    setEditModalVisible(false);
    setIsEditing(false);
  };

  const handleAddListing = () => {
    router.push('/AddListings'); // <-- match the filename (with "s")
  };

  // Filtered listings based on search
  const filteredListings = listings.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const showEmptyState = filteredListings.length === 0;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={22} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>View your listing</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search listing"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Feather name="search" size={18} color="#6BA06B" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="filter" size={18} color="#222" />
        </TouchableOpacity>
      </View>

      {/* Listings or Empty State */}
      {showEmptyState ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>
            No listings have been added yet. Please add a listing to get started.
          </Text>
          <TouchableOpacity style={styles.addButton} onPress={handleAddListing}>
            <Feather name="plus" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.addButtonText}>Add listings</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredListings}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.listingCard}>
              <Image source={{ uri: item.image }} style={styles.listingImage} />
              <View style={{ width: '100%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Text style={styles.listingName}>{item.name}</Text>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={[styles.statusText, styles.statusAvailableText]}>{item.status}</Text>
                    <Text style={styles.amountDisplay}>
                      {item.price ? `₱${item.price}` : ''}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.listingCategory, { marginBottom: 8, marginTop: 0, textAlign: 'left', alignSelf: 'flex-start' }]}>
                  {item.category}
                </Text>
              </View>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemove(item.id)}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEdit(item)}
                >
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {/* Edit Modal */}
      <Modal
        visible={editModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedListing && (
              <>
                <Image source={{ uri: selectedListing.image }} style={styles.modalImage} />
                <View style={styles.modalRow}>
                  <Text style={styles.modalName}>{selectedListing.name}</Text>
                  <TouchableOpacity
                    style={[
                      styles.statusBadge,
                      editedStatus === 'Available'
                        ? styles.statusAvailable
                        : styles.statusUnavailable,
                    ]}
                    disabled={!isEditing}
                    onPress={() =>
                      isEditing &&
                      setEditedStatus(
                        editedStatus === 'Available' ? 'Unavailable' : 'Available'
                      )
                    }
                  >
                    <Text
                      style={[
                        styles.statusText,
                        editedStatus === 'Available'
                          ? styles.statusAvailableText
                          : styles.statusUnavailableText,
                      ]}
                    >
                      {editedStatus}
                    </Text>
                    <Feather
                      name="chevron-down"
                      size={16}
                      color={editedStatus === 'Available' ? '#388e3c' : '#e74c3c'}
                      style={{ marginLeft: 2 }}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.modalCategory}>{selectedListing.category}</Text>
                <View style={styles.amountRow}>
                  {isEditing ? (
                    <TextInput
                      style={styles.amountInput}
                      value={editedPrice}
                      onChangeText={setEditedPrice}
                      placeholder="Enter amount"
                      placeholderTextColor="#388e3c"
                      keyboardType="numeric"
                    />
                  ) : (
                    <Text style={styles.amountDisplay}>
                      {editedPrice ? `₱${editedPrice}` : <Text style={styles.amountPlaceholder}>Enter amount</Text>}
                    </Text>
                  )}
                </View>
                <View style={styles.editRow}>
                  <TouchableOpacity
                    style={styles.iconEditButton}
                    onPress={() => setIsEditing(true)}
                    disabled={isEditing}
                  >
                    <Feather name="edit-2" size={18} color="#fff" />
                  </TouchableOpacity>
                  <Text style={styles.editLabel}>Edit</Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.savedButton,
                    { opacity: isEditing ? 1 : 0.6 },
                  ]}
                  onPress={handleSaveChanges}
                  disabled={!isEditing}
                >
                  <Text style={styles.savedButtonText}>Saved changes</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 18 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  backButton: { marginRight: 14, padding: 4 },
  headerTitle: { fontSize: 17, fontWeight: '600', color: '#222' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#e6f2df',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  searchButton: { padding: 8, marginRight: 4 },
  filterButton: { padding: 8 },
  listingCard: {
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 4,
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
    width: 160,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  listingImage: { width: 100, height: 70, borderRadius: 4, marginBottom: 6 },
  listingName: { fontWeight: 'bold', fontSize: 15, marginBottom: 2 },
  listingCategory: { color: '#444', fontSize: 13, marginBottom: 8 },
  buttonRow: { flexDirection: 'row', gap: 8 },
  removeButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 6,
  },
  removeButtonText: { color: '#fff', fontWeight: '600' },
  editButton: {
    backgroundColor: '#6BA06B',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  editButtonText: { color: '#fff', fontWeight: '600' },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  emptyStateText: {
    color: '#888',
    marginBottom: 18,
    textAlign: 'center',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#6BA06B',
    borderRadius: 4,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
    textAlign: 'center',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 18,
    alignItems: 'flex-start',
    elevation: 8,
    borderWidth: 1,
    borderColor: '#222',
  },
  modalImage: {
    width: 280,
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 10,
    alignSelf: 'center',
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 2,
  },
  modalName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  statusAvailable: {
    backgroundColor: '#e6f4ea',
  },
  statusUnavailable: {
    backgroundColor: '#fbeaea',
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  statusAvailableText: {
    color: '#388e3c',
  },
  statusUnavailableText: {
    color: '#e74c3c',
  },
  modalCategory: {
    color: '#888',
    fontSize: 14,
    marginBottom: 2,
    marginTop: 2,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginTop: 4,
    minHeight: 28,
  },
  amountInput: {
    borderBottomWidth: 1,
    borderColor: '#6BA06B',
    fontSize: 15,
    minWidth: 100,
    textAlign: 'right',
    paddingVertical: 2,
    color: '#388e3c',
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
  },
  amountDisplay: {
    fontSize: 15,
    color: '#222',
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  amountPlaceholder: {
    color: '#388e3c',
    textDecorationLine: 'underline',
    fontWeight: '400',
  },
  pesoSign: {
    color: '#388e3c',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 2,
    alignSelf: 'flex-end',
  },
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginTop: 2,
    gap: 4,
  },
  iconEditButton: {
    backgroundColor: '#6BA06B',
    borderRadius: 4,
    padding: 6,
    marginRight: 4,
  },
  editLabel: {
    color: '#222',
    fontSize: 15,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  savedButton: {
    backgroundColor: '#6BA06B',
    borderRadius: 6,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    marginTop: 4,
  },
  savedButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
});