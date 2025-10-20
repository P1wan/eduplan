import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.large,
  },
  backButton: {
    position: 'absolute',
    top: spacing.large,
    left: spacing.large,
  },
  title: {
    ...typography.h1,
    textAlign: 'center',
    marginBottom: spacing.medium,
  },
  instructions: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xlarge,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.small,
    padding: spacing.medium,
    fontSize: 16,
    marginBottom: spacing.large,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    padding: spacing.medium,
    borderRadius: spacing.small,
    alignItems: 'center',
  },
  buttonText: {
    ...typography.body,
    color: colors.white,
    fontWeight: 'bold',
  },
});