import { createContext, useContext, useState, ReactNode } from 'react';

interface DemoContextType {
  isDemo: boolean;
  setIsDemo: (value: boolean) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [isDemo, setIsDemo] = useState(false);

  return (
    <DemoContext.Provider value={{ isDemo, setIsDemo }}>
      {children}
      {isDemo && (
        <div className="fixed bottom-0 left-0 right-0 bg-green-600 text-white py-2 px-4 text-center z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <span className="animate-pulse">●</span>
            <span>Demo Mode Active - Explore all features without restrictions</span>
            <span className="animate-pulse">●</span>
          </div>
        </div>
      )}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
}
