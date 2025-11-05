// Local: Mobile/eduplan/screens/DashboardScreen/DashboardScreen.styles.js

import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.large, // Voltamos ao espaçamento original
    paddingVertical: spacing.medium,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    ...typography.body,
    color: colors.textSecondary,
  },
  userName: {
    ...typography.h1,
    fontSize: 28,
  },
  // --- ESTILOS ATUALIZADOS/NOVOS ---
  avatarButton: { // Estilo para o TouchableOpacity do avatar
    padding: spacing.small, // Adiciona uma pequena área de toque extra
    borderRadius: 50, // Faz a área de toque parecer circular
    // Pode adicionar um fundo se quiser destacar mais
    // backgroundColor: colors.border,
  },
  avatarDisplay: {
    fontSize: 40, // Tamanho do emoji/avatar
  },
  // --- FIM DOS ESTILOS ---
  shortcutsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.large,
    marginTop: spacing.small,
    gap: spacing.medium,
  },
  shortcutButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: spacing.small,
    padding: spacing.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shortcutText: {
    ...typography.body,
    color: colors.white,
    fontWeight: 'bold',
    marginTop: spacing.small,
  },
  sectionTitle: {
    ...typography.h1,
    fontSize: 20,
    paddingHorizontal: spacing.large,
    marginTop: spacing.large,
    marginBottom: spacing.medium,
  },
  carouselCard: {
    backgroundColor: colors.white,
    borderRadius: spacing.small,
    padding: spacing.medium,
    width: 150,
    height: 120,
    marginRight: spacing.medium,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
  },
  carouselCardTitle: {
    ...typography.body,
    fontWeight: 'bold',
  },
  carouselCardSubtitle: {
    ...typography.caption,
  },
  emptyCarouselText: {
    ...typography.body,
    color: colors.textSecondary,
    paddingLeft: spacing.large, // Mantido para alinhar com o início do carrossel
  },
  calendarContainer: {
    marginHorizontal: spacing.large,
    marginBottom: spacing.large,
    borderRadius: spacing.small,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  upcomingCard: {
    backgroundColor: colors.white,
    borderRadius: spacing.small,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    marginBottom: spacing.small,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  upcomingDate: {
    ...typography.caption,
    fontWeight: 'bold',
    color: colors.primary,
    marginRight: spacing.medium,
  },
  upcomingTitle: {
    ...typography.body,
    flex: 1,
  },
  emptyUpcomingText: {
    ...typography.body,
    color: colors.textSecondary,
    paddingHorizontal: spacing.large,
    paddingBottom: spacing.large,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    minHeight: 300, // Dá uma altura mínima para o loading ser visível
    alignItems: 'center',
    justifyContent: 'center',
  },
});