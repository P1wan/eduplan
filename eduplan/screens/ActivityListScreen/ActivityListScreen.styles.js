import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    ...typography.h1,
    fontSize: 24,
    textAlign: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xlarge,
  },
  card: {
    backgroundColor: colors.white,
    padding: spacing.medium,
    marginVertical: spacing.small,
    marginHorizontal: spacing.medium,
    borderRadius: spacing.small,
    borderWidth: 1,
    borderColor: colors.border,
  },
  titleText: {
    ...typography.body,
    fontWeight: 'bold',
    marginBottom: spacing.small,
  },
  detailsText: {
    ...typography.caption,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: spacing.large,
    bottom: spacing.large,
    backgroundColor: colors.primary,
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});