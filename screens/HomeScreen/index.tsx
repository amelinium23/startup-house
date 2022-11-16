import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from '../../components/Header';
import IssueList from '../../components/IssueList';
import { RootStackParamList } from '../../types/RootStackParamList';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <>
      <Header />
      <IssueList navigation={navigation} />
    </>
  );
}
