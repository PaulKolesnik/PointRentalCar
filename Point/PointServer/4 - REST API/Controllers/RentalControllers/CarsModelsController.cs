using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace PaulKolesnik
{
    [Route("api/car-models")]
    [ApiController]
    [EnableCors("EntirePoint")]
    public class CarsModelsController : ControllerBase
    {
        private readonly CarModelLogic CarLogic;

        public CarsModelsController(CarModelLogic logic)
        {
            CarLogic = logic;
        }
        [HttpGet]
        public IActionResult GetAllCarsModels()
        {
            try
            {
                List<CarModel_Model> carsModels = CarLogic.GetAllCarsModel();

                return Ok(carsModels);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetOneCarsModels(int id)
        {
            try
            {
                CarModel_Model carModel = CarLogic.GetOneCarModel(id);
                if (carModel == null)
                    return NotFound($"id {id} not found");

                return Ok(carModel);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }

        [Authorize]
        [HttpPost]
        public IActionResult AddCarModel(CarModel_Model carModel)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ErrorHelper.ExtractErrors(ModelState));
                CarModel_Model addedCarModel = CarLogic.AddCarModel(carModel);
                return Created("api/CarModels" + addedCarModel.CModelID, addedCarModel);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }
        [Authorize]
        [HttpPut]
        [Route("{id}")]
        public IActionResult UpateCarModel([FromRoute]int id, [FromBody] CarModel_Model carModel)
        {
            try
            {
                carModel.CModelID = id;
                CarModel_Model updatedCarModel = CarLogic.UpdateCarModel(carModel);

                if (updatedCarModel == null)
                    return NotFound($"id {id} not found");

                return Ok(updatedCarModel);
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
                CarLogic.DeleteCarModel(id);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }
    }
}
