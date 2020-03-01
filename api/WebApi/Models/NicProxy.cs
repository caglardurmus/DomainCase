using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class Event
    {
        public string eventAction { get; set; }
        public DateTime eventDate { get; set; }
    }

    public class SecureDNS
    {
        public bool delegationSigned { get; set; }
    }

    public class Link
    {
        public string value { get; set; }
        public string rel { get; set; }
        public string href { get; set; }
        public string type { get; set; }
    }

    public class Nameserver
    {
        public string objectClassName { get; set; }
        public string ldhName { get; set; }
    }

    public class Notice
    {
        public string title { get; set; }
        public IList<string> description { get; set; }
        public IList<Link> links { get; set; }
    }

    public class PublicId
    {
        public string type { get; set; }
        public string identifier { get; set; }
    }

    public class Remark
    {
        public string title { get; set; }
        public string type { get; set; }
        public IList<string> description { get; set; }
    }

    public class Entity
    {
        public string objectClassName { get; set; }
        public string handle { get; set; }
        public IList<string> roles { get; set; }
        public IList<PublicId> publicIds { get; set; }
        public IList<object> vcardArray { get; set; }
        public IList<Entity> entities { get; set; }
        public IList<Remark> remarks { get; set; }
    }

    public class NicProxy
    {
        public string objectClassName { get; set; }
        public string handle { get; set; }
        public string ldhName { get; set; }
        public IList<string> status { get; set; }
        public IList<Event> events { get; set; }
        public SecureDNS secureDNS { get; set; }
        public IList<Link> links { get; set; }
        public IList<Nameserver> nameservers { get; set; }
        public IList<string> rdapConformance { get; set; }
        public IList<Notice> notices { get; set; }
        public IList<Entity> entities { get; set; }
    }
}