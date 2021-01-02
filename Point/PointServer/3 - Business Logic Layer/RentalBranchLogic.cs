using System.Collections.Generic;
using System.Linq;

namespace PaulKolesnik
{
    public class RentalBranchLogic : BaseLogic
    {
        public RentalBranchLogic(PointContext db) : base(db) { }

        public RentalBranchModel GetRentalBranch(int id)
        {
            RentalBranchModel rentalBranchModel = DB.RentalBranches.Where(rb => rb.BranchId == id).Select(rb => new RentalBranchModel(rb)).SingleOrDefault();

            rentalBranchModel.Loc = getBranchLoc(rentalBranchModel.LocID);
            return rentalBranchModel;
        }

        public List<RentalBranchModel> GetAllRentalBranch()
        {
            return DB.RentalBranches.Select(rentalBranch => new RentalBranchModel(rentalBranch)).ToList();
        }

        public Location getBranchLoc(int id)
        {
            LocationLogic locationLogic = new LocationLogic(DB);

            Location location =  locationLogic.GetLocation(id).ConvertToLocation();

            return location;

        }
    }
}
