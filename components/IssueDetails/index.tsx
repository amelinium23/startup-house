import { View, StyleSheet } from 'react-native';
import { Issue } from '../../types/Issue';
import { Title, Badge, Text, Avatar } from 'react-native-paper';
import { MarkdownView } from 'react-native-markdown-view';
import { invertColor } from '../../utils/helper';

interface IssueDetailsProps {
  issue: Issue;
}

export default function IssueDetails({ issue }: IssueDetailsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.imageContainer}>
          <Avatar.Image source={{ uri: issue.user.avatar_url }} />
          <Text style={styles.text}>{issue.user.login}</Text>
        </View>
        <Title style={styles.title}>{issue.title}</Title>
      </View>
      <View style={styles.badgeContainer}>
        {issue.labels?.map((label) => (
          <Badge
            style={{
              marginEnd: 5,
              backgroundColor: `#${label.color}`,
              color: `${invertColor(label.color)}`,
            }}
            key={label.node_id}
            size={30}
          >
            {label.name}
          </Badge>
        ))}
      </View>
      <View>
        <Text style={styles.dateString}>
          Created at: {new Date(issue.created_at).toLocaleDateString()}
        </Text>
        <MarkdownView style={styles.markdownView}>{issue.body}</MarkdownView>
      </View>
      <View>
        <Title style={styles.title}>Comments</Title>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, marginHorizontal: 10 },
  imageContainer: { justifyContent: 'center', alignItems: 'center', width: 70 },
  badgeContainer: { flexDirection: 'row', padding: 10, justifyContent: 'center' },
  title: { color: 'black', textAlign: 'center', fontSize: 14, width: 300 },
  dateString: { color: 'black', textAlign: 'center' },
  avatarContainer: { flexDirection: 'row', maxWidth: 400, justifyContent: 'center' },
  text: { color: 'black' },
  markdownView: { fontFamily: 'Roboto' },
});
