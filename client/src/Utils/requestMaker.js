export function _GET(url) {
    return fetch(url)
        .then(response => response.json())
        .catch(err => console.log(err))
}

export function _POST(params) {
    return fetch(params.url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: params.body
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}

export function _PUT(params) {
    return fetch(params.url, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: params.body
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}

export function _DELETE(url) {
    return fetch(url, {method: 'delete'})
        .then(response => response.json())
        .catch(err => console.log(err))
}
