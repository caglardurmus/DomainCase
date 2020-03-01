using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public enum ResponseStatus : byte
    {
        Failed = 0,
        Successful = 1
    }

    public class Response
    {
        public ResponseStatus Status { get; set; }
        public string Message { get; set; }
        public Object Data { get; set; }
    }
}