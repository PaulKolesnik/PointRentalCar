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
        public PhoneModel(){}
        public PhoneModel(Phone phone)
        {
            PhoneID = phone.PhoneId;
            PhoneNumber = phone.PhoneNumber;
            LocID = phone.LocId;
            Loc = phone.Loc;
        }

        public Phone ConvertToPhone()
        {
            Phone phone = new Phone
            {
                PhoneId = PhoneID,
                PhoneNumber = PhoneNumber,
                LocId = LocID,
                Loc = Loc,
            };
            return phone;
        }


    }
    
}
