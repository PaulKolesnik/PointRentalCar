using System;
using System.Collections.Generic;
using System.Text;

namespace PaulKolesnik
{
    public class PhoneModel
    {
        public int PhoneID { get; set; }
        public string PhoneNumber { get; set; }
        public int LocID { get; set; }

        public virtual Location Loc { get; set; }
        public virtual ICollection<User> Users { get; set; }
        public PhoneModel(){}
        public PhoneModel(Phone phone)
        {
            PhoneID = phone.PhoneId;
            PhoneNumber = phone.PhoneNumber;
            LocID = phone.LocId;
            Loc = phone.Loc;
            Users = phone.Users;
        }

        public Phone ConvertToPhone()
        {
            Phone phone = new Phone
            {
                PhoneId = PhoneID,
                PhoneNumber = PhoneNumber,
                LocId = LocID,
                Loc = Loc,
                Users = Users
            };
            return phone;
        }


    }
    
}
