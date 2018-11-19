
        const apiBaseUrl = 'http://localhost:7071';
        const axiosConfig = {}
        const data = {
            bases: []
        }
        const app = new Vue({
            el: '#app',
            data: data
        })

        getBases()
        .then(bindBases)
        .then(getConnectionInfo)
        .then(configureSignalR)
        .catch(console.error)

     

       