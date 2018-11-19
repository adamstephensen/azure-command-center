function startConnection(connection) {
    console.log('connecting...')
    connection.start()
        .then(function () {
            console.log('connected!')
        })
        .catch(function (err) {
            console.error(err)
            setTimeout(function () {
                startConnection(connection)
            }, 2000)
        })
}

function getConnectionInfo() {
    return axios.post(`${apiBaseUrl}/api/SignalRInfo`, null, axiosConfig)
        .then(function (resp) {
            return resp.data
        })
        .catch(function () {
            return {}
        })
}

function configureSignalR(info) {
    let accessToken = info.accessToken;
    const options = {
        accessTokenFactory: function () {
            if (accessToken) {
                const _accessToken = accessToken;
                accessToken = null;
                return _accessToken;
            } else {
                return getConnectionInfo().then(function (info) {
                    return info.accessToken;
                });
            }
        }
    };
    const connection = new signalR.HubConnectionBuilder()
        .withUrl(info.url, options)
        .build();
    connection.on('baseUpdated', updateBaseAndRefreshMap);
    connection.onclose(function () {
        console.log('disconnected');
        setTimeout(function () {
            startConnection(connection);
        }, 2000);
    });
    startConnection(connection);
};