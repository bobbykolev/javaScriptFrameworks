using Master_detail.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Master_detail.Controllers
{
    public class StudentsController : ApiController
    {
        private List<Student> students = GenerateStudents();

        public ICollection<Student> GetAll()
        {
            return students;
        }

        [ActionName("marks")]
        public ICollection<Mark> GetMarks(int studentId)
        {
            return students[studentId].Marks;
        }

        private static List<Student> GenerateStudents()
        {
            List<Student> students = new List<Student>();
            var number = new Random();
            var subjects = new string[] { "Math", "Physics", "Mechanics" };
            for (int i = 0; i < 8; i++)
            {
                Student currentStudent = new Student
                {
                    StudentID = i,
                    FirstName = "John" + i,
                    LastName = "Doe" + i,
                    Age = i + number.Next(17, 24),
                    Grade = number.Next(1, 12),
                };

                for (int j = 0; j < subjects.Length; j++)
                {
                    currentStudent.Marks.Add
                        (
                            new Mark
                            {
                                Subject = subjects[j],
                                Score = number.Next(2, 6)
                            });
                }

                students.Add(currentStudent);
            }

            return students;
        }
    }
}
