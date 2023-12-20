import { getMapColor } from '@/app/utils/getMapColor';
import { getMapStyles } from '@/app/utils/getMapStyles';
import { mockFeature } from '../data/mockFeature';
describe('NationMap functions', () => {

    it('returns the correct color for getMapColor', () => {
        expect(getMapColor(1001)).to.equal('#800026');
        expect(getMapColor(501)).to.equal('#BD0026');
        expect(getMapColor(201)).to.equal('#E31A1C');
        expect(getMapColor(101)).to.equal('#FC4E2A');
        expect(getMapColor(51)).to.equal('#FD8D3C');
        expect(getMapColor(21)).to.equal('#FEB24C');
        expect(getMapColor(11)).to.equal('#FED976');
        expect(getMapColor(1)).to.equal('#FFEDA0');
    });

    it('returns the correct style for getMapStyles', () => {
        expect(getMapStyles(mockFeature)).to.deep.equal({
            fillColor: '#FFEDA0',
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        });
        expect(getMapStyles(undefined)).to.deep.equal({
            fillColor: '#FFEDA0',
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        });
    });
});
