import React, { createContext, useState, ReactNode, useContext } from 'react';

interface BioDataContextProps {
  biodataId: number | null;
  setBiodataId: (id: number) => void;
}

const BioDataContext = createContext<BioDataContextProps>({
  biodataId: null,
  setBiodataId: () => {},
});

export const BioDataProvider = ({ children }: { children: ReactNode }) => {
  const [biodataId, setBiodataId] = useState<number | null>(null);

  return (
    <BioDataContext.Provider value={{ biodataId, setBiodataId }}>
      {children}
    </BioDataContext.Provider>
  );
};

export const useBioDataContext = () => useContext(BioDataContext);
