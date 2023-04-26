import { useContext } from 'react';

import { VictimContext } from '../contexts/VictimContext';

export default function useVictim() {
    const context = useContext(VictimContext);

    if (context === undefined) {
        throw new Error('useVictim must be used within a <VictimProvider>!');
    }

    return context;
}