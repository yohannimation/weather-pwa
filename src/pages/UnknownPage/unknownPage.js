import React from 'react';

function UnknownPage() {
    origin = document.location.origin;
    document.location.href = origin + "/";
}

export default UnknownPage;
