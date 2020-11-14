using System;
using System.Collections.Generic;

namespace PaulKolesnik
{
    public partial class CarModel 
    {
        public CarModel()
        {
            FleetVehicles = new HashSet<FleetVehicle>();
        }

        public int CModelId { get; set; }
        public string CModelManufacturer { get; set; }
        public string CModelName { get; set; }
        public int CModelCatId { get; set; }
        public decimal PriceDay { get; set; }
        public decimal PriceLateDay { get; set; }

        public virtual CarCategory CModelCat { get; set; }
        public virtual ICollection<FleetVehicle> FleetVehicles { get; set; }
    }
}
