import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import IssueList from '../../components/IssueList';
import { RootStackParamList } from '../../types/RootStackParamList';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Header />
      <IssueList navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#fff',
  },
});
