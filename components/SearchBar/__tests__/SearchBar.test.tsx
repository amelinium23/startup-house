import { screen, render } from '@testing-library/react-native';
import SearchBar from '..';

describe('SearchBar', () => {
  it('Render correctly', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar searchQuery="" handleSearch={mockOnSearch} />);
    expect(screen.getByTestId('searchInput').props.value).toEqual('');
  });
});
