import { LeafletMouseEvent } from 'leaflet';

export const highlightMapFeature = (e: LeafletMouseEvent): void => {
    e.target.setStyle({
        weight: 2,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    e.target.bringToFront();
};
