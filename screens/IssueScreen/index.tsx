import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={handleBackNavigation} />
        <Appbar.Content title={issue.title} />
      </Appbar.Header>
      <IssueDetails issue={issue} />
    </>
  );
}
