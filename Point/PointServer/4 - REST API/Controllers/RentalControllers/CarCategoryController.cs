using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace PaulKolesnik
{
    [Route("api/Car-Category")]
    [ApiController]
    public class CarCategoryController : ControllerBase
    {
        private readonly CarCategoryLogic logic = new CarCategoryLogic();

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetOneGetCategory(int id)
        {
            try
            {
                CarCategoryModel CarCategory = logic.GetOneCategory(id);
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
                List<CarCategoryModel> CarCategories = logic.GetAllCategories();

                return Ok(CarCategories);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }

    }
}
