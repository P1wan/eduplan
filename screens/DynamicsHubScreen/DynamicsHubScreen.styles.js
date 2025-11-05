import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  title: {
    ...typography.h1,
    fontSize: 24,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: spacing.medium,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: spacing.small,
    padding: spacing.medium,
    width: '45%', // Aproximadamente metade da tela, com espaço entre eles
    aspectRatio: 1, // Para manter o card quadrado
    marginBottom: spacing.medium,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2, // Sombra Android
    shadowColor: '#000', // Sombra iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  cardTitle: {
    ...typography.h1,
    fontSize: 18,
    marginTop: spacing.small,
    textAlign: 'center',
  },
  cardDescription: {
    ...typography.caption,
    textAlign: 'center',
    marginTop: spacing.small,
  },
});