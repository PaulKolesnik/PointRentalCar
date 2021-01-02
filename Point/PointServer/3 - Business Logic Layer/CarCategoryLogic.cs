using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PaulKolesnik
{
    public class CarCategoryLogic : BaseLogic
    {
        public CarCategoryLogic(PointContext db) : base(db) { }

        public CarCategoryModel GetOneCategory(int id)
        {
            return DB.CarCategories.Where(c => c.CatId == id).Select(c => new CarCategoryModel(c)).SingleOrDefault();
        }

        public List<CarCategoryModel> GetAllCategories()
        {
            return DB.CarCategories.Select(c => new CarCategoryModel(c)).ToList();
        }


    }
}
