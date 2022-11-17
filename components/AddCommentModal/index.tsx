import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Portal, Modal, Button, TextInput, Title } from 'react-native-paper';
import { Comment } from '../../types/Comment';

interface AddCommentModalProps {
  visible: boolean;
  onDismiss: (value: boolean) => void;
  issueId: string;
  addComment: (issueId: string, comment: Comment) => Promise<void>;
}

export default function AddCommentModal({
  visible,
  issueId,
  onDismiss,
  addComment,
}: AddCommentModalProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [body, setBody] = React.useState('');
  const [title, setTitle] = React.useState('');

  const handleSaveComment = async () => {
    setIsLoading(true);
    await addComment(issueId, {
      body,
      title,
      id: `${title}-${body}-${Math.round(Math.random() * 100)}`,
    } as Comment);
    setTitle('');
    setBody('');
    setIsLoading(false);
    onDismiss(false);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => onDismiss(false)}
        contentContainerStyle={styles.containerStyle}
      >
        <View>
          <Title style={styles.title}>Add new comment</Title>
          <TextInput
            label="Title"
            mode="outlined"
            value={title}
            onChange={(e) => setTitle(e.nativeEvent.text)}
          />
          <TextInput
            label="Comment"
            mode="outlined"
            multiline
            value={body}
            onChange={(e) => setBody(e.nativeEvent.text)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            mode="contained"
            loading={isLoading}
            buttonColor="#43A047"
            disabled={!title || !body}
            onPress={handleSaveComment}
          >
            Save comment
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  containerStyle: { backgroundColor: 'white', padding: 20 },
  title: { marginBottom: 5, textAlign: 'center', fontSize: 16 },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginVertical: 5,
  },
  button: {
    alignSelf: 'center',
    width: '50%',
  },
});
