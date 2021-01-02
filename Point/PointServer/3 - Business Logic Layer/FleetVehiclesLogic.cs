using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace PaulKolesnik
{
    public class FleetVehiclesLogic : BaseLogic
    {

        public FleetVehiclesLogic(PointContext db) : base(db) {}

        public List<FleetVehicleModel> GetAllFleetVehicles()
        {

            var allCars = DB.FleetVehicles.Select(fleetVehicle => new FleetVehicleModel(fleetVehicle)).ToList();

            foreach (FleetVehicleModel car in allCars)
            {
                car.CarModel = GetCarModel(car.ModelID);
                car.Branch = GetRentalBranch(car.BranchID);
            }
            return allCars;
        }

        public FleetVehicleModel GetOneCarFromFleet(int id)
        {
            FleetVehicleModel fleetVehicleModel = DB.FleetVehicles.Where(FV => FV.Id == id).Select(FV => new FleetVehicleModel(FV)).SingleOrDefault();

            fleetVehicleModel.CarModel = GetCarModel(fleetVehicleModel.ModelID);
            fleetVehicleModel.Branch = GetRentalBranch(fleetVehicleModel.BranchID);

            return fleetVehicleModel;
        }



        public FleetVehicleModel AddCarToFleet( FleetVehicleModel fleetVehicleModel)
        {
            string extension = Path.GetExtension(fleetVehicleModel.CarImg);
            fleetVehicleModel.CarImg = Guid.NewGuid() + extension;
            using (FileStream fileStream = File.Create("Uploads/" + fleetVehicleModel.CarImg))
            {
                fleetVehicleModel.Image.CopyTo(fileStream);
            }
            fleetVehicleModel.Image = null;

            FleetVehicle fleetVehicle = fleetVehicleModel.ConvertToCar();

            DB.FleetVehicles.Add(fleetVehicle);
            DB.SaveChanges();

            fleetVehicleModel.ID = fleetVehicle.Id;
            return fleetVehicleModel;
        }

        public FleetVehicleModel UpdateCarOnFleet(FleetVehicleModel fleet)
        {
            FleetVehicle fleetVehicle = DB.FleetVehicles.SingleOrDefault(f => f.Id == fleet.ID);

            if (fleetVehicle == null)
                return null;

            fleetVehicle.Vin = fleet.Vin;
            fleetVehicle.ModelId = fleet.ModelID;
            fleetVehicle.Color = fleet.Color;
            fleetVehicle.PurchaseDate = fleet.PurchaseDate;
            fleetVehicle.CarYear = fleet.CarYear;
            fleetVehicle.Mileage = fleet.Mileage;
            fleetVehicle.CarImg = fleet.CarImg;
            fleetVehicle.Gearbox = fleet.Gearbox;
            fleetVehicle.ToUsed = fleet.ToUsed;
            fleetVehicle.CarFixed = fleet.CarFixed;
            fleetVehicle.BranchId = fleet.BranchID;


            DB.SaveChanges();

            return fleet;
        }

        public void DeleteCarFromFleet(int id)
        {
            FleetVehicle fleetVehicle = DB.FleetVehicles.SingleOrDefault(f => f.Id == id);

            if (fleetVehicle == null)
                return;

            DB.FleetVehicles.Remove(fleetVehicle);
            DB.SaveChanges();
        }

        public void UpdateUsed(int id)
        {
            FleetVehicle car = DB.FleetVehicles.SingleOrDefault(f => f.Id == id);

            car.ToUsed = "no";

            DB.SaveChanges();

        }
        public CarModel GetCarModel(int id)
        {
            CarModelLogic carModelLogic= new CarModelLogic(DB);
            CarModel carModel = carModelLogic.GetOneCarModel(id)
                                    .ConvertToCar();
            return carModel;
        }

        public RentalBranch GetRentalBranch(int id)
        {
            RentalBranchLogic rentalBranchLogic = new RentalBranchLogic(DB);
            RentalBranch  rentalBranch =  rentalBranchLogic.GetRentalBranch(id).ConvertToRentalBranch();
            return rentalBranch;
        }

    }
}
