import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function ManageBusiness() {
  const handleBack = () => {
    router.back();
  };

  const handleAddListing = () => {
    router.push('/AddListings');
  };

  const handleViewListings = () => {
    router.push('/ViewListings');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Feather name="arrow-left" size={22} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard</Text>
      </View>

      {/* Business Card */}
      <View style={styles.card}>
        <Image
          source={require('../assets/vegetable.png')}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.cardContent}>
          <View style={styles.cardTextRow}>
            <Text style={styles.cardTitle}>Abellano Store</Text>
            <Text style={styles.cardType}>Vegetable</Text>
          </View>
          <Text style={styles.cardLocation}>Ground Floor, Vegetable Section</Text>
          <Text style={styles.cardDetails}># Block 1, Stall 2</Text>
          <View style={styles.cardActionsRow}>
            <TouchableOpacity onPress={handleAddListing}>
              <Text style={styles.addListingLink}>Add  your listings</Text>
            </TouchableOpacity>
          </View>
          {/* Large View Listings Button inside the card */}
          <TouchableOpacity style={styles.viewListingsButton} onPress={handleViewListings}>
            <Feather name="search" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.viewListingsButtonText}>View Listings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 18,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
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
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 22,
    overflow: 'hidden',
    elevation: 2,
    paddingBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardImage: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 0,
  },
  cardContent: {
    paddingHorizontal: 14,
    paddingTop: 14,
  },
  cardTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  cardType: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  cardLocation: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  cardDetails: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  cardActionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 10,
  },
  addListingLink: {
    color: '#222',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  viewListingsButton: {
    flexDirection: 'row',
    backgroundColor: '#6BA06B',
    borderRadius: 4,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
    marginTop: 0,
    width: '100%',
  },
  viewListingsButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});