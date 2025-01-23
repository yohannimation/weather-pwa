export const getTimezones = async () => {
    const timezoneApiUrl = new URL("https://timeapi.io/api/timezone/availabletimezones");

    try {
        const response = await fetch(timezoneApiUrl);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const jsonResponse = await response.json();

        // Data treatment
        if (
            jsonResponse !== undefined &&
            Object.keys(jsonResponse).length
        ) {
            var timezones = jsonResponse.forEach((element, index) => {
                console.log({
                    id: index,
                    name: element
                })
                return {
                    id: index,
                    name: element
                }
            });

            console.log(timezones)
            console.log(jsonResponse)

            return timezones;
        } else {
            throw new Error("API didn't get timezone data");
        }
    } catch (error) {
        throw new Error(error);
    }
}