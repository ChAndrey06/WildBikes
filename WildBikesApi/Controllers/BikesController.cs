using Microsoft.AspNetCore.Mvc;
using WildBikesApi.Core;

namespace WildBikesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BikesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public BikesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<List<Bike>>> GetAll()
        {
            return Ok(await _unitOfWork.Bikes.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Bike>> GetById(int id)
        {
            var bike = await _unitOfWork.Bikes.GetByIdAsync(id);

            if (bike is null) return NotFound();
            return Ok(bike);
        }

        [HttpPost]
        public async Task<ActionResult<Bike>> Add(Bike bike)
        {
            _unitOfWork.Bikes.Add(bike);
            await _unitOfWork.CompleteAsync();

            return Ok(bike);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Bike>> Update(int id, Bike newBike)
        {
            var bike = await _unitOfWork.Bikes.GetByIdAsync(id);

            if (bike is null) return NotFound();

            bike.UpdateWith(newBike);
            await _unitOfWork.CompleteAsync();

            return Ok(bike);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(int id)
        {
            var bike = await _unitOfWork.Bikes.GetByIdAsync(id);

            if (bike is null) return NotFound();

            _unitOfWork.Bikes.Delete(bike);
            await _unitOfWork.CompleteAsync();

            return Ok();
        }

        [HttpPost("Delete-Many")]
        public async Task<IActionResult> DeleteMany(int[] ids)
        {
            foreach (int id in ids)
            {
                var bike = await _unitOfWork.Bikes.GetByIdAsync(id);

                if (bike is null) continue;

                _unitOfWork.Bikes.Delete(bike);
            }

            await _unitOfWork.CompleteAsync();

            return Ok();
        }
    }
}
