using API.DTOs;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;

namespace API.Services
{
  public class PhotoAccessorService
  {
    private readonly Cloudinary _cloudinary;
    public PhotoAccessorService(IOptions<CloudinarySettingsDto> config)
    {
      var account = new Account(
          config.Value.CloudName,
          config.Value.ApiKey,
          config.Value.ApiSecret
      );

      _cloudinary = new Cloudinary(account);

    }
    public async Task<PhotoUploadResultDto> AddPhoto(IFormFile file)
    {
      if (file.Length > 0)
      {
        await using var stream = file.OpenReadStream();
        var uploadParams = new ImageUploadParams
        {
          File = new FileDescription(file.FileName, stream)
        };

        var uploadResult = await _cloudinary.UploadAsync(uploadParams);

        if (uploadResult.Error != null)
        {
          throw new Exception(uploadResult.Error.Message);
        }

        return new PhotoUploadResultDto
        {
          PublicId = uploadResult.PublicId,
          Url = uploadResult.SecureUrl.ToString()
        };
      }

      return null;
    }
    public async Task<string> DeletePhoto(string publicId)
    {
      var deleteParams = new DeletionParams(publicId);
      var result = await _cloudinary.DestroyAsync(deleteParams);
      return result.Result == "ok" ? result.Result : null;
    }

    public async Task<PhotoUploadResultDto> AddPhotoFromBase64(string base64String)
    {
        await using var stream = Base64ToImage(base64String);
        var uploadParams = new ImageUploadParams
        {
          File = new FileDescription("file.jpg", stream)
        };

        var uploadResult = await _cloudinary.UploadAsync(uploadParams);

        if (uploadResult.Error != null)
        {
          throw new Exception(uploadResult.Error.Message);
        }

        return new PhotoUploadResultDto
        {
          PublicId = uploadResult.PublicId,
          Url = uploadResult.SecureUrl.ToString()
        };
    }

    public Stream Base64ToImage(string base64String)
    {
      byte[] imageBytes = Convert.FromBase64String(base64String);
      return new MemoryStream(imageBytes, 0, imageBytes.Length);
    }
  }
}