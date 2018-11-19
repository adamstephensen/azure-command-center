using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.SignalRService;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace SignalRBases
{
    public static class OnDocumentChanged
    {
        [FunctionName("OnDocumentsChanged")]
        public static async Task Run(
            
            [CosmosDBTrigger("command-center", "bases", ConnectionStringSetting = "CommandCenterCosmosDBConnectionString")]
                IEnumerable<object> updatedBases,
            [SignalR(HubName = "bases")] IAsyncCollector<SignalRMessage> signalRMessages,
            ILogger log)
        {
            foreach (var baseLocation in updatedBases)
            {
                await signalRMessages.AddAsync(new SignalRMessage
                {
                    Target = "baseUpdated",
                    Arguments = new[] { baseLocation }
                });
            }
        }
    }
}
