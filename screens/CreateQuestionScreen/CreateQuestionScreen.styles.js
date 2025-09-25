import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  keyboardAvoid: {
    flex: 1,
  },

  scrollContainer: {
    flex: 1,
  },

  contentContainer: {
    padding: spacing.large,
  },

  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.large,
    textAlign: 'center',
  },

  inputGroup: {
    marginBottom: spacing.large,
  },

  label: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.medium,
  },

  textArea: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.small,
    padding: spacing.medium,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },

  alternativasHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.medium,
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

  alternativaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.medium,
  },

  radioButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.medium,
    backgroundColor: colors.white,
  },

  radioButtonSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },

  radioButtonText: {
    ...typography.body,
    color: colors.text,
    fontWeight: 'bold',
  },

  alternativaInput: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.small,
    padding: spacing.medium,
    fontSize: 16,
    marginRight: spacing.medium,
  },

  removeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.error || '#dc3545',
    justifyContent: 'center',
    alignItems: 'center',
  },

  removeButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },

  hint: {
    ...typography.caption,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: spacing.small,
  },

  saveButton: {
    backgroundColor: colors.success || '#28a745',
    padding: spacing.large,
    borderRadius: spacing.small,
    alignItems: 'center',
    marginTop: spacing.large,
  },

  saveButtonDisabled: {
    backgroundColor: colors.textSecondary,
    opacity: 0.6,
  },

  saveButtonText: {
    ...typography.body,
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
