export const getCategory = async (id) => {
    const fetchUrl = "https://api.yohannimation.fr/Getter.php?type=category&id=" + id;

    try {
        const response = await fetch(fetchUrl);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const jsonResponse = await response.json();
        if (!jsonResponse.status) {
            throw new Error(jsonResponse.msg);
        }
        return jsonResponse;
    } catch (error) {
        throw new Error(error);
    }
}

export const getProjects = async (id, page) => {
    const fetchUrl = "https://api.yohannimation.fr/Getter.php?type=projects&id=" + id + "&page=" + page;

        try {
            const response = await fetch(fetchUrl);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const jsonResponse = await response.json();
            if (!jsonResponse.status) {
                throw new Error(jsonResponse.msg);
            }
            return jsonResponse;
        } catch (error) {
            throw new Error(error);
        }
}

export const getTypeName = async () => {
    const fetchUrl = "https://api.yohannimation.fr/Getter.php?type=types";

        try {
            const response = await fetch(fetchUrl);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const jsonResponse = await response.json();
            if (!jsonResponse.status) {
                throw new Error(jsonResponse.msg);
            }
            return jsonResponse;
        } catch (error) {
            throw new Error(error);
        }
}