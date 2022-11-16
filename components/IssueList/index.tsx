import axios from 'axios';
import { FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { Issue } from '../../types/Issue';
import IssueItem from '../IssueItem';

const getIssues = async (page: number) => {
  const res = await axios.get('https://api.github.com/repos/facebook/react-native/issues', {
    params: { per_page: 30, page: page },
  });
  return res.data;
};

interface IssueListProp {
  navigation: any;
}

export default function IssueList({ navigation }: IssueListProp) {
  const [page, setPage] = useState<number>(1);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const fetchIssues = async () => {
      const issues = await getIssues(page);
      if (!issues) return;
      if (issues.length > 0) {
        setIssues((prevIssues) => [...prevIssues, ...issues]);
      }
    };
    fetchIssues();
  }, [page]);

  const handleNavigation = (issue: Issue) => {
    navigation.navigate('issue', { issue });
  };

  const renderItem = ({ item }: { item: Issue }) => (
    <IssueItem key={item.node_id} issue={item} handleNavigation={() => handleNavigation(item)} />
  );

  const onEndReached = async () => {
    setPage(page + 1);
  };

  if (!issues) {
    return null;
  }

  return (
    <FlatList
      data={issues}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
}
