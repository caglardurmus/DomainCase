using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApi.Models;

namespace WebApi.Controllers
{
    public class DefaultController : BaseController
    {
        [HttpGet]
        public async System.Threading.Tasks.Task<Response> CheckDomain(string domainName)
        {
            try
            {
                HttpClient client = new HttpClient();

                var url = $"https://rdap.nicproxy.com/domain/{domainName}";

                var response = await client.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var sttr = await response.Content.ReadAsStringAsync();
                    var entity = JsonConvert.DeserializeObject<NicProxy>(sttr);

                    var expirationDate = entity.events.Where(x => x.eventAction == "expiration").FirstOrDefault().eventDate;

                    return this.ResponseSuccessful(new OwnerDetail(entity.ldhName, expirationDate.ToString("dd.MM.yyyy")));
                }
                else
                {
                    if (response.StatusCode == HttpStatusCode.NotFound)
                    {
                        return this.ResponseSuccessful();
                    }
                    else
                    {
                        return this.ResponseFailed($"Status Code: {Convert.ToInt32(response.StatusCode)}, Reason Pharase: {response.ReasonPhrase}");
                    }
                }

            }
            catch (Exception ex)
            {
                return this.ResponseFailed(ex);
            }

        }
    }
}
