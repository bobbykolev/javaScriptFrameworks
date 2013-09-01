using BlogData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

namespace BlogServicesClient.Models
{
    [DataContract]
    public class PostModel
    {
        [DataMember(Name= "postID")]
        public int PostID { get; set; }

        [DataMember(Name = "title")]
        public string Title { get; set; }

        [DataMember(Name = "content")]
        public string Content { get; set; }

        [DataMember(Name = "categoryID")]
        public int CategoryID { get; set; }

        [DataMember(Name = "categoryName")]
        public string CategoryName { get; set; }
    }
}