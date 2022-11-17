import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text, Title } from 'react-native-paper';
import { Comment } from '../../types/Comment';
import React, { useEffect, useState } from 'react';
import AddCommentModal from '../AddCommentModal';
import { getComments } from '../../services/commentService';
import CommentItem from '../CommentItem';

interface CommentsContainerProps {
  issueId: string;
  addComment: (issueId: string, comment: Comment) => Promise<void>;
}

export default function CommentsContainer({ issueId, addComment }: CommentsContainerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isAddingEnabled, setIsAddingEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const comments: Comment[] = await getComments(issueId);
      setComments(comments);
      setIsLoading(false);
    })();
  }, [isAddingEnabled]);

  const onAddComment = () => {
    setIsAddingEnabled(!isAddingEnabled);
    setIsLoading(false);
  };

  const handleDismiss = (value: boolean) => {
    setIsAddingEnabled(value);
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Comments</Title>
      {comments.length === 0 ? (
        <View>
          <Text style={{ textAlign: 'center' }}>No comments!</Text>
        </View>
      ) : (
        <View style={{ marginBottom: 4 }}>
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode="contained" icon="plus" onPress={onAddComment}>
          Add comment
        </Button>
      </View>
      <AddCommentModal
        visible={isAddingEnabled}
        onDismiss={handleDismiss}
        issueId={issueId}
        addComment={addComment}
      />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating={true} color="blue" />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { marginBottom: 15 },
  title: { color: 'black', textAlign: 'center', fontSize: 14 },
  buttonContainer: { justifyContent: 'center' },
  button: { alignSelf: 'center' },
});
