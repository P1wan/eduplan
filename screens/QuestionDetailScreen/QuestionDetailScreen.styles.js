// Local: Mobile/eduplan/screens/QuestionDetailScreen/QuestionDetailScreen.styles.js

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
  contentContainer: {
    padding: spacing.medium,
  },
  label: {
    ...typography.h1,
    fontSize: 18,
    color: colors.textSecondary,
    marginTop: spacing.large,
    marginBottom: spacing.small,
  },
  enunciado: {
    ...typography.body,
    fontSize: 18,
    lineHeight: 24,
  },
  alternativa: {
    ...typography.body,
    fontSize: 16,
    backgroundColor: colors.white,
    padding: spacing.medium,
    borderRadius: spacing.small,
    marginBottom: spacing.small,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resposta: {
    ...typography.body,
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#E8F5E9',
    color: colors.success,
    padding: spacing.medium,
    borderRadius: spacing.small,
  },
  // --- NOVO ESTILO ADICIONADO ---
  metadataText: {
    ...typography.body,
    fontSize: 16,
    backgroundColor: colors.white,
    padding: spacing.medium,
    borderRadius: spacing.small,
    borderWidth: 1,
    borderColor: colors.border,
  },
  // --- FIM DO NOVO ESTILO ---
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xlarge,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: spacing.small,
  },
});