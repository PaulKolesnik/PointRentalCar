using System;
using System.Collections.Generic;

namespace PaulKolesnik
{
    public partial class Phone
    {
        public Phone() {   }

        public int PhoneId { get; set; }
        public string PhoneNumber { get; set; }
        public int LocId { get; set; }

        public virtual Location Loc { get; set; }
    }
}
