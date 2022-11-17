import axios from 'axios';
import { FlatList, View, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Issue } from '../../types/Issue';
import IssueItem from '../IssueItem';
import { ActivityIndicator } from 'react-native-paper';
import type { RootStackParamList } from '../../types/RootStackParamList';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SearchBar from '../SearchBar';

const getIssues = async (page: number) => {
  const res = await axios.get('https://api.github.com/repos/facebook/react-native/issues', {
    params: { per_page: 30, page: page },
  });
  return res.data;
};

interface IssueListProp {
  navigation: NativeStackNavigationProp<RootStackParamList, 'issue'>;
}

export default function IssueList({ navigation }: IssueListProp) {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState<number>(1);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchIssues = async () => {
      const issues: Issue[] = await getIssues(page);
      if (!issues) return;
      if (issues.length > 0) {
        setIssues((prevIssues) => [...prevIssues, ...issues]);
      }
      setIsInitialLoading(false);
      setIsLoading(false);
    };
    fetchIssues();
  }, [page]);

  const filteredIssues =
    searchQuery !== ''
      ? issues.filter((issue: Issue) => issue.title.toLocaleLowerCase().includes(searchQuery))
      : issues;

  const handleNavigation = (issue: Issue) => {
    navigation.navigate('issue', { issue });
  };

  const renderItem = ({ item }: { item: Issue }) => (
    <IssueItem issue={item} handleNavigation={() => handleNavigation(item)} />
  );

  const onEndReached = async () => {
    if (searchQuery !== '') return;
    setIsLoading(true);
    setPage(page + 1);
  };

  if (!issues) {
    return null;
  }

  return isInitialLoading ? (
    <View style={styles.loader}>
      <ActivityIndicator animating />
    </View>
  ) : (
    <FlatList
      data={filteredIssues}
      initialNumToRender={30}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.7}
      ListHeaderComponent={<SearchBar searchQuery={searchQuery} handleSearch={setSearchQuery} />}
      ListFooterComponent={() =>
        isLoading ? <ActivityIndicator style={styles.bottomLoader} animating /> : null
      }
      stickyHeaderIndices={[0]}
    />
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  bottomLoader: { marginBottom: 10 },
});
