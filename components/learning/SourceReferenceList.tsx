import { Link } from 'expo-router';
import type { Href } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import type { SourceReference } from '@/types/learning';

export function SourceReferenceList({ references }: { references: SourceReference[] }) {
  const colors = Colors[useColorScheme()];
  const uniqueReferences = references.filter((reference, index) => references.findIndex((item) => item.id === reference.id) === index);
  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.heading, { color: colors.text }]}>Fontes para consulta</Text>
      {uniqueReferences.map((reference) => (
        <View key={reference.id} style={styles.item}>
          <Text style={[styles.title, { color: colors.text }]}>{reference.title}</Text>
          <Text style={[styles.detail, { color: colors.tabIconDefault }]}>
            {reference.publisher}{reference.locator ? ` · ${reference.locator}` : ''}
          </Text>
          <Link href={reference.url as Href} target="_blank" style={[styles.link, { color: colors.tint }]}>Consultar fonte oficial</Link>
        </View>
      ))}
      {uniqueReferences[0] ? (
        <Text style={[styles.verified, { color: colors.tabIconDefault }]}>
          Conferido em {new Date(`${uniqueReferences[0].verifiedAt}T12:00:00`).toLocaleDateString('pt-BR')}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, borderWidth: 1, gap: 12, padding: 16 },
  heading: { fontSize: 16, fontWeight: '800' },
  item: { gap: 3 },
  title: { fontSize: 14, fontWeight: '700', lineHeight: 20 },
  detail: { fontSize: 13, lineHeight: 19 },
  link: { fontSize: 14, fontWeight: '700', marginTop: 2 },
  verified: { fontSize: 12, marginTop: 2 },
});
