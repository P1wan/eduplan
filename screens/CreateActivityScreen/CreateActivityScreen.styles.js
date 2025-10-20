import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
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
  title: { ...typography.h1, fontSize: 20 },
  formContainer: { padding: spacing.medium },
  label: { ...typography.body, fontWeight: 'bold', marginBottom: spacing.small },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.small,
    padding: spacing.medium,
    fontSize: 16,
    marginBottom: spacing.medium,
  },
  pickerButtonContainer: {
    paddingHorizontal: spacing.medium,
    paddingBottom: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  listHeader: {
    ...typography.h1,
    fontSize: 18,
    padding: spacing.medium,
    color: colors.textSecondary,
  },
  emptyText: {
    ...typography.body,
    textAlign: 'center',
    color: colors.textSecondary,
    padding: spacing.medium,
  },
  // --- NOVOS ESTILOS ---
  selectedCard: {
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
    fontWeight: 'bold',
    marginBottom: spacing.medium,
  },
  commentInput: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: spacing.small,
    padding: spacing.small,
    fontSize: 14,
    marginBottom: spacing.medium,
  },
  reorderButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  // --- FIM DOS NOVOS ESTILOS ---
  saveButtonContainer: {
    padding: spacing.medium,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
  },
});