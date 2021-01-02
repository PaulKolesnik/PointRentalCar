using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace PaulKolesnik
{
    [Route("api/rental-branch")]
    [ApiController]
    [EnableCors("EntirePoint")]

    public class RentalBranchController : ControllerBase
    {
        private readonly RentalBranchLogic RentalBranchLogic;

        public RentalBranchController(RentalBranchLogic logic)
        {
            RentalBranchLogic = logic;
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetOneRentalBranch(int id)
        {
            try
            {
                RentalBranchModel rentalBranch = RentalBranchLogic.GetRentalBranch(id);
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
                List<RentalBranchModel> rentalBranches = RentalBranchLogic.GetAllRentalBranch();

                return Ok(rentalBranches);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }



    }
}
