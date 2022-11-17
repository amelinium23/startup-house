import React from 'react';
import { View } from 'react-native';
import { Portal, Modal, Button, TextInput } from 'react-native-paper';
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
  const [body, setBody] = React.useState('');
  const [title, setTitle] = React.useState('');

  const handleSaveComment = async () => {
    await addComment(issueId, { body, title, id: `${title}-${body}` } as Comment);
    setTitle('');
    setBody('');
    onDismiss(false);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => onDismiss(false)}
        contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}
      >
        <View>
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
        <View>
          <Button disabled={!title || !body} onPress={handleSaveComment}>
            Save comment
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
