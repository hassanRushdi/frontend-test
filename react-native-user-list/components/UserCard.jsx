import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserCard = memo(({ user }) => {
  const formatAddress = (address) => {
    return `${address.street}, ${address.city}, ${address.zipcode}`;
  };

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.address}>{formatAddress(user.address)}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    color: '#888',
  },
});

export default UserCard;