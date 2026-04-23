import { useState, useEffect } from 'react';
import { searchCities, saveSearchAndRedirect } from '../../../../services/api/geoService';
import { City } from '../../../../types';
import useDebounce from '../../../../hooks/useDebounce';

export const useResultSearchBar = (inputValue: string) => {
    const [results, setResults] = useState<City[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const debouncedInput = useDebounce(inputValue, 300);

    useEffect(() => {
        if (!debouncedInput) {
            setResults([]);
            return;
        }

        const abortController = new AbortController();

        const performSearch = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await searchCities(debouncedInput, abortController.signal);
                setResults(data || []);
            } catch (err) {
                if (err instanceof DOMException && err.name === 'AbortError') return;
                setError(err instanceof Error ? err.message : 'Search failed');
            } finally {
                setLoading(false);
            }
        };

        performSearch();
        return () => abortController.abort();
    }, [debouncedInput]);

    const handleSelectCity = (city: City) => {
        saveSearchAndRedirect(city);
    };

    return { results, loading, error, handleSelectCity };
};