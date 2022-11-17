import { screen, render } from '@testing-library/react-native';
import CommentItem from '..';

const mockComment = { title: 'Test', body: 'Test body', id: 'Test-Test body' };

describe('CommentItem', () => {
  it('Render correctly', () => {
    render(<CommentItem comment={mockComment} />);
    expect(screen.getByText('Test')).toBeTruthy();
    expect(screen.getByText('Test body')).toBeTruthy();
  });
});
