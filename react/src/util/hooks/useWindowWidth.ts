import {useEffect, useState} from 'react';

export function useWindowWidth() {
    const [width, setWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleWindowSizeChange = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
    return width;
}

export function useIsMobile() {
    return useWindowWidth() < 600;
}

