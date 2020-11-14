using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PaulKolesnik
{
    public class CarModelLogic : BaseLogic
    {
        public List<CarModel_Model> GetAllCarsModel()
        {
            return DB.CarModels.Select(carModel => new CarModel_Model(carModel)).ToList();
        }

        public CarModel_Model AddCarModel(CarModel_Model carModel_)
        {
            CarModel carModel = carModel_.ConvertToCar();
            DB.CarModels.Add(carModel);
            DB.SaveChanges();

            carModel_.CModelID = carModel.CModelId;
            return carModel_;
        }
    }
}
