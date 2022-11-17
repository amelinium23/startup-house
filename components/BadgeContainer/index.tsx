import { View, StyleSheet } from 'react-native';
import { Badge } from 'react-native-paper';
import { Labels } from '../../types/Issue';
import { invertColor } from '../../utils/helper';

interface BadgeContainerProps {
  badges: Labels[];
}

export default function BadgeContainer({ badges }: BadgeContainerProps) {
  return (
    <View style={styles.badgeContainer}>
      {badges?.map((label) => (
        <Badge
          key={label.node_id}
          style={{
            ...styles.badge,
            backgroundColor: `#${label.color}`,
            color: `${invertColor(label.color)}`,
          }}
          size={30}
        >
          {label.name}
        </Badge>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  badgeContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 10, justifyContent: 'center' },
  badge: { marginHorizontal: 4, marginVertical: 4 },
});
