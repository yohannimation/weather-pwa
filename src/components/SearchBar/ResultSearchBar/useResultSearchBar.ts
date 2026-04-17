import { useState } from 'react';
import { searchCities, saveSearchAndRedirect } from '../../../services/api/geoService';
import { City } from '../../../types';

export const useResultSearchBar = () => {
    const [results, setResults] = useState<City[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (inputValue: string) => {
        if (!inputValue) {
            setResults([]);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await searchCities(inputValue);
            setResults(data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Search failed');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectCity = (city: City) => {
        saveSearchAndRedirect(city);
    };

    return {
        results,
        loading,
        error,
        handleSearch,
        handleSelectCity,
    };
}
