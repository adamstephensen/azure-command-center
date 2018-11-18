using System;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs.Host;
using Newtonsoft.Json;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace CommandCenter.Bases
{
    public static class GetBasess
    {
        [FunctionName("GetBasess")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous)] HttpRequest req,
            [CosmosDB("command-center", "bases", ConnectionStringSetting = "CommandCenterCosmosDBConnectionString")]
                IEnumerable<object> bases,
            ILogger log)
        {
            return new OkObjectResult(bases);
        }
    }
}
