using System.Collections.Generic;
using System.Linq;

namespace PaulKolesnik
{
    public class ReservationLogic : BaseLogic
    {
        public ReservationLogic(PointContext db) : base(db) { }



        public List<ReservationModel> GetAllReservations()
        {
            var allReservations = DB.Reservations.Select(r => new ReservationModel(r)).ToList();

            foreach (ReservationModel res in allReservations)
            {
                res.User = GetOneUser(res.UsersID);
                res.Car = GetOneCar(res.CarsID);
            }

            return allReservations;
        }

        public ReservationModel GetOneReservation(int id)
        {
            ReservationModel reservationModel = DB.Reservations.Where(R => R.ReservationId == id).Select(R => new ReservationModel(R)).SingleOrDefault();
           
            reservationModel.User = GetOneUser(reservationModel.UsersID);
            reservationModel.Car = GetOneCar(reservationModel.CarsID);
           
            return reservationModel;
        }

        public ReservationModel AddReservation(ReservationModel reservationModel)
        {
            FleetVehiclesLogic fleetVehicleLogic = new FleetVehiclesLogic(DB);
            fleetVehicleLogic.UpdateUsed(reservationModel.CarsID);
            Reservation reservation = reservationModel.ConvertToReservation();
            DB.Reservations.Add(reservation);
            DB.SaveChanges();

            reservationModel.ReservationID = reservation.ReservationId;
            return reservationModel;
        }

        public ReservationModel UpdateReservation(ReservationModel reservationModel)
        {
            Reservation reservation = DB.Reservations.SingleOrDefault(r => r.ReservationId == reservationModel.ReservationID);

            if (reservation == null)
                return null;

            reservation = reservationModel.ConvertToReservation();

            DB.SaveChanges();

            return reservationModel;
        }
        public ReservationModel returnCarToFleet(int id, ReservationModel reservationModel)
        {
            Reservation reservation = DB.Reservations.SingleOrDefault(r => r.ReservationId == id);

            if (reservation == null)
                return null;

            //reservation.Cars.ToUsed = "no";
            reservationModel.Car.ToUsed = "no";
            DB.SaveChanges();
            return reservationModel;
        }

        public void DeleteReservation(int id)
        {
            Reservation reservation = DB.Reservations.SingleOrDefault(r => r.ReservationId == id);

            if (reservation == null)
                return;

            DB.Reservations.Remove(reservation);
            DB.SaveChanges();
        }

        public User GetOneUser(int id)
        {
            UserLogic userLogic = new UserLogic(DB);
            User user = userLogic.GetOneUser(id).ConvertToUser();

            return user;
        }

        public FleetVehicle GetOneCar(int id)
        {
            FleetVehiclesLogic fleetVehiclesLogic = new FleetVehiclesLogic(DB);
            FleetVehicle fleetVehicle = fleetVehiclesLogic.GetOneCarFromFleet(id).ConvertToCar();

            return fleetVehicle;
        }


    }
}
