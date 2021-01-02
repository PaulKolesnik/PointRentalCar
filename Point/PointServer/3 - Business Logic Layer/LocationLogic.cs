using System.Linq;

namespace PaulKolesnik
{
    public class LocationLogic : BaseLogic
    {
        public LocationLogic(PointContext db) : base(db) { }

        public LocationsModel GetLocation(int id)
        {
            return DB.Locations.Where(L => L.LocId == id).Select(L => new LocationsModel(L)).Single();
        }


        public LocationsModel AddLocation(LocationsModel locationsModel)
        {
              Location location = locationsModel.ConvertToLocation();
            DB.Locations.Add(location);
            //DB.SaveChanges();
            locationsModel.LocID = location.LocId;

            return locationsModel;
        }
    }
}
