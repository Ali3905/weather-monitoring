import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

// Set your Mapbox access token here
mapboxgl.accessToken = 'pk.eyJ1IjoibXVoYW1tYWRhbGkzMDkwNSIsImEiOiJjbDYyM3lxeDUyM2VvM2pucXk1dmk1cHdqIn0.t5ibM2djiGX1DVjENizjLg';

const MapComponent = ({polygon}) => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map', // container id
      style: "mapbox://styles/mapbox/satellite-streets-v11", // map style
      center: [polygon.long, polygon.lat], // starting position [lng, lat]
      zoom: 13 // starting zoom
    });

    const coordinates = []
    polygon.lats.map((ele, i)=>{{
      coordinates.push([polygon.longs[i], polygon.lats[i]])
    }})

    // Add a polygon representing a specific area
    map.on('load', () => {
      map.addLayer({
        id: 'area-layer',
        type: 'fill',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                coordinates
              ]
            }
          }
        },
        paint: {
          'fill-color': '#1933f7',
          'fill-opacity': .3
        }
      });
    });

    // Add additional map customization or features here

    return () => map.remove(); // Clean up when component unmounts
  }, [polygon]); // Run useEffect only on mount

  return <div id="map" style={{ height: '500px' }} />;
};

export default MapComponent;
