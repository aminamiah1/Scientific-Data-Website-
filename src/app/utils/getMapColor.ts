export const getMapColor = (d: number): string => {
    return d > 1100000 ? '#800026' :
        d > 1000000 ? '#BD0026' :
            d > 900000 ? '#E31A1C' :
                d > 800000 ? '#FC4E2A' :
                    d > 700000 ? '#FD8D3C' :
                        d > 600000 ? '#FEB24C' :
                            d > 500000 ? '#FED976' :
                                '#FFEDA0';
};
