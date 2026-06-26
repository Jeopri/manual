"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const DEFAULT_LOC = { lat: 7.867931, lng: 125.14557, label: "Valencia City, Bukidnon" };

type LocationData = { lat: number; lng: number; label: string };
type SearchResult = { lat: string; lon: string; display_name: string };

export function LocationMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markerInstance = useRef<any>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [ready, setReady] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const debounceRef = useRef<any>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude, label: "Current Location" });
          setReady(true);
        },
        () => {
          setLocation(DEFAULT_LOC);
          setReady(true);
        },
        { timeout: 6000, enableHighAccuracy: false },
      );
    } else {
      setLocation(DEFAULT_LOC);
      setReady(true);
    }
  }, []);

  const updateMap = useCallback((lat: number, lng: number, label: string) => {
    import("leaflet").then((L) => {
      import("leaflet/dist/leaflet.css");

      const pinIcon = L.divIcon({
        className: "",
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42" fill="none">
          <path d="M16 0C7.16 0 0 7.16 0 16c0 12 16 26 16 26s16-14 16-26C32 7.16 24.84 0 16 0z" fill="#3b82f6"/>
          <circle cx="16" cy="16" r="7" fill="#fff"/>
        </svg>`,
        iconSize: [32, 42],
        iconAnchor: [16, 42],
        popupAnchor: [0, -42],
      });

      if (mapInstance.current) {
        mapInstance.current.setView([lat, lng], 13);
        if (markerInstance.current) {
          markerInstance.current.setLatLng([lat, lng]);
        } else {
          markerInstance.current = L.marker([lat, lng], { icon: pinIcon }).addTo(mapInstance.current);
        }
        markerInstance.current.bindPopup(`<span style="color:#111;font-size:13px">${label}</span>`).openPopup();
        return;
      }

      const container = mapRef.current;
      if (!container) return;

      const map = L.map(container, { zoomControl: true, scrollWheelZoom: true }).setView([lat, lng], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      markerInstance.current = L.marker([lat, lng], { icon: pinIcon })
        .addTo(map)
        .bindPopup(`<span style="color:#111;font-size:13px">${label}</span>`)
        .openPopup();

      mapInstance.current = map;
      requestAnimationFrame(() => map.invalidateSize());
    });
  }, []);

  useEffect(() => {
    if (!ready || !location) return;
    updateMap(location.lat, location.lng, location.label);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
        markerInstance.current = null;
      }
    };
  }, [ready, location, updateMap]);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!value.trim()) { setResults([]); return; }

    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(value)}&format=json&limit=5`,
          { headers: { "Accept-Language": "en" } },
        );
        setResults(await res.json());
      } catch { setResults([]); } finally { setSearching(false); }
    }, 400);
  }, []);

  const selectResult = (r: SearchResult) => {
    const lat = parseFloat(r.lat);
    const lng = parseFloat(r.lon);
    setLocation({ lat, lng, label: r.display_name.split(",")[0] });
    setQuery(r.display_name.split(",")[0]);
    setResults([]);
  };

  if (!ready) {
    return (
      <div className="flex h-full min-h-[280px] items-center justify-center rounded-xl bg-card">
        <div className="flex flex-col items-center gap-2">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-muted-foreground/20 border-t-primary" />
          <p className="text-xs text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search city or place..."
          className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/40 focus:bg-card/80 focus:outline-none transition-all"
        />
        {searching && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground/20 border-t-primary" />
          </div>
        )}
        {results.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-lg border border-border bg-card shadow-xl">
            {results.map((r, i) => (
              <button
                key={i}
                onClick={() => selectResult(r)}
                className="w-full px-4 py-2.5 text-left text-xs text-muted-foreground transition-colors hover:bg-primary/[0.04] hover:text-foreground"
              >
                {r.display_name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div ref={mapRef} className="h-full min-h-[280px] w-full rounded-xl" style={{ zIndex: 0 }} />
    </div>
  );
}
