using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Autodesk.Forge;
using Autodesk.Forge.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class ModelsController : ControllerBase
{
    public record BucketObject(string name, string urn);
    private readonly ForgeService _forgeService;


    public ModelsController(ForgeService forgeService)
    {
        _forgeService = forgeService;
    }


    [HttpGet("GetLisBucketByModel")]
    public async Task<IActionResult> GetLisBucketByModel(string objectId)
    {
        var response = await _forgeService.GetLisBucketByModel(objectId);
        return Ok(response);
    }

    [HttpPost("CreateBucket")]
    public async Task<IActionResult> CreateBucket(string objectId, string bucketKey)
    {
        var response = await _forgeService.CreateBucketByModel(objectId, bucketKey);

        return Ok(response);
    }

    [HttpPost("DeleteBucket")]
    public async Task DeleteBucket(string bucketKey)
    {
        await _forgeService.DeleteBucket(bucketKey);
    }







    // Funcion encargada de obtener todos los archivos (objects)
    [HttpGet()]
    public async Task<List<GetObjectsVM>> GetModels(string? bucketKey)
    {
        var objects = await _forgeService.GetObjects(bucketKey);
        return objects;
    }

    [HttpPost("DeleteModel")]
    public async Task DeleteModel(string bucketKey, string objectId)
    {
        await _forgeService.DeleteModel(bucketKey, objectId);
    }




    // Funcion que retorna un valor en porcentaje segun como se esta trasladando un archio
    [HttpGet("{urn}/status")]
    public async Task<TranslationStatus> GetModelStatus(string urn)
    {
        try
        {
            var status = await _forgeService.GetTranslationStatus(urn);
            return status;
        }
        catch (Autodesk.Forge.Client.ApiException ex)
        {
            if (ex.ErrorCode == 404)
                return new TranslationStatus("n/a", "", new List<string>());
            else
                throw ex;
        }
    }

    public class UploadModelForm
    {
        [FromForm(Name = "model-zip-entrypoint")]
        public string? Entrypoint { get; set; }

        [FromForm(Name = "model-file")]
        public IFormFile File { get; set; }
        [FromForm(Name = "bucket-key")]
        public string? BucketKey { get; set; }
    }

    [HttpPost()]
    public async Task<BucketObject> UploadAndTranslateModel([FromForm] UploadModelForm form)
    {
        using (var stream = new MemoryStream())
        {
            await form.File.CopyToAsync(stream);
            stream.Position = 0;
            var obj = await _forgeService.UploadModel(form.File.FileName, form.BucketKey, stream);
            var job = await _forgeService.TranslateModel(obj.ObjectId, form.Entrypoint);
            return new BucketObject(obj.ObjectKey, job.Urn);
        }
    }
}