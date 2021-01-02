using System;
using System.Collections.Generic;
using System.Text;

namespace PaulKolesnik
{
    public class CarModel_Model 
    {
        public int CModelID { get; set; }
        public string CModelManufacturer { get; set; }
        public string CModelName { get; set; }
        public int CModelCatID { get; set; }
        public decimal PriceDay { get; set; }
        public decimal PriceLateDay { get; set; }

        public virtual CarCategory CModelCat { get; set; }



        public CarModel_Model(){}

        public CarModel_Model(CarModel car)
        {
            CModelID = car.CModelId;
            CModelManufacturer = car.CModelManufacturer;
            CModelName = car.CModelName;
            CModelCatID = car.CModelCatId;
            PriceDay = car.PriceDay;
            PriceLateDay = car.PriceLateDay;

            CModelCat = car.CModelCat;
        }

        public CarModel ConvertToCar()
        {
            CarModel carModel = new CarModel
            {
                CModelId = CModelID,
                CModelManufacturer = CModelManufacturer,
                CModelName = CModelName,
                CModelCatId = CModelCatID,
                PriceDay = PriceDay,
                PriceLateDay = PriceLateDay,
                CModelCat = CModelCat
            };
            return carModel;
        }
    }
}
