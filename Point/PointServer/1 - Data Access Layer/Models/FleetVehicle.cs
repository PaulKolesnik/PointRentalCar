using System;
using System.Collections.Generic;

namespace PaulKolesnik
{
    public partial class FleetVehicle
    {
        public FleetVehicle()
        {
            Reservations = new HashSet<Reservation>();
        }

        public int Id { get; set; }
        public string Vin { get; set; }
        public int ModelId { get; set; }
        public string Color { get; set; }
        public DateTime PurchaseDate { get; set; }
        public string CarYear { get; set; }
        public string Mileage { get; set; }
        public string CarImg { get; set; }
        public string Gearbox { get; set; }
        public string ToUsed { get; set; }
        public string CarFixed { get; set; }
        public int BranchId { get; set; }

        public virtual RentalBranch Branch { get; set; }
        public virtual CarModel Model { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }
    }
}
