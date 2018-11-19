# azure-command-centre
This is a demonstration of working with Azure SignalR Service, Azure Functions and Vue.js

# Instructions

1. Clone this repository
2. Create a cosmos db database with two collections ```bases``` and ```leases```
3. Add the following into ```bases```

```
{
    "address": "8 Castlereagh St Sydney NSW 2002",
    "latitude": -33.86689,
    "longitude": 151.21021,
    "baseID": 10
}
{
    "address": "5/28 Fitzroy St, Surry Hills NSW 2010",
    "latitude": -33.883961,
    "longitude": 151.2135,
    "baseID": 11
}
```
note: no data is needed for the 'leases' collection. It is used by Signalr

4. Get the CosmosDb connection string 
5. Create a SignalR Service
6. Get the SignalR Service Connection string
7. Open the /src/bases-csharp folder
8. Rename ```local.settings.sample.json``` to ```local.settings.json``` and update the CosmosDb and SignalR connection strings
8. Execute 'func start' from the /src/bases-csharp folder to start the Bases function
9. Open 'index.html' from the /src/www folder
10. (Optional) to remove the Bing Maps licence warning, pass a Bing Maps key in the query string.
        ```index.html?mapcredentials=<your-bing-maps-key>```
  

# Plan / demo steps

1. Create a CosmosDb collection of 'Bases'
2. Create the Bases.GetBases Azure function to return all bases
3. Create a Vue app that displays the collection of bases (from the function)
4. Display the list of bases on Bing Maps
5. Add SignalR Service to notify of changes to CosmosDb
6. Update the map when the bases collections changes
7. Add UI to add a base via the Vue web app 
