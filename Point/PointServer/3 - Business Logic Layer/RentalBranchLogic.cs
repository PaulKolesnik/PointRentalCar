using System.Collections.Generic;
using System.Linq;

namespace PaulKolesnik
{
    public class RentalBranchLogic : BaseLogic
    {
        public RentalBranchModel GetRentalBranch(int id)
        {
            return DB.RentalBranches.Where(rb => rb.BranchId == id).Select(rb => new RentalBranchModel(rb)).SingleOrDefault();
        }

        public List<RentalBranchModel> GetAllRentalBranch()
        {
            return DB.RentalBranches.Select(rentalBranch => new RentalBranchModel(rentalBranch)).ToList();
        }
    }
}
