using System;
using System.Collections.Generic;
using System.Text;

namespace PaulKolesnik
{
    public class ReservationModel
    {
        public int ReservationID { get; set; }
        public decimal Amount { get; set; }
        public DateTime PDate { get; set; }
        public DateTime RDate { get; set; }
        public DateTime? FDate { get; set; }
        public int CarsID { get; set; }
        public int UsersID { get; set; }
        public string PaidUP { get; set; }

        public virtual FleetVehicle Cars { get; set; }
        public virtual User Users { get; set; }

        public ReservationModel(){}

        public ReservationModel(Reservation reservation)
        {
            ReservationID = reservation.ReservationId;
            Amount = reservation.Amount;
            PDate = reservation.PDate;
            RDate = reservation.RDate;
            FDate = reservation.FDate;
            CarsID = reservation.CarsId;
            UsersID = reservation.UsersId;
            PaidUP = reservation.PaidUp;
            Cars = reservation.Cars;
            Users = reservation.Users;
        }
        public Reservation ConvertToReservation()
        {
            Reservation reservation = new Reservation
            {
                ReservationId = ReservationID,
                Amount = Amount,
                PDate = PDate,
                RDate = RDate,
                FDate = FDate,
                CarsId = CarsID,
                UsersId = UsersID,
                PaidUp = PaidUP,
                Cars = Cars,
                Users = Users
            };
            return reservation;
        }
    }
}
