using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace PaulKolesnik
{
    [Route("api/Car-Models")]
    [ApiController]
    public class CarModelsController : ControllerBase
    {
        private readonly CarModelLogic CarModelsLogic = new CarModelLogic();
  

        [HttpGet]
        public IActionResult GetAllCarsModels()
        {
            try
            {
                List<CarModel_Model> carsModels = CarModelsLogic.GetAllCarsModel();

                return Ok(carsModels);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }

        [HttpPost]
        public IActionResult AddCarModel(CarModel_Model carModel)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ErrorHelper.ExtractErrors(ModelState));

                CarModel_Model addedCarModel = CarModelsLogic.AddCarModel(carModel);
                return Created("api/CarModels" + addedCarModel.CModelID, addedCarModel);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }
    }
}
