using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;

namespace PaulKolesnik
{
    [Route("api/fleet-vehicles")]
    [ApiController]
    [EnableCors("EntirePoint")]
    public class FleetVehiclesController : ControllerBase
    {
        private readonly FleetVehiclesLogic FleetVehiclesLogic;

        public FleetVehiclesController(FleetVehiclesLogic logic)
        {
            FleetVehiclesLogic = logic;
        }

        [HttpGet]
        public IActionResult GetAllFleetVehicles()
        {
            try
            {
                  List<FleetVehicleModel> fleetVehicles = FleetVehiclesLogic.GetAllFleetVehicles();

                return Ok(fleetVehicles);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetOneCarFromFleet(int id)
        {
            try
            {
                FleetVehicleModel fleetVehicleModel = FleetVehiclesLogic.GetOneCarFromFleet(id);
                if (fleetVehicleModel == null)
                    return NotFound($"id {id} not found");

                return Ok(fleetVehicleModel);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }
        [Authorize]

        [HttpPost]
        public IActionResult AddCarModel([FromForm] FleetVehicleModel fleetVehicleModel)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ErrorHelper.ExtractErrors(ModelState));

                FleetVehicleModel addedCar = FleetVehiclesLogic.AddCarToFleet(fleetVehicleModel);
                return Created("api/fleet-vehicles/" + addedCar.ID, addedCar);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }
        [Authorize]
        [HttpPut]
        [Route("{id}")]
        public IActionResult UpateCarOnFleet([FromRoute] int id, [FromBody] FleetVehicleModel carFromFleet)
        {
            try
            {
                carFromFleet.ID = id;
                FleetVehicleModel updatedCar = FleetVehiclesLogic.UpdateCarOnFleet(carFromFleet);

                if (updatedCar == null)
                    return NotFound($"id {id} not found");

                return Ok(updatedCar);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }
        [Authorize]
        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteCarModel([FromRoute] int id)
        {
            try
            {
                FleetVehiclesLogic.DeleteCarFromFleet(id);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }




        [HttpGet]
        [Route("images/{fileName}")]
        public IActionResult GetImage(string fileName)
        {
            try
            {
                FileStream fileStream = System.IO.File.OpenRead("Uploads/" + fileName);

                return File(fileStream, "image/jpeg");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }

    }
}
