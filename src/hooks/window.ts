import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export const useDevice = () => {
    const [device, setDevice] = useState('');

    useLayoutEffect(() => {
        const listener = (e: Event) => {
            const window = e.target as Window;
            if (window.innerWidth >= 768) {
                setDevice('desktop');
            } else {
                setDevice('mobile');
            }
        };
        if (window.innerWidth >= 768) {
            setDevice('desktop');
        } else {
            setDevice('mobile');
        }
        window.addEventListener('resize', listener);
        return () => {
            window.removeEventListener('resize', listener);
        };
    }, []);

    return {
        device,
    };
};

export const useInViewport = (callback: () => void) => {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                callback();
            }
        });

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [callback]);

    return ref;
};
