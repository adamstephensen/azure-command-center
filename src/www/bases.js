function getBases() {
    const url = `${apiBaseUrl}/api/GetBases`;
    return axios.get(url, null, axiosConfig)
        .then(function (resp) {
            console.log("getBases result", resp);
            return resp.data;
        })
        .catch(function (error) {
            console.log("getBases exception", error);
            return {}
        })
}

function bindBases(bases) {
    console.log('bindBases:', bases);
    if (bases) {
        bases.forEach(baseUpdated);
    }
};

function baseUpdated(updatedBase) {
    console.log("baseUpdated", updatedBase);

    const base = data.bases.find(f => f.id === updatedBase.id)
    if (base) {
        Vue.set(base, 'baseId', updatedBase.baseId)
        Vue.set(base, 'address', updatedBase.address)
        Vue.set(base, 'latitude', updatedBase.latitude)
        Vue.set(base, 'longitude', updatedBase.longitude)
    } else {
        data.bases.push(updatedBase)
    }
}