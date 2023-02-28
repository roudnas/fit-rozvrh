import { VictimContext } from '../contexts/VictimContext';
import { useContext } from 'react';

export default function useVictim() {
  const context = useContext(VictimContext);

  if (context === undefined) {
    throw new Error('useVictim must be used within a <VictimProvider>!');
  }

  return context;
}