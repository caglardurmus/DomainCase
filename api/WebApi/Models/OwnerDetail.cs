using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class OwnerDetail
    {
        public OwnerDetail()
        {

        }
        public OwnerDetail(string domainName, string expirationDate)
        {
            this.DomainName = domainName;
            this.ExpirationDate = expirationDate;
        }
        public string DomainName { get; set; }
        public string ExpirationDate { get; set; }
    }
}