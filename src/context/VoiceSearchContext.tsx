'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import VoiceSearchModal from '@/components/VoiceSearchModal';

interface VoiceSearchContextType {
  openModal: () => void;
}

const VoiceSearchContext = createContext<VoiceSearchContextType | undefined>(undefined);

export const VoiceSearchProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <VoiceSearchContext.Provider value={{ openModal }}>
      {children}
      <VoiceSearchModal isOpen={isModalOpen} onClose={closeModal} />
    </VoiceSearchContext.Provider>
  );
};

export const useVoiceSearch = () => {
  const context = useContext(VoiceSearchContext);
  if (!context) {
    throw new Error('useVoiceSearch must be used within a VoiceSearchProvider');
  }
  return context;
};
