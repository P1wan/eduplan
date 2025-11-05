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
  content: {
    flexGrow: 1,
    alignItems: 'center',
    padding: spacing.large,
  },
  selectorContainer: {
    marginBottom: spacing.xlarge,
    alignItems: 'center',
  },
  label: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.medium,
  },
  selectorControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    paddingHorizontal: spacing.medium,
  },
  numberOfDiceText: {
    ...typography.h1,
    fontSize: 32,
    marginHorizontal: spacing.medium,
    minWidth: 40, // Largura mínima para evitar que o layout "pule"
    textAlign: 'center',
  },
  diceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permite que os dados quebrem a linha
    justifyContent: 'center',
    marginBottom: spacing.xlarge,
    minHeight: 80, // Altura mínima para evitar "pulos"
  },
  diceIcon: {
    margin: spacing.small,
  },
  rollButtonContainer: {
    width: '80%',
    marginBottom: spacing.xlarge,
  },
  resultsContainer: {
    alignItems: 'center',
    padding: spacing.medium,
    backgroundColor: colors.white,
    borderRadius: spacing.small,
    borderWidth: 1,
    borderColor: colors.border,
    width: '100%',
  },
  resultsText: {
    ...typography.body,
    fontSize: 18,
    marginBottom: spacing.small,
  },
  totalText: {
    ...typography.h1,
    fontSize: 24,
  },
});