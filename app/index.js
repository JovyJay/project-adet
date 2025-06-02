import React, { useState } from 'react';
import { router } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

export default function LogInPage() {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Navigate to DashboardPage after login
    router.replace('/DashboardPage');
  };

  return (
    <View style={styles.container}>
      {/* App Name */}
      <View style={styles.logoRow}>
        <Text style={styles.logoText}>PathSmart</Text>
      </View>
      {/* Title and Subtitle */}
      <Text style={styles.title}>PathSmart System</Text>
      <Text style={styles.subtitle}>
        Enter your username and password to continue. Please log in as either an Administrator or a Stall Owner.
      </Text>
      {/* Role Picker */}
      <View style={styles.inputWrapper}>
        <Picker
          selectedValue={role}
          onValueChange={setRole}
          style={styles.picker}
          dropdownIconColor="#222"
        >
          <Picker.Item label="Login as" value="" />
          <Picker.Item label="Administrator" value="admin" />
          <Picker.Item label="Stall Owner" value="owner" />
        </Picker>
      </View>
      {/* Username Input */}
      <View style={styles.inputWrapper}>
        <MaterialCommunityIcons name="account-outline" size={22} color="#222" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#888"
        />
      </View>
      {/* Password Input */}
      <View style={styles.inputWrapper}>
        <Feather name="lock" size={22} color="#222" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Feather name={showPassword ? "eye" : "eye-off"} size={22} color="#222" />
        </TouchableOpacity>
      </View>
      {/* Forgot Password */}
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot your password?</Text>
      </TouchableOpacity>
      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 28,
    paddingTop: 48,
    justifyContent: 'flex-start',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
    justifyContent: 'flex-start',
  },
  logoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 6,
    color: '#222',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 22,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 6,
    marginBottom: 14,
    paddingHorizontal: 10,
    backgroundColor: '#f8f8f8',
    height: 48,
  },
  icon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#222',
    backgroundColor: 'transparent',
  },
  picker: {
    flex: 1,
    height: 48,
    color: '#222',
    backgroundColor: 'transparent',
  },
  forgot: {
    color: '#222',
    textDecorationLine: 'underline',
    marginBottom: 18,
    marginLeft: 2,
    fontSize: 13,
  },
  button: {
    backgroundColor: '#6BA06B',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 17,
  },
});