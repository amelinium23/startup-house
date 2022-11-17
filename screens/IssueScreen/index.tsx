import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { RootStackParamList } from '../../types/RootStackParamList';
import IssueDetails from '../../components/IssueDetails';
interface IssueScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'issue'>;
  route: RouteProp<RootStackParamList, 'issue'>;
}

export default function IssueScreen({ navigation, route }: IssueScreenProps) {
  const { issue } = route.params;

  const handleBackNavigation = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={handleBackNavigation} />
        <Appbar.Content title={issue.title} />
      </Appbar.Header>
      <IssueDetails issue={issue} />
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
