import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

type SearchBarProps = {
  searchQuery: string;
  handleSearch: (searchText: string) => void;
};

export default function SearchBar({ searchQuery, handleSearch }: SearchBarProps) {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        value={searchQuery}
        onChangeText={(e) => handleSearch(e)}
        placeholder="Type title of the issue"
        label="Search"
        clearButtonMode="always"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});
