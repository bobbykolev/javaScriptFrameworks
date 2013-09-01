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
    public class PostController : ApiController
    {
        private BlogEntities db = new BlogEntities();

        // GET api/Post
        public IEnumerable<PostModel> GetPosts()
        {
            var posts = db.Posts.Include(p => p.Category);

            var postsModels = posts.ToList().
               Select(p => new PostModel()
               {
                   Title = p.Title,
                   Content = p.Content,
                   PostID = p.PostID,
                   CategoryID = p.CategoryID,
                   CategoryName = p.Category.Name                   
               });

            return postsModels.AsEnumerable();
        }

        // POST api/Post
        public HttpResponseMessage PostPost(PostModel postModel)
        {
            if (ModelState.IsValid)
            {
                if (!db.Categories.Any(c=>c.Name == postModel.CategoryName))
                {
                    db.Categories.Add(new Category() {
                        Name = postModel.CategoryName,
                    });
                    db.SaveChanges();
                }

                var cat = db.Categories.FirstOrDefault(c => c.Name == postModel.CategoryName);

                var post = new Post() { 
                    Title = postModel.Title,
                    Content = postModel.Content,
                    CategoryID = cat.CategoryID
                };

                db.Posts.Add(post);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, postModel);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = post.PostID }));
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // GET api/Post/5
        public PostModel GetPost(int id)
        {
            Post post = db.Posts.Find(id);
            if (post == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            var postModels = new PostModel()
               {
                   Title = post.Title,
                   Content = post.Content,
                   PostID = post.PostID,
                   CategoryID = post.CategoryID,
                   CategoryName = post.Category.Name
               };

            return postModels;
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}