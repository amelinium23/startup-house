import { Card, Title } from 'react-native-paper';
import { Comment } from '../../types/Comment';
import { Text, StyleSheet } from 'react-native';

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  return (
    <Card mode="outlined" style={styles.cardContainer}>
      <Card.Content>
        <Title>{comment.title}</Title>
        <Text>{comment.body}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: { marginBottom: 3 },
});
