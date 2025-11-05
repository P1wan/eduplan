import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.medium,
    textAlign: 'center',
    paddingHorizontal: spacing.large,
  },
});