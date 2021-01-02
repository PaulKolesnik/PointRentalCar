using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace PaulKolesnik.Controllers
{
    [Route("api/reservations")]
    [ApiController]
    [EnableCors("EntirePoint")]

    public class ReservationsController : ControllerBase
    {
        private readonly ReservationLogic reservationLogic;

        public ReservationsController(ReservationLogic logic)
        {
            reservationLogic = logic;
        }
        [Authorize]
        [HttpGet]
        public IActionResult GetAllReservations()
        {
            try
            {
                List<ReservationModel> reservations = reservationLogic.GetAllReservations();

                return Ok(reservations);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetOneReservation(int id)
        {
            try
            {
                ReservationModel reservationModel = reservationLogic.GetOneReservation(id);
                if (reservationModel == null)
                    return NotFound($"id {id} not found");

                return Ok(reservationModel);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }

        [Authorize]
        [HttpPost]

        public IActionResult AddReservation(ReservationModel reservationModel)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ErrorHelper.ExtractErrors(ModelState));

                ReservationModel addedReservation = reservationLogic.AddReservation(reservationModel);
                return Created("api/reservations/" + addedReservation.ReservationID, addedReservation);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }
        [Authorize]
        [HttpPut]
        [Route("{id}")]
        public IActionResult UpateReservation([FromRoute] int id, [FromBody] ReservationModel reservationModel)
        {
            try
            {
                reservationModel.ReservationID = id;
                ReservationModel updatedReservation = reservationLogic.UpdateReservation(reservationModel);

                if (updatedReservation == null)
                    return NotFound($"id {id} not found");

                return Ok(updatedReservation);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteReservation([FromRoute] int id)
        {
            try
            {
                reservationLogic.DeleteReservation(id);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }


        [Authorize]
        [HttpPut]
        [Route("return/{id}")]
        public IActionResult ReturnCarToFleet([FromRoute] int id, [FromBody] ReservationModel reservationModel)
        {
            try
            {
                ReservationModel updatedReservation = reservationLogic.returnCarToFleet(id, reservationModel);

                if (updatedReservation == null)
                    return NotFound($"id {id} not found");

                return Ok(updatedReservation);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ErrorHelper.GetExceptionMessage(ex));
            }
        }
    }
}
