using System;
using System.Collections.Generic;

namespace PaulKolesnik
{
    public partial class CarCategory
    {
        public CarCategory()
        {
            CarModels = new HashSet<CarModel>();
        }

        public int CatId { get; set; }
        public string CatName { get; set; }
        public string CatDesc { get; set; }

        public virtual ICollection<CarModel> CarModels { get; set; }
    }
}
