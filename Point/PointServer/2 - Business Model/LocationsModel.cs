using System;
using System.Collections.Generic;
using System.Text;

namespace PaulKolesnik
{
    public class LocationsModel
    {
        public int LocID { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }

        public LocationsModel(){}

        public LocationsModel(Location location)
        {
            LocID = location.LocId;
            Latitude = location.Latitude;
            Longitude = location.Longitude;
        }
        public Location ConvertToLocation()
        {
            Location location = new Location
            {
                LocId = LocID,
                Latitude = Latitude,
                Longitude = Longitude,
            };
            return location;
        }
    }
}
