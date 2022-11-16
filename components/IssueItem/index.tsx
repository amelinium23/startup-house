import React from 'react';
import { View } from 'react-native';
import { Badge, Card, Text } from 'react-native-paper';
import { Issue } from '../../types/Issue';
import { invertColor } from '../../utils/helper';

interface IssueItemProps {
  issue: Issue;
  handleNavigation: (issue: Issue) => void;
}

export default function IssueItem({ issue, handleNavigation }: IssueItemProps) {
  const subTitle = `Created by ${issue.user.login} at ${new Date(
    issue.created_at
  ).toLocaleDateString()}`;

  return (
    <Card
      mode="outlined"
      style={{ marginHorizontal: 10, marginVertical: 5, borderRadius: 5 }}
      onPress={() => handleNavigation(issue)}
    >
      <Card.Title title={issue.title} subtitle={subTitle} />
      <Card.Content>
        <View style={{ flexDirection: 'row', flexGrow: 1, justifyContent: 'center' }}>
          {issue.labels?.map((label) => (
            <Badge
              key={label.node_id}
              style={{
                marginEnd: 5,
                backgroundColor: `#${label.color}`,
                color: `${invertColor(label.color)}`,
              }}
            >
              {label.name}
            </Badge>
          ))}
        </View>
        <Text>Status: {issue.state}</Text>
        <Text>{issue.body.slice(0, 50)}...</Text>
      </Card.Content>
    </Card>
  );
}
