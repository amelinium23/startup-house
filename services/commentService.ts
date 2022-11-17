import AsyncStorage from '@react-native-async-storage/async-storage';
import { Comment } from '../types/Comment';

const getComments = async (nodeId: string): Promise<Comment[]> => {
  try {
    const comments = await AsyncStorage.getItem(nodeId);
    const parsedComments = JSON.parse(comments ?? '[]');
    return parsedComments;
  } catch (e) {
    return [];
  }
};

export { getComments };
