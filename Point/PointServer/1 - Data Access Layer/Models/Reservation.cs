using System;
using System.Collections.Generic;

namespace PaulKolesnik
{
    public partial class Reservation
    {
        public int ReservationId { get; set; }
        public decimal Amount { get; set; }
        public DateTime PDate { get; set; }
        public DateTime RDate { get; set; }
        public DateTime? FDate { get; set; }
        public int CarsId { get; set; }
        public int UsersId { get; set; }
        public string PaidUp { get; set; }

        public virtual FleetVehicle Cars { get; set; }
        public virtual User Users { get; set; }
    }
}
