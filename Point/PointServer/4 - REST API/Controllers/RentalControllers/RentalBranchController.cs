using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PaulKolesnik
{
    [Route("api/Rental-Branch")]
    [ApiController]
    public class RentalBranchController : ControllerBase
    {
        private readonly RentalBranchLogic logic = new RentalBranchLogic();

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetOneRentalBranch(int id)
        {
            try
            {
                RentalBranchModel rentalBranch = logic.GetRentalBranch(id);
                if (rentalBranch == null)
                    return NotFound($"id {id} not found");

                return Ok(rentalBranch);
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
                List<RentalBranchModel> rentalBranches = logic.GetAllRentalBranch();

                return Ok(rentalBranches);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }



    }
}
