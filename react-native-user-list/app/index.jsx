import { View } from 'react-native';
import UserList from '../components/UserList';

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <UserList />
    </View>
  );
}