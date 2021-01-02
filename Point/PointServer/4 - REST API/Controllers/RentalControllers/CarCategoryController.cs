using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace PaulKolesnik
{
    [Route("api/car-category")]
    [ApiController]
    [EnableCors("EntirePoint")]

    public class CarCategoryController : ControllerBase
    {
        private readonly CarCategoryLogic CarCategoryLogic;
        public CarCategoryController(CarCategoryLogic logic)
        {
            CarCategoryLogic = logic;
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetOneGetCategory(int id)
        {
            try
            {
                CarCategoryModel CarCategory = CarCategoryLogic.GetOneCategory(id);
                if (CarCategory == null)
                    return NotFound($"id {id} not found");

                return Ok(CarCategory);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }

        [HttpGet]
        public IActionResult GetAllCarsModels()
        {
            try
            {
                List<CarCategoryModel> CarCategories = CarCategoryLogic.GetAllCategories();

                return Ok(CarCategories);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }

    }
}
