import { VStack, Text } from 'native-base';
import { ScreenHeader } from '@components/ScreenHeader';

export function History() {
  return (
    <VStack flex={1}>
      <ScreenHeader title='Histórico de exercícios'/>
    </VStack>
  )
}