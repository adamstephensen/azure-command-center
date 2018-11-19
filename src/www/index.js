const apiBaseUrl = 'http://localhost:7071';
const axiosConfig = {}
const mapConfig = {};
const data = {
    bases: [],
    locations: []
}
var router = new VueRouter({
    mode: 'history',
    routes: []
});
const app = new Vue({
    router,
    el: '#app',
    data: data,
    mounted: function() {
        mapConfig.creds = this.$route.query.mapcredentials;
        console.log("mapConfig.creds", mapConfig.creds )
    },
})

var map, infobox;

function GetMap() {
    console.log("GetMap()");

    map = new Microsoft.Maps.Map('#myMap', {
        credentials: mapConfig.creds
    });

    //Create an infobox at the center of the map but don't show it.
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    //Assign the infobox to a map instance.
    infobox.setMap(map);

    getBases()
        .then(bindBases)
        .then(getConnectionInfo)
        .then(configureSignalR)
        .catch(console.error)

}