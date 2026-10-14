import { useState, useRef, useEffect, useCallback } from 'react';
import L from 'leaflet';

interface UseGeolocationOptions {
  mapRef: React.RefObject<L.Map | null>;
  locationLayerRef: React.RefObject<L.LayerGroup | null>;
  onStopTracking?: () => void;
}

export function useGeolocation({
  mapRef,
  locationLayerRef,
  onStopTracking,
}: UseGeolocationOptions) {
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number; accuracy: number } | null>(null);
  const [isTrackingLocation, setIsTrackingLocation] = useState<boolean>(false);
  const [locationErrorMessage, setLocationErrorMessage] = useState<string | null>(null);

  const locationWatchIdRef = useRef<number | null>(null);
  const errorTimeoutRef = useRef<number | null>(null);

  // エラー通知トースト表示ヘルパー
  const showLocationError = useCallback((msg: string) => {
    setLocationErrorMessage(msg);
    if (errorTimeoutRef.current !== null) {
      window.clearTimeout(errorTimeoutRef.current);
    }
    errorTimeoutRef.current = window.setTimeout(() => {
      setLocationErrorMessage(null);
    }, 4000);
  }, []);

  // 現在地マーカーと測位精度円の描画更新
  useEffect(() => {
    if (!locationLayerRef.current) return;
    locationLayerRef.current.clearLayers();

    if (!currentLocation) return;

    // 測位精度を表す円
    const circle = L.circle([currentLocation.lat, currentLocation.lng], {
      radius: currentLocation.accuracy,
      color: '#3b82f6',
      fillColor: '#3b82f6',
      fillOpacity: 0.12,
      weight: 1,
      interactive: false,
    });

    // 現在地パルスマーカー
    const markerIcon = L.divIcon({
      className: 'current-location-marker',
      html: `
        <div class="relative flex items-center justify-center w-6 h-6 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <span class="absolute w-6 h-6 rounded-full bg-blue-500 opacity-60 animate-ping"></span>
          <span class="relative w-3.5 h-3.5 bg-blue-600 rounded-full border-2 border-white shadow-md"></span>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0],
    });

    const marker = L.marker([currentLocation.lat, currentLocation.lng], {
      icon: markerIcon,
      interactive: false,
      zIndexOffset: 1000,
    });

    locationLayerRef.current.addLayer(circle);
    locationLayerRef.current.addLayer(marker);
  }, [locationLayerRef, currentLocation]);

  // バックグラウンドでの位置情報監視（移動に合わせてマーカーを更新）
  useEffect(() => {
    if (!currentLocation || !navigator.geolocation) return;

    if (locationWatchIdRef.current === null) {
      locationWatchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude, accuracy } = pos.coords;
          setCurrentLocation({ lat: latitude, lng: longitude, accuracy });
        },
        () => {
          // バックグラウンド監視中のエラーはサイレントに処理
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
        }
      );
    }
  }, [currentLocation]);

  // 現在地追従モード時の地図センタリング
  useEffect(() => {
    if (!isTrackingLocation || !currentLocation || !mapRef.current) return;
    mapRef.current.panTo([currentLocation.lat, currentLocation.lng], { animate: true, duration: 0.5 });
  }, [mapRef, isTrackingLocation, currentLocation]);

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (locationWatchIdRef.current !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(locationWatchIdRef.current);
        locationWatchIdRef.current = null;
      }
      if (errorTimeoutRef.current !== null) {
        window.clearTimeout(errorTimeoutRef.current);
      }
    };
  }, []);

  // 現在地取得 / 追従トグルハンドラ
  const handleToggleLocation = useCallback(() => {
    if (!navigator.geolocation) {
      showLocationError('お使いのブラウザは位置情報取得に対応していません');
      return;
    }

    // 列車追跡モードが有効なら解除
    onStopTracking?.();

    // 既に位置情報があり、追従が無効の場合は追従を再開してフォーカス
    if (currentLocation && !isTrackingLocation) {
      mapRef.current?.flyTo([currentLocation.lat, currentLocation.lng], Math.max(mapRef.current.getZoom(), 15), {
        duration: 0.8,
      });
      setIsTrackingLocation(true);
      return;
    }

    // 既に追従中の場合は追従を解除（マーカー表示は維持）
    if (currentLocation && isTrackingLocation) {
      setIsTrackingLocation(false);
      return;
    }

    // 初回取得
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setCurrentLocation({ lat: latitude, lng: longitude, accuracy });
        setIsLocating(false);
        setIsTrackingLocation(true);

        mapRef.current?.flyTo([latitude, longitude], Math.max(mapRef.current?.getZoom() || 13, 15), {
          duration: 1.0,
        });
      },
      (err) => {
        setIsLocating(false);
        setIsTrackingLocation(false);
        let errorMsg = '現在地の取得に失敗しました';
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMsg = '位置情報の利用が許可されていません。ブラウザ設定を確認してください';
            break;
          case err.POSITION_UNAVAILABLE:
            errorMsg = '位置情報を特定できませんでした';
            break;
          case err.TIMEOUT:
            errorMsg = '位置情報の取得がタイムアウトしました';
            break;
        }
        showLocationError(errorMsg);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, [mapRef, currentLocation, isTrackingLocation, onStopTracking, showLocationError]);

  const handleMapDrag = useCallback(() => {
    setIsTrackingLocation(false);
  }, []);

  return {
    isLocating,
    currentLocation,
    isTrackingLocation,
    locationErrorMessage,
    handleToggleLocation,
    handleMapDrag,
  };
}
