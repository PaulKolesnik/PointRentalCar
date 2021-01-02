using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace PaulKolesnik
{
    [Route("api/users")]
    [ApiController]
    [EnableCors("EntirePoint")]

    public class UsersController : ControllerBase
    {

        private readonly UserLogic userLogic;
        private readonly JwtHelper jwtHelper;
        public UsersController(JwtHelper jwtHelper,UserLogic logic)
        {
            this.jwtHelper = jwtHelper;
            userLogic = logic;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            try
            {
                List<UserModel> users = userLogic.GetAllUsers();

                return Ok(users);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }


        [HttpGet]
        [Route("{id}")]
        public IActionResult GetOneUser(int id)
        {
            try
            {
                UserModel userModel = userLogic.GetOneUser(id);
                if (userModel == null)
                    return NotFound($"id {id} not found");

                return Ok(userModel);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }
        //Register
        [HttpPost]
        [Route("register")]

        public IActionResult Register(UserModel userModel)
        {
            try
            {
                if (userLogic.IsUserNameExists(userModel.UserName))
                    return BadRequest("Username already taken");

                UserModel addedUser = userLogic.AddUser(userModel);

                userModel.JwtToken = jwtHelper.GetJwtToken(userModel.UserName, userModel.UserRole.ToString());

                userModel = (UserModel)userModel.Clone();
                userModel.Password = null;

                return Created("api/users/" + addedUser.UserID, addedUser);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }
        [HttpPost]
        [Route("login")]

        public IActionResult Login(CredentialsModel credentials)
        {
            try
            {
                UserModel user = userLogic.GetUserByCredentials(credentials);

                if (user == null)
                    return Unauthorized("Incorrect username or password");


                user.JwtToken = jwtHelper.GetJwtToken(user.UserName, user.UserRole);

                user.Password = null;
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }
        [HttpPut]
        [Route("{id}")]
        public IActionResult UpdateUser([FromRoute] int id, [FromBody] UserModel userModel)
        {
            try
            {
                userModel.UserID = id;
                UserModel updatedUser = userLogic.UpdateUser(userModel);

                if (updatedUser == null)
                    return NotFound($"id {id} not found");

                return Ok(updatedUser);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteUser([FromRoute] int id)
        {
            try
            {
                userLogic.DeleteUser(id);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }


    }
}
