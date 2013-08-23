using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

namespace Master_detail.Models
{
    [DataContract]
    public class Student
    {
        [DataMember(Name = "id")]
        public int StudentID { get; set; }

        [DataMember(Name = "firstName")]
        public string FirstName { get; set; }

        [DataMember(Name = "lastName")]
        public string LastName { get; set; }

        [DataMember(Name = "grade")]
        public int Grade { get; set; }

        [DataMember(Name = "age")]
        public int Age { get; set; }

        [DataMember(Name = "marks")]
        public virtual ICollection<Mark> Marks { get; set; }

        public Student()
        {
            this.Marks = new HashSet<Mark>();
        }
    }
}