using System;
using System.Collections.Generic;

namespace PaulKolesnik
{
    public partial class User
    {
        public User()
        {
            Reservations = new HashSet<Reservation>();
        }

        public int UserId { get; set; }
        public int UserRole { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public int PhoneId { get; set; }
        public string UserPic { get; set; }

        public virtual Phone Phone { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }
    }
}
