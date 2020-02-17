import axios from 'axios'

export default axios.create({
    baseURL: 'https://api-staging.aiesec.org',
    headers: {
        "content-type": "application/json"
    },
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken'
});