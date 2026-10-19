"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import type { Map as LeafletMap, Marker } from "leaflet";

const DEFAULT_LOC = { lat: 7.867931, lng: 125.14557, label: "Valencia City, Bukidnon" };

type LocationData = { lat: number; lng: number; label: string };
type SearchResult = { lat: string; lon: string; display_name: string };

// Rendered with ssr: false (see contact-section.tsx), so browser APIs are safe here.
export function LocationMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<LeafletMap | null>(null);
  const markerInstance = useRef<Marker | null>(null);
  const [location, setLocation] = useState<LocationData>(DEFAULT_LOC);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateMap = useCallback((lat: number, lng: number, label: string) => {
    import("leaflet").then((L) => {
      import("leaflet/dist/leaflet.css");

      // Pin follows the theme's accent color instead of a hard-coded blue.
      const pinIcon = L.divIcon({
        className: "",
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42" fill="none">
          <path d="M16 0C7.16 0 0 7.16 0 16c0 12 16 26 16 26s16-14 16-26C32 7.16 24.84 0 16 0z" fill="var(--primary)"/>
          <circle cx="16" cy="16" r="7" fill="var(--background)"/>
        </svg>`,
        iconSize: [32, 42],
        iconAnchor: [16, 42],
        popupAnchor: [0, -42],
      });

      // Search results come from a third-party API, so set the label as text, never HTML.
      const popupContent = document.createElement("span");
      popupContent.style.fontSize = "13px";
      popupContent.textContent = label;

      if (mapInstance.current) {
        mapInstance.current.setView([lat, lng], 13);
        if (markerInstance.current) {
          markerInstance.current.setLatLng([lat, lng]);
        } else {
          markerInstance.current = L.marker([lat, lng], { icon: pinIcon }).addTo(mapInstance.current);
        }
        markerInstance.current.bindPopup(popupContent).openPopup();
        return;
      }

      const container = mapRef.current;
      if (!container) return;

      // scrollWheelZoom off: otherwise scrolling down the page gets trapped zooming the map.
      const map = L.map(container, { zoomControl: true, scrollWheelZoom: false }).setView([lat, lng], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      markerInstance.current = L.marker([lat, lng], { icon: pinIcon })
        .addTo(map)
        .bindPopup(popupContent)
        .openPopup();

      mapInstance.current = map;
      requestAnimationFrame(() => map.invalidateSize());
    });
  }, []);

  // Move the existing map when the location changes instead of rebuilding it.
  useEffect(() => {
    updateMap(location.lat, location.lng, location.label);
  }, [location, updateMap]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      mapInstance.current?.remove();
      mapInstance.current = null;
      markerInstance.current = null;
    };
  }, []);

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

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search city or place..."
          className="w-full rounded-md border border-border bg-transparent px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-foreground/50 focus:outline-none transition-all"
        />
        {searching && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground/20 border-t-primary" />
          </div>
        )}
        {results.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-md border border-border bg-card shadow-xl">
            {results.map((r, i) => (
              <button
                key={i}
                onClick={() => selectResult(r)}
                className="w-full px-4 py-2.5 text-left text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {r.display_name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div ref={mapRef} className="h-[280px] w-full overflow-hidden rounded-lg border border-border" style={{ zIndex: 0 }} />
    </div>
  );
}
