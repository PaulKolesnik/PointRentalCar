using System;
using System.Collections.Generic;
using System.Text;

namespace PaulKolesnik
{
    public class CarCategoryModel
    {
        public int CatID { get; set; }
        public string CatName { get; set; }
        public string? CatDesc { get; set; }

        public virtual ICollection<CarModel> CarModels { get; set; }

        public CarCategoryModel(){}

        public CarCategoryModel(CarCategory carCategory)
        {
            CatID = carCategory.CatId;
            CatName = carCategory.CatName;
            CatDesc = carCategory.CatDesc;
        }

        public CarCategory ConvertToCarCategory()
        {
            CarCategory carCategory = new CarCategory
            {
                CatId = CatID,
                CatName = CatName,
                CatDesc = CatDesc,
            };
            return carCategory;
        }


    }
}
