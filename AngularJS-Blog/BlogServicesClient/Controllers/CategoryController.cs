using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using BlogData;
using BlogServicesClient.Models;

namespace BlogServicesClient.Controllers
{
    public class CategoryController : ApiController
    {
        private BlogEntities db = new BlogEntities();

        // GET api/Category/5/
        public IEnumerable<PostModel> GetCategory(int id)
        {
            var posts = db.Posts.Where(p => p.Category.CategoryID == id);
            if (posts == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            var postsModels = posts.ToList().
               Select(p => new PostModel()
               {
                   Title = p.Title,
                   Content = p.Content,
                   PostID = p.PostID,
                   CategoryID = p.CategoryID,
                   CategoryName = p.Category.Name
               });

            return postsModels;
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}