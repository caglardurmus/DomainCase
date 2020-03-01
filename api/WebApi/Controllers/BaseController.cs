using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.Models;
using System.Web.Http.Cors;

namespace WebApi.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class BaseController : ApiController
    {
        private Response ResponseResult(ResponseStatus responseStatus, string message, object responseData = null)
        {
            var result = new Response()
            {
                Status = responseStatus,
                Message = message,
                Data = responseData
            };

            return result;
        }
        public Response ResponseSuccessful()
        {
            return this.ResponseResult(ResponseStatus.Successful, null, null);
        }
        public Response ResponseSuccessful(OwnerDetail ownerDetail)
        {
            return this.ResponseResult(ResponseStatus.Successful, null, ownerDetail);
        }
        public Response ResponseSuccessful(string message)
        {
            return this.ResponseResult(ResponseStatus.Successful, message);
        }
        public Response ResponseFailed()
        {
            return this.ResponseResult(ResponseStatus.Failed, null, null);
        }
        public Response ResponseFailed(string message)
        {
            return this.ResponseResult(ResponseStatus.Failed, message, null);
        }
        public Response ResponseFailed(Exception ex)
        {
            return this.ResponseResult(ResponseStatus.Failed, ex.Message, null);
        }
    }
}
