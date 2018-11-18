# azure-command-centre
This is a demonstration of working with Azure SignalR Service, Azure Functions and Vue.js

# Plan / demo steps

1. Create a CosmosDb collection of 'Bases'
2. Create the Bases.GetBases Azure function to return all bases
3. Create a Vue app that displays the collection of bases (from the function)
4. Display the list of bases on Bing Maps
5. Add SignalR Service to notify of changes to CosmosDb
6. Update the map when the bases collections changes
7. Add UI to add a base via the Vue web app 