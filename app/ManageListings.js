import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useListings } from './ListingsContext';

// Example product data (replace with your real data source)
const PRODUCTS = [
  {
    name: 'Banana',
    type: 'Fruit',
    image: 'https://images.pexels.com/photos/461208/pexels-photo-461208.jpeg?auto=compress&w=120',
  },
  {
    name: 'Baguio Beans',
    type: 'Vegetables',
    image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=120',
  },
];

export default function ManageListings() {
  const { addListing } = useListings();
  const [search, setSearch] = useState('');
  const [success, setSuccess] = useState(false);

  const filteredProducts = PRODUCTS.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (item) => {
    addListing(item);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000); // Hide success after 2s
  };

  const handleGoToManage = () => {
    router.push('/ViewListings');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={22} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage your business</Text>
      </View>

      {/* Description */}
      <Text style={styles.description}>
        Search for products or services that you want to add to your listings. You can filter by category as well.
      </Text>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search listing"
          placeholderTextColor="#666"
          value={search}
          onChangeText={setSearch}
        />
        <Feather name="search" size={18} color="#666" />
        <Feather name="filter" size={20} color="#222" style={{ marginLeft: 12 }} />
      </View>

      {/* Import Listings */}
      <TouchableOpacity style={styles.importRow}>
        <Text style={styles.importText}>Import listings</Text>
        <Feather name="refresh-cw" size={18} color="#222" style={{ marginLeft: 6 }} />
      </TouchableOpacity>

      {/* Product Cards */}
      <View style={styles.cardsRow}>
        {filteredProducts.map((item) => (
          <View key={item.name} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardType}>{item.type}</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => handleAdd(item)}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Success Message */}
      {success && (
        <View style={styles.successBox}>
          <TouchableOpacity style={styles.goToManageButton} onPress={handleGoToManage}>
            <Text style={styles.goToManageButtonText}>Go to Manage business</Text>
          </TouchableOpacity>
          <View style={styles.successRow}>
            <Feather name="check" size={18} color="#388E3C" />
            <Text style={styles.successText}>
              <Text style={{ fontWeight: 'bold' }}> Success: </Text>
              Listing successfully added.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 18 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, marginLeft: 2 },
  backButton: { marginRight: 14, padding: 4 },
  headerTitle: { fontSize: 17, fontWeight: '600', color: '#222' },
  description: { fontSize: 12, color: '#888', marginBottom: 10, marginLeft: 2 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f0e6',
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 40,
    marginBottom: 10,
    width: '100%',
  },
  searchInput: { flex: 1, fontSize: 15, color: '#222' },
  importRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, marginLeft: 2 },
  importText: { fontSize: 14, color: '#222', textDecorationLine: 'underline' },
  cardsRow: { flexDirection: 'row', justifyContent: 'flex-start', gap: 8 },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    marginHorizontal: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    width: 150,
  },
  cardImage: { width: 120, height: 70, borderRadius: 4, marginBottom: 8 },
  cardTitle: { fontWeight: 'bold', fontSize: 15, marginBottom: 2 },
  cardType: { color: '#666', fontSize: 13, marginBottom: 8 },
  addButton: {
    backgroundColor: '#6BA06B',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginTop: 8,
  },
  addButtonText: { color: '#fff', fontWeight: '600' },
  successBox: {
    backgroundColor: '#E3F5DF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'flex-start',
    width: '100%',
    position: 'absolute',
    bottom: 24,
    left: 18,
  },
  goToManageButton: {
    backgroundColor: '#6BA06B',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignSelf: 'center',
    marginBottom: 8,
  },
  goToManageButtonText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  successRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  successText: { color: '#388E3C', marginLeft: 6, fontSize: 13 },
});