import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    alignItems: 'center',
    padding: spacing.large,
    backgroundColor: colors.primary,
  },

  title: {
    ...typography.h1,
    color: colors.white,
    fontSize: 28,
  },

  subtitle: {
    ...typography.body,
    color: colors.white,
    opacity: 0.9,
    marginTop: spacing.small,
  },

  content: {
    flex: 1,
    padding: spacing.large,
  },

  welcomeText: {
    ...typography.h2,
    textAlign: 'center',
    marginBottom: spacing.xlarge,
    color: colors.text,
  },

  menuContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  menuButton: {
    backgroundColor: colors.white,
    borderRadius: spacing.medium,
    padding: spacing.large,
    marginBottom: spacing.large,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },

  menuButtonText: {
    ...typography.h2,
    color: colors.primary,
    marginBottom: spacing.small,
  },

  menuButtonSubtext: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 20,
  },

  footer: {
    padding: spacing.large,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  logoutButton: {
    backgroundColor: colors.error || '#dc3545',
    padding: spacing.medium,
    borderRadius: spacing.small,
    alignItems: 'center',
  },

  logoutButtonText: {
    ...typography.body,
    color: colors.white,
    fontWeight: 'bold',
  },
});
