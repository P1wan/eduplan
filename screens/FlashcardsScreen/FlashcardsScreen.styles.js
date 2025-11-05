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
  creationForm: {
    padding: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
  },
  label: {
    ...typography.body,
    fontWeight: 'bold',
    marginBottom: spacing.small,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.small,
    padding: spacing.medium,
    fontSize: 16,
    marginBottom: spacing.medium,
  },
  listHeader: {
    ...typography.h1,
    fontSize: 16,
    color: colors.textSecondary,
    padding: spacing.medium,
    paddingBottom: spacing.small,
  },
  cardListItem: {
    backgroundColor: colors.white,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  emptyListText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    padding: spacing.medium,
  },
  startButtonContainer: {
    padding: spacing.medium,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
  },
  // Estilos para o Modo de Estudo
  studyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.large,
  },
  cardDisplay: {
    backgroundColor: colors.white,
    width: '100%',
    aspectRatio: 1.6, // Proporção comum de flashcards
    borderRadius: spacing.medium,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.large,
    marginBottom: spacing.xlarge,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardText: {
    ...typography.h1,
    fontSize: 24,
    textAlign: 'center',
  },
  flipIndicator: {
    ...typography.caption,
    position: 'absolute',
    bottom: spacing.small,
    right: spacing.small,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});