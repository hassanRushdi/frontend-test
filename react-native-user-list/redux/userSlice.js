import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_STORAGE_KEY = '@users_data';
const USERS_PER_PAGE = 5;

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page = 1) => {
    try {
      const cachedData = await AsyncStorage.getItem(USERS_STORAGE_KEY);
      if (cachedData && page === 1) {
        return JSON.parse(cachedData);
      }

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${USERS_PER_PAGE}`
      );
      const data = await response.json();

      if (page === 1) {
        await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(data));
      }

      return data;
    } catch (error) {
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    filteredData: [],
    loading: false,
    error: null,
    currentPage: 1,
    searchQuery: '',
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredData = state.data.filter(user =>
        user.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentPage === 1) {
          state.data = action.payload;
        } else {
          state.data = [...state.data, ...action.payload];
        }
        state.filteredData = state.data;
        state.currentPage += 1;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearchQuery } = userSlice.actions;
export default userSlice.reducer;