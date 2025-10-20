import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
  },
  headerTitle: {
    ...typography.h1,
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: spacing.small,
  },
  infoContainer: {
    padding: spacing.medium,
  },
  label: {
    ...typography.h1,
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: spacing.small,
  },
  instructions: {
    ...typography.body,
    fontSize: 16,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.large,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: spacing.small,
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
  questionText: {
    ...typography.body,
    fontSize: 16,
  },
  commentText: {
    ...typography.caption,
    fontStyle: 'italic',
    marginTop: spacing.small,
    backgroundColor: '#fffbe6',
    padding: spacing.small,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ffe58f',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: spacing.medium,
    color: colors.textSecondary,
  },
});