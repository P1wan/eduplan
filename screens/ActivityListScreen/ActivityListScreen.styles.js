import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.large,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  title: {
    ...typography.h1,
    color: colors.text,
  },

  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    borderRadius: spacing.small,
  },

  addButtonText: {
    ...typography.body,
    color: colors.white,
    fontWeight: 'bold',
  },

  listContainer: {
    padding: spacing.medium,
  },

  activityCard: {
    backgroundColor: colors.white,
    borderRadius: spacing.medium,
    padding: spacing.medium,
    marginBottom: spacing.medium,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.medium,
  },

  activityInfo: {
    flex: 1,
    marginRight: spacing.medium,
  },

  activityTitle: {
    ...typography.h2,
    color: colors.primary,
    marginBottom: spacing.small,
  },

  activitySubject: {
    ...typography.body,
    color: colors.textSecondary,
    fontWeight: 'bold',
  },

  actionButtons: {
    flexDirection: 'row',
  },

  editButton: {
    padding: spacing.small,
    marginRight: spacing.small,
  },

  editButtonText: {
    fontSize: 18,
  },

  deleteButton: {
    padding: spacing.small,
  },

  deleteButtonText: {
    fontSize: 18,
  },

  activityDescription: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.medium,
    lineHeight: 20,
  },

  activityDetails: {
    flexDirection: 'row',
    marginBottom: spacing.medium,
  },

  detailItem: {
    flex: 1,
  },

  detailLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: 'bold',
  },

  detailValue: {
    ...typography.body,
    color: colors.text,
  },

  objectivesContainer: {
    marginBottom: spacing.medium,
  },

  objectivesTitle: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.small,
  },

  objectiveText: {
    ...typography.body,
    color: colors.textSecondary,
    marginLeft: spacing.medium,
    marginBottom: spacing.small,
  },

  moreObjectives: {
    ...typography.caption,
    color: colors.primary,
    marginLeft: spacing.medium,
    fontStyle: 'italic',
  },

  activityDate: {
    ...typography.caption,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.large,
  },

  emptyText: {
    ...typography.h2,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.medium,
  },

  emptySubtext: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
