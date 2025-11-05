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
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  title: {
    ...typography.h1,
    fontSize: 24,
  },
  listHeader: {
    ...typography.h1,
    fontSize: 18,
    color: colors.textSecondary,
    paddingHorizontal: spacing.medium,
    paddingTop: spacing.large,
    paddingBottom: spacing.small,
  },
  card: {
    backgroundColor: colors.white,
    padding: spacing.medium,
    marginVertical: spacing.small,
    marginHorizontal: spacing.medium,
    borderRadius: spacing.small,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  originText: {
    ...typography.body,
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xlarge,
  },
});