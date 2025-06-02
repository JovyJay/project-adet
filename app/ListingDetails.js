import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';

export default function ListingDetails() {
  const { name, type, image } = useLocalSearchParams();

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Feather name="arrow-left" size={22} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>View your listing</Text>
      </View>

      {/* Listing Card */}
      <View style={styles.listingCardOuter}>
        <View style={styles.listingCard}>
          <Image
            source={{ uri: image }}
            style={styles.imagePlaceholder}
            resizeMode="cover"
          />
          <Text style={styles.productName}>{name}</Text>
          <Text style={styles.productType}>{type}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 18 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18, marginLeft: 2 },
  backButton: { marginRight: 14, padding: 4 },
  headerTitle: { fontSize: 17, fontWeight: '600', color: '#222' },
  listingCardOuter: { borderWidth: 1, borderColor: '#222', borderRadius: 4, padding: 4, backgroundColor: '#fff', marginLeft: 4, marginTop: 8, alignSelf: 'flex-start' },
  listingCard: { backgroundColor: '#fff', borderRadius: 4, width: 140, alignItems: 'center', paddingBottom: 12 },
  imagePlaceholder: { width: 132, height: 70, backgroundColor: '#e0e0e0', borderRadius: 2, marginBottom: 8 },
  productName: { fontSize: 14, fontWeight: '600', color: '#222', marginBottom: 2, marginTop: 2, alignSelf: 'flex-start', marginLeft: 8 },
  productType: { fontSize: 12, color: '#666', marginBottom: 8, alignSelf: 'flex-start', marginLeft: 8 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginTop: 4, gap: 8 },
  removeButton: { backgroundColor: '#E53935', borderRadius: 4, paddingVertical: 6, paddingHorizontal: 12, alignItems: 'center', flex: 1 },
  removeButtonText: { color: '#fff', fontWeight: '600', fontSize: 13, textAlign: 'center' },
  editButton: { backgroundColor: '#388E3C', borderRadius: 4, paddingVertical: 6, paddingHorizontal: 12, alignItems: 'center', flex: 1 },
  editButtonText: { color: '#fff', fontWeight: '600', fontSize: 13, textAlign: 'center' },
});