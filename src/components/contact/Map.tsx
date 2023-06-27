'use client'

import { useRef, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
// const mapboxgl = require('!mapbox-gl');

function Map() {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? '';
    const mapContainer = useRef<any>(null);
    const map: any = useRef(null);
    const [lng, setLng] = useState(-118.2026);
    const [lat, setLat] = useState(34.0588);
    const [zoom, setZoom] = useState(14);
    
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });
    return (
        <div className="w-full h-full">
            <div ref={mapContainer} className="h-full rounded-lg">
                <div className="absolute top-2 right-2 p-1 rounded bg-[rgba(0,0,0,.7)] z-10 text-gray-200 text-sm">
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>
            </div>
        </div>
    )
}
// coordinates
export default Map

// npm i google-map-react