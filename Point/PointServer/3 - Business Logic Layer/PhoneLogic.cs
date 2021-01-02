using System.Linq;

namespace PaulKolesnik
{
    public class PhoneLogic : BaseLogic
    {
        public PhoneLogic (PointContext db) : base(db) { }



        public PhoneModel GetOnePhone(int id)
        {
            PhoneModel phoneModel =  DB.Phones.Where(P => P.LocId == id).Select(P => new PhoneModel(P)).Single();

            phoneModel.Loc = GetOneLocationPhone(phoneModel.LocID);

            return phoneModel;
        }
        public PhoneModel AddPhone(PhoneModel phoneModel)
        {
            LocationsModel locationsModel = new LocationsModel();
            locationsModel.Latitude = phoneModel.Loc.Latitude;
            locationsModel.Longitude = phoneModel.Loc.Longitude;

            LocationLogic locationLogic = new LocationLogic(DB);
            locationsModel = locationLogic.AddLocation(locationsModel);

            phoneModel.LocID = locationsModel.LocID;
            Phone phone= phoneModel.ConvertToPhone();
            DB.Phones.Add(phone);
            //DB.SaveChanges();

            phoneModel.PhoneID = phone.PhoneId;
            return phoneModel;
        }

        public Location GetOneLocationPhone(int id)
        {
            LocationLogic locationLogic = new LocationLogic(DB);

            Location location = locationLogic.GetLocation(id).ConvertToLocation();

            return location;
        }

    }
}
