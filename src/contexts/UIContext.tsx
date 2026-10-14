import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { Station } from '../types';

interface UIContextValue {
  isSidebarOpen: boolean;
  isTimeControllerExpanded: boolean;
  timetableStation: Station | null;
  isTimetableOpen: boolean;
  isSettingsOpen: boolean;
  isHelpOpen: boolean;
  isInstallOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  toggleTimeControllerExpanded: () => void;
  openTimetable: (station: Station) => void;
  closeTimetable: () => void;
  setTimetableStation: (station: Station | null) => void;
  openSettings: () => void;
  closeSettings: () => void;
  openHelp: () => void;
  closeHelp: () => void;
  openInstall: () => void;
  closeInstall: () => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTimeControllerExpanded, setIsTimeControllerExpanded] = useState(false);
  const [timetableStation, setTimetableStation] = useState<Station | null>(null);
  const [isTimetableOpen, setIsTimetableOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isInstallOpen, setIsInstallOpen] = useState(false);

  const openSidebar = useCallback(() => setIsSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);
  const toggleSidebar = useCallback(() => setIsSidebarOpen((prev) => !prev), []);
  const toggleTimeControllerExpanded = useCallback(() => setIsTimeControllerExpanded((prev) => !prev), []);

  const openTimetable = useCallback((station: Station) => {
    setTimetableStation(station);
    setIsTimetableOpen(true);
  }, []);
  const closeTimetable = useCallback(() => setIsTimetableOpen(false), []);

  const openSettings = useCallback(() => setIsSettingsOpen(true), []);
  const closeSettings = useCallback(() => setIsSettingsOpen(false), []);

  const openHelp = useCallback(() => setIsHelpOpen(true), []);
  const closeHelp = useCallback(() => setIsHelpOpen(false), []);

  const openInstall = useCallback(() => setIsInstallOpen(true), []);
  const closeInstall = useCallback(() => setIsInstallOpen(false), []);

  const value = useMemo(
    () => ({
      isSidebarOpen,
      isTimeControllerExpanded,
      timetableStation,
      isTimetableOpen,
      isSettingsOpen,
      isHelpOpen,
      isInstallOpen,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      toggleTimeControllerExpanded,
      openTimetable,
      closeTimetable,
      setTimetableStation,
      openSettings,
      closeSettings,
      openHelp,
      closeHelp,
      openInstall,
      closeInstall,
    }),
    [
      isSidebarOpen,
      isTimeControllerExpanded,
      timetableStation,
      isTimetableOpen,
      isSettingsOpen,
      isHelpOpen,
      isInstallOpen,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      toggleTimeControllerExpanded,
      openTimetable,
      closeTimetable,
      openSettings,
      closeSettings,
      openHelp,
      closeHelp,
      openInstall,
      closeInstall,
    ]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export function useUI(): UIContextValue {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
