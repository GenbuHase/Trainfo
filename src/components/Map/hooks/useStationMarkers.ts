import { useEffect } from 'react';
import L from 'leaflet';
import type { Station, LineId } from '../../../types';
import { getStations } from '../../../data/stations';
import { getLine } from '../../../data/linesRegistry';

interface UseStationMarkersOptions {
  mapRef: React.RefObject<L.Map | null>;
  stationLayerRef: React.RefObject<L.LayerGroup | null>;
  selectedLineIds: LineId[];
  selectedStation: Station | null;
  onSelectStation: (station: Station) => void;
}

export function useStationMarkers({
  mapRef,
  stationLayerRef,
  selectedLineIds,
  selectedStation,
  onSelectStation,
}: UseStationMarkersOptions) {
  useEffect(() => {
    if (!mapRef.current || !stationLayerRef.current) return;
    stationLayerRef.current.clearLayers();

    const stations = getStations(selectedLineIds);

    stations.forEach((st) => {
      const isSelected = selectedStation?.id === st.id;
      const isMajor = st.isMajor ?? false;

      const line = getLine(st.lineId);
      const stationColor = line?.lineColor || '#004b97';
      const accentColor = line?.accentColor || '#ed6d00';

      const html = `
        <div class="relative group cursor-pointer flex flex-col items-center">
          <div class="w-4 h-4 rounded-full border-2 ${
            isSelected
              ? 'border-white ring-4 scale-125'
              : isMajor
              ? 'border-white shadow-md'
              : 'bg-white shadow-xs'
          } transition-all" style="
            background-color: ${isSelected ? accentColor : (isMajor ? stationColor : '#ffffff')};
            border-color: ${isSelected ? '#ffffff' : (isMajor ? '#ffffff' : stationColor)};
            box-shadow: ${isSelected ? `0 0 10px ${accentColor}` : 'none'};
          "></div>
          <div class="absolute top-4 pointer-events-none whitespace-nowrap bg-white/95 backdrop-blur-xs px-1.5 py-0.5 rounded shadow-sm border border-slate-200 text-[11px] font-bold text-slate-800 transition-opacity flex items-center gap-1 ${
            isMajor || isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }">
            <span class="font-mono text-[9px] px-1 py-0.2 rounded text-white font-semibold" style="background-color: ${stationColor}">${st.id.replace('-', '')}</span>
            <span>${st.name}</span>
          </div>
        </div>
      `;

      const icon = L.divIcon({
        className: 'station-div-icon',
        html,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      const marker = L.marker([st.lat, st.lng], {
        icon,
        zIndexOffset: isSelected ? 1000 : 0,
      });

      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        onSelectStation(st);
        mapRef.current?.panTo([st.lat, st.lng], { animate: true });
      });

      stationLayerRef.current?.addLayer(marker);
    });
  }, [mapRef, stationLayerRef, selectedLineIds, selectedStation, onSelectStation]);
}
