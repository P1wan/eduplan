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
  headerTitle: { ...typography.h1, fontSize: 20 },
  content: { padding: spacing.medium },
  label: { ...typography.body, fontWeight: 'bold', marginBottom: spacing.medium },
  textArea: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.small,
    padding: spacing.medium,
    fontSize: 16,
    height: 200,
    textAlignVertical: 'top',
    marginBottom: spacing.large,
  },
  resultContainer: {
    marginTop: spacing.xlarge,
    alignItems: 'center',
    padding: spacing.medium,
    backgroundColor: '#E8F5E9',
    borderRadius: spacing.small,
  },
  resultLabel: { ...typography.body, color: colors.textSecondary },
  resultText: { ...typography.h1, color: colors.success, marginTop: spacing.small },
});