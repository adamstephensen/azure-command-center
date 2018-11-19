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
        bases.forEach(function (base) {
            baseUpdated(base);
            addBaseToMap(base);
        });
        setMapBounds();
    }
};

function setMapBounds() {
    console.log("setMapBounds");
    var bestView = Microsoft.Maps.LocationRect.fromLocations(data.locations);
    map.setView({
        bounds: bestView
    });
}

function updateBaseAndRefreshMap(updatedBase) {
    baseUpdated(updatedBase);
    setMapBounds();
}

function baseUpdated(updatedBase) {
    console.log("baseUpdated", updatedBase);

    const base = data.bases.find(f => f.id === updatedBase.id)
    if (base) {
        Vue.set(base, 'baseID', updatedBase.baseID)
        Vue.set(base, 'address', updatedBase.address)
        Vue.set(base, 'latitude', updatedBase.latitude)
        Vue.set(base, 'longitude', updatedBase.longitude)
    } else {
        data.bases.push(updatedBase)
    }
}


function addBaseToMap(base) {
    console.log("addBaseToMap", base);

    var pinLocation = new Microsoft.Maps.Location(base.latitude, base.longitude);
    data.locations.push(pinLocation);

    var pin = new Microsoft.Maps.Pushpin(pinLocation, {
        icon: 'https://image.ibb.co/f4ttoA/house-v2.png',
        anchor: new Microsoft.Maps.Point(12, 39)
    });
    pin.metadata = {
        title: 'Base Number:' + base.baseID,
        description: base.address
    };
    Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);    
    map.entities.push(pin);

}

function pushpinClicked(e) {
    //Make sure the infobox has metadata to display.
    if (e.target.metadata) {
        //Set the infobox options with the metadata of the pushpin.
        console.log('pin clicked', e.target.metadata.title);
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true

        });
    }
}