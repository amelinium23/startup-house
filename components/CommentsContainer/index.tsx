import { StyleSheet, View } from 'react-native';
import { Button, Text, Title } from 'react-native-paper';
import { Comment } from '../../types/Comment';
import { useEffect, useState } from 'react';
import AddCommentModal from '../AddCommentModal';
import { getComments } from '../../services/commentService';
import CommentItem from '../CommentItem';

interface CommentsContainerProps {
  issueId: string;
  addComment: (issueId: string, comment: Comment) => Promise<void>;
}

export default function CommentsContainer({ issueId, addComment }: CommentsContainerProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isAddingEnabled, setIsAddingEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      const comments: Comment[] = await getComments(issueId);
      setComments(comments);
    })();
  }, [isAddingEnabled]);

  const noComments =
    comments.length === 0 ? (
      <View>
        <Text style={{ textAlign: 'center' }}>No comments!</Text>
      </View>
    ) : (
      <View style={{ marginBottom: 4 }}>
        {comments.map((comment) => (
          <CommentItem comment={comment} />
        ))}
      </View>
    );

  const onAddComment = () => {
    setIsAddingEnabled(!isAddingEnabled);
  };

  const handleDismiss = (value: boolean) => {
    setIsAddingEnabled(value);
  };

  console.log(comments);

  return (
    <View style={{ marginBottom: 15 }}>
      <Title style={styles.title}>Comments</Title>
      {noComments}
      <View style={{ justifyContent: 'center' }}>
        <Button style={{ alignSelf: 'center' }} mode="contained" icon="plus" onPress={onAddComment}>
          Add comment
        </Button>
      </View>
      <AddCommentModal
        visible={isAddingEnabled}
        onDismiss={handleDismiss}
        issueId={issueId}
        addComment={addComment}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { color: 'black', textAlign: 'center', fontSize: 14 },
});
