using System;
using Microsoft.AspNetCore.Http;
namespace PaulKolesnik
{
    public class FleetVehicleModel
    {
        public int ID { get; set; }
        public string Vin { get; set; } // Car Registration
        public int ModelID { get; set; }
        public string Color { get; set; }
        public DateTime PurchaseDate { get; set; }
        public string CarYear { get; set; }
        public string Mileage { get; set; }
        public string CarImg { get; set; }
        public string Gearbox { get; set; }
        public string ToUsed { get; set; }
        public string CarFixed { get; set; }
        public int BranchID { get; set; }

        public IFormFile Image { get; set; }

        public virtual RentalBranch Branch { get; set; }
        public CarModel CarModel { get; set; }
        public FleetVehicleModel(){}

        public FleetVehicleModel(FleetVehicle fleetVehicle)
        {
            ID = fleetVehicle.Id;
            Vin = fleetVehicle.Vin;
            ModelID = fleetVehicle.ModelId;
            Color = fleetVehicle.Color;
            PurchaseDate = fleetVehicle.PurchaseDate;
            CarYear = fleetVehicle.CarYear;
            Mileage = fleetVehicle.Mileage;
            CarImg = fleetVehicle.CarImg;
            Gearbox = fleetVehicle.Gearbox;
            ToUsed = fleetVehicle.ToUsed;
            CarFixed = fleetVehicle.CarFixed;
            BranchID = fleetVehicle.BranchId;
            Branch = fleetVehicle.Branch;
            CarModel = fleetVehicle.Model;
        }
        public FleetVehicle ConvertToCar()
        {
            FleetVehicle fleetVehicle = new FleetVehicle
            {
                Id = ID,
                Vin = Vin,
                ModelId = ModelID,
                Color = Color,
                PurchaseDate = PurchaseDate,
                CarYear = CarYear,
                Mileage = Mileage,
                CarImg = CarImg,
                Gearbox = Gearbox,
                ToUsed = ToUsed,
                CarFixed = CarFixed,
                BranchId = BranchID,
                Branch = Branch,
                Model = CarModel
            };
            return fleetVehicle;
        }


    }
}
