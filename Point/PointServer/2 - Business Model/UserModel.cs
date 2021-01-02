using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace PaulKolesnik
{
    public class UserModel: ICloneable
    {
        public int UserID { get; set; }
        public string UserRole { get; set; } 
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public int PhoneID { get; set; }
        public string UserPic { get; set; }

        public string JwtToken { get; set; }
        public IFormFile Image { get; set; }

        public virtual Phone Phone { get; set; }

        public UserModel() {}

        public UserModel(User user)
        {
            UserID = user.UserId;
            UserRole = user.UserRole.ToString();
            FullName = user.FullName;
            UserName = user.UserName;
            Password = user.Password;
            BirthDate = user.BirthDate;
            Gender = user.Gender;
            Email = user.Email;
            PhoneID = user.PhoneId;
            UserPic = user.UserPic;
            Phone = user.Phone;
        }
        public User ConvertToUser()
        {
            User user = new User
            {
                UserId = UserID,
                UserRole = Convert.ToInt32(UserRole),
                FullName = FullName,
                UserName = UserName,
                Password = Password,
                BirthDate = BirthDate,
                Gender = Gender,
                Email = Email,
                PhoneId = PhoneID,
                UserPic = UserPic,
                Phone = Phone
            };
            return user;
        }

        public object Clone()
        {
            return new UserModel
            {
                UserID = UserID,
                UserRole = UserRole,
                FullName = FullName,
                UserName = UserName,
                Password = Password,
                BirthDate = BirthDate,
                Gender = Gender,
                Email = Email,
                PhoneID = PhoneID,
                Phone = Phone,
                UserPic = UserPic,
                JwtToken = JwtToken
            };
        }
    }
}
