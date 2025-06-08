import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); 

  const handleLogin = () => {
    if (username && password && role) {
      router.push('/DashboardPage'); 
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <Image source={require('../assets/logo.png')} style={styles.logoImg} />
        <Text style={styles.logoText}>PathSmart</Text>
      </View>
      <View style={styles.formBox}>
        <Text style={styles.title}>PathSmart System</Text>
        <Text style={styles.desc}>
          Enter your username and password to continue. Please log in as either an Administrator or a Stall Owner.
        </Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={role}
            style={styles.picker}
            onValueChange={(itemValue) => setRole(itemValue)}
            dropdownIconColor="#222"
          >
            <Picker.Item label="Login as" value="" />
            <Picker.Item label="Administrator" value="admin" />
            <Picker.Item label="Stall Owner" value="owner" />
          </Picker>
        </View>
        <View style={styles.inputGroup}>
          <MaterialCommunityIcons name="account-outline" size={28} color="#222" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.inputGroup}>
          <Feather name="lock" size={26} color="#222" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#888"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather name={showPassword ? "eye" : "eye-off"} size={24} color="#222" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: 24,
    marginBottom: 24,
  },
  logoImg: {
    width: 32,
    height: 32,
    marginRight: 7,
    resizeMode: 'contain',
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#388e3c',
  },
  formBox: {
    width: '90%',
    maxWidth: 370,
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 4,
    color: '#222',
    textAlign: 'center',
  },
  desc: {
    color: '#888',
    fontSize: 13,
    marginBottom: 18,
    textAlign: 'center',
    lineHeight: 18,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 4,
    marginBottom: 14,
    backgroundColor: '#fafafa',
    overflow: 'hidden',
  },
  picker: {
    height: 48,
    width: '100%',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 4,
    marginBottom: 14,
    backgroundColor: '#fafafa',
    paddingHorizontal: 10,
    height: 52,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 17,
    color: '#222',
  },
  forgot: {
    color: '#388e3c',
    fontSize: 13,
    textDecorationLine: 'underline',
    alignSelf: 'flex-start',
    marginBottom: 14,
    marginLeft: 2,
  },
  loginBtn: {
    backgroundColor: '#6BA06B',
    borderRadius: 4,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 5,
  },
  loginBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});