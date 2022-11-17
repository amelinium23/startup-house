import React from 'react';
import { View, StyleSheet } from 'react-native';
import { invertColor } from '../../utils/helper';
import { Badge, Card, Text } from 'react-native-paper';
import { Issue } from '../../types/Issue';
import BadgeContainer from '../BadgeContainer';

interface IssueItemProps {
  issue: Issue;
  handleNavigation: (issue: Issue) => void;
}

export default function IssueItem({ issue, handleNavigation }: IssueItemProps) {
  const subTitle = `Created by ${issue.user.login} at ${new Date(
    issue.created_at
  ).toLocaleDateString()}`;

  return (
    <Card mode="outlined" style={styles.cardContainer} onPress={() => handleNavigation(issue)}>
      <Card.Title title={issue.title} subtitle={subTitle} />
      <Card.Content>
        <BadgeContainer badges={issue?.labels ?? []} />
        <Text>Status: {issue.state}</Text>
        <Text>{issue.body.slice(0, 50)}...</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: { marginHorizontal: 10, marginVertical: 5, borderRadius: 5 },
});
