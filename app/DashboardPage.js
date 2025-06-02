import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function DashboardPage() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Dashboard Logo */}
      <Text style={styles.header}>Welcome Abellano!</Text>
      <Text style={styles.subheader}>Manage your business</Text>

      {/* First Business Card */}
      <View style={styles.card}>
        <Image
          source={require('../assets/barbershop.png')}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.cardContent}>
          <View style={styles.cardRow}>
            <Text style={styles.cardTitle}>The Classic Cut</Text>
            <Text style={styles.cardType}>Barbershop</Text>
          </View>
          <Text style={styles.cardLocation}>Ground Floor, Barbershop Section</Text>
          <TouchableOpacity
            style={styles.manageButton}
            onPress={() => router.push({ pathname: '/ManageBusiness', params: { view: 'listings' } })}
          >
            <Text style={styles.manageButtonText}>Manage</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Second Business Card */}
      <View style={styles.card}>
        <Image
      source={require('../assets/vegetable.png')}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.cardContent}>
          <View style={styles.cardRow}>
            <Text style={styles.cardTitle}>Abellano Store</Text>
            <Text style={styles.cardType}>Vegetable</Text>
          </View>
          <Text style={styles.cardLocation}>Ground Floor, Section</Text>
          <TouchableOpacity
            style={styles.manageButton}
            onPress={() => router.push({ pathname: '/ManageBusiness', params: { view: 'listings' } })}
          >
            <Text style={styles.manageButtonText}>Manage</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 18 },
  dashboardLogo: {
    width: 40,
    height: 40,
    alignSelf: 'flex-start',
    marginBottom: 18,
    marginTop: 8,
  },
  header: { fontSize: 28, fontWeight: '700', marginBottom: 4, marginTop: 8 },
  subheader: { color: '#888', marginBottom: 18, fontSize: 15 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 28,
    padding: 0,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    padding: 16,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 2,
  },
  cardTitle: { fontWeight: 'bold', fontSize: 18 },
  cardType: { color: '#6BA06B', fontWeight: '600', fontSize: 14 },
  cardLocation: { color: '#888', fontSize: 13, marginBottom: 16, marginTop: 2 },
  manageButton: {
    backgroundColor: '#6BA06B',
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  manageButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});