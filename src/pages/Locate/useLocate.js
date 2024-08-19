import { setCoordinate, setCityName } from "../../components/LocalStorage/useSetter";

export const locationTreatment = (value) => {
    if (
        typeof value === 'object' &&
        "cityName" in value &&
        "cityLatitude" in value &&
        "cityLongitude" in value &&
        setCityName(value.cityName) &&
        setCoordinate(
                value.cityLatitude,
                value.cityLongitude
        )
    ) {
        // Redirect to `Weather` page after set required data
        const origin = document.location.origin;
        document.location.href = origin + "/";
    }
}