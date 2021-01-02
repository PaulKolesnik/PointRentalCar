using System.Collections.Generic;
using System.Linq;

namespace PaulKolesnik
{
    public class CarModelLogic : BaseLogic
    {

        public CarModelLogic(PointContext db) : base(db) { }


        public List<CarModel_Model> GetAllCarsModel()
        {
            var allCarsModel = DB.CarModels.Select(carModel => new CarModel_Model(carModel)).ToList();

            foreach (CarModel_Model carModel in allCarsModel)
            {
                carModel.CModelCat = getOneCategory(carModel.CModelCatID);
            }

            return allCarsModel;
        }
        public CarModel_Model GetOneCarModel(int id)
        {
            CarModel_Model carModel = DB.CarModels.Where(cm => cm.CModelId == id).Select(cm => new CarModel_Model(cm)).SingleOrDefault();
            carModel.CModelCat = getOneCategory(carModel.CModelCatID);
            return carModel;
        }
        public CarModel_Model AddCarModel(CarModel_Model carModel_)
        {
            CarModel carModel = carModel_.ConvertToCar();

            DB.CarModels.Add(carModel);
            DB.SaveChanges();

            carModel_.CModelID = carModel.CModelId;
            return carModel_;
        }

        public CarModel_Model UpdateCarModel(CarModel_Model carModel_)
        {
            CarModel carModel = DB.CarModels.SingleOrDefault(carModel => carModel.CModelId == carModel_.CModelID);

            if (carModel == null)
                return null;

            carModel.CModelId = carModel_.CModelID;
            carModel.CModelManufacturer = carModel_.CModelManufacturer;
            carModel.CModelName = carModel_.CModelName;
            carModel.CModelCatId = carModel_.CModelCatID;
            carModel.PriceDay = carModel_.PriceDay;
            carModel.PriceLateDay = carModel_.PriceLateDay;
            DB.SaveChanges();

            return carModel_;
        }

        public void DeleteCarModel(int id)
        {
            CarModel carModel = DB.CarModels.SingleOrDefault(carModel => carModel.CModelId == id);

            if (carModel == null)
                return;

            DB.CarModels.Remove(carModel);
            DB.SaveChanges();
        }


        public CarCategory getOneCategory(int id)
        {
            CarCategory carCategory = new CarCategory();

            carCategory = DB.CarCategories.SingleOrDefault(c => c.CatId == id);

            return carCategory;
        }
    }
}
