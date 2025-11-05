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
  },
  modeSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: spacing.medium,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modeButton: {
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.large,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
    marginHorizontal: spacing.small,
  },
  modeButtonActive: {
    backgroundColor: colors.primary,
  },
  modeText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: 'bold',
  },
  modeTextActive: {
    color: colors.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.large,
  },
  inputContainer: {
    width: '80%',
    marginBottom: spacing.xlarge,
  },
  label: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.small,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.small,
    padding: spacing.medium,
    fontSize: 18,
    textAlign: 'center',
  },
  timeDisplay: {
    fontSize: 72,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xlarge,
    fontVariant: ['tabular-nums'], // Garante que os números não "pulem"
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
});