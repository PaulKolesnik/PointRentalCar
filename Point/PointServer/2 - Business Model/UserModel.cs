using System;
using System.Collections.Generic;
using System.Text;

namespace PaulKolesnik
{
    public class UserModel
    {
        public int UserID { get; set; }
        public int UserRole { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public int PhoneID { get; set; }
        public string UserPic { get; set; }

        public virtual Phone Phone { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }

        public UserModel() {}

        public UserModel(User user)
        {
            UserID = user.UserId;
            UserRole = user.UserRole;
            FullName = user.FullName;
            UserName = user.UserName;
            Password = user.Password;
            BirthDate = user.BirthDate;
            Gender = user.Gender;
            Email = user.Email;
            PhoneID = user.PhoneId;
            UserPic = user.UserPic;
            Phone = user.Phone;
            Reservations = user.Reservations;
        }
        public User ConvertToUser()
        {
            User user = new User
            {
                UserId = UserID,
                UserRole = UserRole,
                FullName = FullName,
                UserName = UserName,
                Password = Password,
                BirthDate = BirthDate,
                Gender = Gender,
                Email = Email,
                PhoneId = PhoneID,
                UserPic = UserPic,
                Phone = Phone,
                Reservations = Reservations
            };
            return user;
        }
    }
}
