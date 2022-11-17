import { View, StyleSheet, ScrollView } from 'react-native';
import { Issue } from '../../types/Issue';
import { Title, Badge, Text, Avatar } from 'react-native-paper';
import { MarkdownView } from 'react-native-markdown-view';
import { invertColor } from '../../utils/helper';
import { useCallback, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import CommentsContainer from '../CommentsContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Comment } from '../../types/Comment';
import { getComments } from '../../services/commentService';

interface IssueDetailsProps {
  issue: Issue;
}

const addComment = async (nodeId: string, comment: Comment): Promise<void> => {
  try {
    const comments: Comment[] = await getComments(nodeId);
    comments.push(comment);
    await AsyncStorage.setItem(nodeId, JSON.stringify(comments));
  } catch (e) {
    console.log(e);
  }
};

export default function IssueDetails({ issue }: IssueDetailsProps) {
  const [fontsLoaded] = useFonts({
    Courier: require('../../assets/fonts/Courier.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={styles.container} onLayout={onLayoutRootView}>
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
      <CommentsContainer issueId={issue.node_id} addComment={addComment} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, marginHorizontal: 10, fontFamily: 'Courier', marginBottom: 10 },
  imageContainer: { justifyContent: 'center', alignItems: 'center', width: 80, marginLeft: 10 },
  badgeContainer: { flexDirection: 'row', padding: 10, justifyContent: 'center' },
  title: { color: 'black', textAlign: 'center', fontSize: 14, width: 300 },
  dateString: { color: 'black', textAlign: 'center' },
  avatarContainer: { flexDirection: 'row', maxWidth: 400, justifyContent: 'center' },
  text: { color: 'black' },
  markdownView: { fontFamily: 'monospace' },
});
