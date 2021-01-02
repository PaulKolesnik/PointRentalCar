using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PaulKolesnik
{
    [Route("api/Locations")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        private readonly LocationLogic LocationLogic;

        public LocationsController(LocationLogic logic)
        {
            LocationLogic = logic;
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetOneGetCategoryLocation(int id)
        {
            try
            {
                LocationsModel Location = LocationLogic.GetLocation(id);

                if (Location == null)
                    return NotFound($"id {id} not found");

                return Ok(Location);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }

        [HttpPost]
        public IActionResult AddLocation(LocationsModel locationModel)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ErrorHelper.ExtractErrors(ModelState));

                LocationsModel addedLocations = LocationLogic.AddLocation(locationModel);
                return Created("api/CarModels" + addedLocations.LocID, addedLocations);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }

    }
}
