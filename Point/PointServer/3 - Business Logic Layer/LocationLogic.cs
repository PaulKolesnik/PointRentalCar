using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PaulKolesnik
{
    public class LocationLogic : BaseLogic
    {
        public LocationsModel GetLocation(int id)
        {
            return DB.Locations.Where(L => L.LocId == id).Select(L => new LocationsModel(L)).SingleOrDefault();
        }


        public LocationsModel AddLocation(LocationsModel locationsModel)
        {
            Location location = locationsModel.ConvertToLocation();
            DB.Locations.Add(location);
            DB.SaveChanges();
            locationsModel.LocID = location.LocId;

            return locationsModel;
        }
    }
}
