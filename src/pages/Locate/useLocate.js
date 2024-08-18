export const getLocation = async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(returnPosition, returnError);
      } else {
        return {
            "state": false,
            "message": "Geolocation not supported"
        };
      }
}

export const returnPosition = (position) => {
    return {
        "state": false,
        "data": {
            "latitude": position.coords.latitude,
            "longitude": position.coords.longitude
        }
    };
}

export const returnError = (error) => {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            return {
                "state": false,
                "message": "User denied the request for Geolocation"
            };
        case error.POSITION_UNAVAILABLE:
            return {
                "state": false,
                "message": "Location information is unavailable"
            };
        case error.TIMEOUT:
            return {
                "state": false,
                "message": "The request to get user location timed out"
            };
        case error.UNKNOWN_ERROR:
            return {
                "state": false,
                "message": "An unknown error occurred"
            };
    }
}