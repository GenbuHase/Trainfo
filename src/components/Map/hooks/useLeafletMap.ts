import { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import '../smoothWheelZoom';
import type { LineId } from '../../../types';
import { calculateBoundsForLines } from '../../../data/linesRegistry';

export type TileType = 'standard' | 'satellite' | 'dark';

interface UseLeafletMapOptions {
  selectedLineIds: LineId[];
  isSidebarOpen?: boolean;
  onCloseSidebar?: () => void;
  onMapDrag?: () => void;
}

export function useLeafletMap({
  selectedLineIds,
  isSidebarOpen = false,
  onCloseSidebar,
  onMapDrag,
}: UseLeafletMapOptions) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const stationLayerRef = useRef<L.LayerGroup | null>(null);
  const trainLayerRef = useRef<L.LayerGroup | null>(null);
  const polylineLayerRef = useRef<L.LayerGroup | null>(null);
  const locationLayerRef = useRef<L.LayerGroup | null>(null);

  const [tileType, setTileType] = useState<TileType>('standard');
  const [showLayerMenu, setShowLayerMenu] = useState(false);

  // CARTO APIキー（設定されている場合はCARTO Dark Matter、未設定時はOSMにCSSダークフィルターを適用）
  const cartoApiKey = (import.meta.env.VITE_CARTO_API_KEY as string | undefined)?.trim();

  // 地図タイルのURLマッピング
  const tileUrls = useMemo<Record<TileType, { url: string; attribution: string }>>(() => ({
    standard: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri',
    },
    dark: {
      url: cartoApiKey
        ? `https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png?key=${cartoApiKey}`
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: cartoApiKey
        ? '&copy; OpenStreetMap contributors &copy; CARTO'
        : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  }), [cartoApiKey]);

  // 地図の初期化
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const initialBounds = calculateBoundsForLines(selectedLineIds);

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      scrollWheelZoom: false,
      smoothWheelZoom: true,
      smoothSensitivity: 2.5,
      zoomSnap: 0,
      zoomDelta: 0.5,
      fadeAnimation: false, // タイルのフェードアニメーションによるモバイルでの白抜け・白フラッシュを防止
      preferCanvas: true,   // ベクター描画にCanvasを利用してDOMノード数を節約
    });

    map.fitBounds(initialBounds, { padding: [40, 40] });

    const tile = L.tileLayer(tileUrls.standard.url, {
      attribution: tileUrls.standard.attribution,
      maxZoom: 19,
    }).addTo(map);

    tileLayerRef.current = tile;
    polylineLayerRef.current = L.layerGroup().addTo(map);
    stationLayerRef.current = L.layerGroup().addTo(map);
    trainLayerRef.current = L.layerGroup().addTo(map);
    locationLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    // 地図背景クリックでサイドバーを閉じる
    map.on('click', () => {
      onCloseSidebar?.();
    });

    // 地図ドラッグ操作
    map.on('dragstart', () => {
      onMapDrag?.();
    });

    // リサイズ監視（デバウンスしてアニメーション中の連続invalidateSizeによる白化フリーズを防止）
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const resizeObserver = new ResizeObserver(() => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        map.invalidateSize();
      }, 150);
    });
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      polylineLayerRef.current?.clearLayers();
      stationLayerRef.current?.clearLayers();
      trainLayerRef.current?.clearLayers();
      locationLayerRef.current?.clearLayers();
      map.remove();
      mapRef.current = null;
      polylineLayerRef.current = null;
      stationLayerRef.current = null;
      trainLayerRef.current = null;
      locationLayerRef.current = null;
    };
  }, []);

  // サイドバー開閉時の地図サイズ追従
  useEffect(() => {
    if (!mapRef.current) return;
    const timer = setTimeout(() => {
      mapRef.current?.invalidateSize();
    }, 320);
    return () => clearTimeout(timer);
  }, [isSidebarOpen]);

  // タイル切り替え
  useEffect(() => {
    if (!mapRef.current || !tileLayerRef.current) return;
    const currentTile = tileUrls[tileType];
    tileLayerRef.current.setUrl(currentTile.url);

    if (mapRef.current.attributionControl) {
      const control = mapRef.current.attributionControl;
      Object.values(tileUrls).forEach((t) => control.removeAttribution(t.attribution));
      control.addAttribution(currentTile.attribution);
    }
  }, [tileType, tileUrls]);

  return {
    mapContainerRef,
    mapRef,
    stationLayerRef,
    trainLayerRef,
    polylineLayerRef,
    locationLayerRef,
    tileType,
    setTileType,
    showLayerMenu,
    setShowLayerMenu,
    tileUrls,
  };
}
