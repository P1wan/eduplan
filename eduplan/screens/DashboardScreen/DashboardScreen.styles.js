// Local: Mobile/eduplan/screens/DashboardScreen/DashboardScreen.styles.js

import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.large,
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
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  shortcutsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.large,
    marginTop: spacing.small,
    // --- INÍCIO DA CORREÇÃO DO ALINHAMENTO ---
    gap: spacing.medium,
    // --- FIM DA CORREÇÃO DO ALINHAMENTO ---
  },
  shortcutButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: spacing.small,
    padding: spacing.medium,
    // marginRight: spacing.medium, // Esta linha foi removida
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
    paddingLeft: spacing.large,
  },
  calendarContainer: {
    marginHorizontal: spacing.large,
    marginBottom: spacing.large,
    borderRadius: spacing.small,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
});