using System.Collections.Generic;
using System.Linq;

namespace PaulKolesnik
{
    public class UserLogic :BaseLogic
    {
        public UserLogic (PointContext db) : base(db) { }


        public List<UserModel> GetAllUsers()
        {
            var allUsers = DB.Users.Select(users => new UserModel(users)).ToList();

            //foreach (UserModel user in allUsers)
            //{
            //  user.Phone = GetOnePhone(user.PhoneID);
            //}

            return allUsers;
        }


        public UserModel GetOneUser(int id)
        {
            UserModel userModel = DB.Users.Where(U => U.UserId == id).Select(U => new UserModel(U)).SingleOrDefault();
            userModel.Phone = GetOnePhone(userModel.PhoneID);

            return userModel;
        }

        public UserModel AddUser(UserModel userModel)
        {
            PhoneModel phoneModel = new PhoneModel();
            phoneModel.PhoneNumber = userModel.Phone.PhoneNumber;
            phoneModel.Loc = userModel.Phone.Loc;
            PhoneLogic phoneLogic = new PhoneLogic(DB);
            phoneModel = phoneLogic.AddPhone(phoneModel);

            userModel.PhoneID = phoneModel.PhoneID;
            User user = userModel.ConvertToUser();
            DB.Users.Add(user);
            DB.SaveChanges();

            userModel.UserID = user.UserId;
            return userModel;
        }

        public UserModel GetUserByCredentials(CredentialsModel credentials)
        {
            UserModel user = DB.Users.Where(u => u.UserName == credentials.Username && u.Password == credentials.Password)
                .Select(u => new UserModel(u)).SingleOrDefault();
            return user;
        }


        public UserModel UpdateUser(UserModel userModel)
        {
            User user = DB.Users.SingleOrDefault(u => u.UserId == userModel.UserID);

            if (user == null)
                return null;

            user = userModel.ConvertToUser();

            DB.SaveChanges();

            return userModel;
        }

        public void DeleteUser(int id)
        {
            User user = DB.Users.SingleOrDefault(u => u.UserId == id);

            if (user == null)
                return;

            DB.Users.Remove(user);
            DB.SaveChanges();
        }


        public Phone GetOnePhone(int id)
        {
            PhoneLogic phoneLogic = new PhoneLogic(DB);
            Phone phone = phoneLogic.GetOnePhone(id).ConvertToPhone();

            return phone;
        }


        public bool IsUserNameExists(string username)
        {
            return DB.Users.Any(u => u.UserName == username);
        }

    }
}
