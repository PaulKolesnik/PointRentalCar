using System;
using System.Collections.Generic;

namespace PaulKolesnik
{
    public partial class RentalBranch
    {
        public RentalBranch()   {  }

        public int BranchId { get; set; }
        public string Address { get; set; }
        public string BranchName { get; set; }
        public int LocId { get; set; }

        public virtual Location Loc { get; set; }
    }
}
