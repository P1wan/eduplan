// Local: Mobile/eduplan/screens/ProfileScreen/ProfileScreen.styles.js

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
  userInfoSection: {
    alignItems: 'center',
    paddingVertical: spacing.large,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
  },
  currentAvatar: {
    fontSize: 64,
    marginBottom: spacing.small,
  },
  userName: {
    ...typography.h1,
    fontSize: 22,
  },
  userEmail: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.small,
  },
  backupButtonContainer: { // Estilo para o botão de backup
    marginTop: spacing.large, // Espaço acima do botão
    width: '80%', // Largura do botão
    minHeight: 40, // Altura mínima para caber o ActivityIndicator
    justifyContent: 'center', // Centraliza o ActivityIndicator
  },
  sectionTitle: {
    ...typography.h1,
    fontSize: 18,
    color: colors.textSecondary,
    paddingHorizontal: spacing.medium,
    paddingTop: spacing.large,
    paddingBottom: spacing.small,
  },
  listContainer: {
    paddingHorizontal: spacing.medium,
    paddingBottom: spacing.medium, // Espaço abaixo da lista de avatares
  },
  avatarGrid: {
    justifyContent: 'space-around',
  },
  avatarOption: {
    padding: spacing.medium,
    margin: spacing.small / 2,
    borderRadius: spacing.small,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  avatarSelected: {
    borderColor: colors.primary,
    backgroundColor: '#E7F0FE',
  },
  avatarText: {
    fontSize: 40,
  },
  saveButtonContainer: {
    padding: spacing.medium,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: spacing.medium,
    borderRadius: spacing.small,
    alignItems: 'center',
  },
  saveButtonText: {
    ...typography.body,
    color: colors.white,
    fontWeight: 'bold',
  },
});