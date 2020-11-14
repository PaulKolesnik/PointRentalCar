using System;
using System.Collections.Generic;
using System.Text;

namespace PaulKolesnik
{
    public class RentalBranchModel
    {
        public int BranchID { get; set; }
        public string Address { get; set; }
        public string Name { get; set; }
        public int LocID { get; set; }

        public virtual Location Loc { get; set; }
        public virtual ICollection<FleetVehicle> FleetVehicles { get; set; }

        public RentalBranchModel(){}

        public RentalBranchModel(RentalBranch rentalBranch)
        {
            BranchID = rentalBranch.BranchId;
            Address = rentalBranch.Address;
            Name = rentalBranch.BranchName;
            LocID = rentalBranch.LocId;
            Loc = rentalBranch.Loc;
            FleetVehicles = rentalBranch.FleetVehicles;
        }
        public RentalBranch ConvertToRentalBranch()
        {
            RentalBranch rentalBranch = new RentalBranch
            {
                BranchId = BranchID,
                Address = Address,
                BranchName = Name,
                LocId = LocID,
                Loc = Loc,
                FleetVehicles = FleetVehicles
            };
            return rentalBranch;
        }
    }
}
