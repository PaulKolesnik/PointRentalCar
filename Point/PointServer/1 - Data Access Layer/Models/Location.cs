using System;
using System.Collections.Generic;

namespace PaulKolesnik
{
    public partial class Location
    {
        public Location()
        {
            Phones = new HashSet<Phone>();
            RentalBranches = new HashSet<RentalBranch>();
        }

        public int LocId { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }

        public virtual ICollection<Phone> Phones { get; set; }
        public virtual ICollection<RentalBranch> RentalBranches { get; set; }
    }
}
