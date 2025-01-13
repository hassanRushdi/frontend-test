import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setSearchQuery } from '../redux/userSlice';
import UserCard from './UserCard';

export default function UserList() {
  const dispatch = useDispatch();
  const { filteredData, loading, searchQuery } = useSelector((state) => state.users);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    dispatch(fetchUsers());
    return () => setMounted(false);
  }, [dispatch]);

  const renderItem = ({ item }) => <UserCard user={item} />;

  const handleLoadMore = () => {
    if (mounted) {
      dispatch(fetchUsers());
    }
  };

  const handleSearch = (text) => {
    if (mounted) {
      dispatch(setSearchQuery(text));
    }
  };

  if (!mounted) return null;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search users..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={() =>
          loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Button title="Load More" onPress={handleLoadMore} />
          )
        }
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 10,
  },
  searchInput: {
    height: 40,
    margin: 12,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
});