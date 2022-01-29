using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class PhotosController : ControllerBase
  {
    private readonly PhotoService _photoService;

    public PhotosController(PhotoService photoService)
    {
      _photoService = photoService;
    }


    [HttpPost]
    public async Task<Photo> UploadPhoto([FromForm] IFormFile file)
    {
        return await _photoService.UploadPhoto(file);
    }
  }
}