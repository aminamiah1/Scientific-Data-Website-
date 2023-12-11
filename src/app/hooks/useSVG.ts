import { ISVGResponse } from "../interfaces/ISvgResponse";
export const getSVG = async (): Promise<ISVGResponse> => {
    const apiUrl: string = 'http://localhost:4001/api/svg';

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            console.log('error fetching SVG')

        };

        const responseData: ISVGResponse = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error fetching SVG:', error);
        throw error;
    };
};
