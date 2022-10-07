using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Autodesk.Forge;
using Autodesk.Forge.Client;
using Autodesk.Forge.Model;

public partial class ForgeService
{
    // Se encarga de obtener un bucket de la API y en el caso de dar error este se crea
    private async Task EnsureBucketExists(string bucketKey)
    {
        var token = await GetInternalToken();
        var api = new BucketsApi();
        api.Configuration.AccessToken = token.AccessToken;
        try
        {
            await api.GetBucketDetailsAsync(bucketKey);
        }
        catch (ApiException e)
        {
            if (e.ErrorCode == 404)
            {
                await api.CreateBucketAsync(new PostBucketsPayload(bucketKey, null, PostBucketsPayload.PolicyKeyEnum.Persistent));
            }
            else
            {
                throw e;
            }
        }
    }

    private string getObjectDigestId(string objectId)
    {
        var response = objectId;

        response = objectId.Substring(1, 10);
        response += objectId.Substring(objectId.Length - 25, 25);

        return response;
    }




    public async Task<dynamic> GetLisBucketByModel(string objectId)
    {
        var token = await GetInternalToken();
        var api = new BucketsApi();
        api.Configuration.AccessToken = token.AccessToken;

        var listBucket = new DynamicDictionaryItems((await api.GetBucketsAsync()).items);
        var response = new List<GetBucketVM>();

        foreach (KeyValuePair<string, dynamic> item in listBucket)
        {
            if (!item.Value.bucketKey.Contains(getObjectDigestId(objectId.ToLower()))) continue;
            response.Add(new GetBucketVM() { BucketKey = item.Value.bucketKey, Name = item.Value.bucketKey.Split("--")[0] });
        }
         
        return response;
    }

    // Crear bucket para un archivo
    public async Task<dynamic> CreateBucketByModel(string objectId, string bucketKey)
    {
        try
        {
            var token = await GetInternalToken();
            var api = new BucketsApi();
            api.Configuration.AccessToken = token.AccessToken;


            var name = string.Format("{0}__{1}", getObjectDigestId(objectId.ToLower()), bucketKey.Replace(" ", "-").ToLower());
            var obj = new PostBucketsPayload(name, null, PostBucketsPayload.PolicyKeyEnum.Persistent);
            var response = await api.CreateBucketAsync(obj);
            
            return response;
        }
        catch (System.Exception ex)
        {
            return ex;
        }
    }

    public async Task DeleteBucket(string bucketKey)
    {
        var token = await GetInternalToken();
        var api = new BucketsApi();
        api.Configuration.AccessToken = token.AccessToken;

        await api.DeleteBucketAsync(bucketKey.ToLower());
    }


    public async Task DeleteModel(string bucketKey, string objectId)
    {
        var token = await GetInternalToken();
        var api = new ObjectsApi();
        api.Configuration.AccessToken = token.AccessToken;

        await api.DeleteObjectAsync(bucketKey, objectId);
    }






    // Funcion encargada de subir un archivo al bucket (Creado o por crear)
    public async Task<ObjectDetails> UploadModel(string objectName, string? bucketKey, Stream content)
    {
        if (bucketKey == null) bucketKey = _bucket;
        await EnsureBucketExists(bucketKey);

        // Obtiene el token necesario para proceder.
        var token = await GetInternalToken();

        // Hace la instacia
        var api = new ObjectsApi();

        // Se setea el valor del token
        api.Configuration.AccessToken = token.AccessToken;

        // Se hace el envio de los datos.
        var results = await api.uploadResources(bucketKey, new List<UploadItemDesc> { new UploadItemDesc(objectName, content) });
        if (results[0].Error) throw new Exception(results[0].completed.ToString());


        else
        {
            var json = results[0].completed.ToJson();
            return json.ToObject<ObjectDetails>();
        }
    }

    // Funcion que se encarga de hacer la peticion de los diferentes archivos (Objects) a la API
    public async Task<List<GetObjectsVM>> GetObjects(string? bucketKey)
    {
        const int PageSize = 64;

        if (bucketKey == null) bucketKey = _bucket;
        // Se obtiene el bucket necesario (Creado o por crear)
        await EnsureBucketExists(bucketKey);
        
        
        var token = await GetInternalToken();
        var api = new ObjectsApi();
        api.Configuration.AccessToken = token.AccessToken;

        // Variable en donde se guardaran la lista de archivos.
        var results = new List<ObjectDetails>();
        var response = (await api.GetObjectsAsync(bucketKey, PageSize)).ToObject<BucketObjects>();
        results.AddRange(response.Items);


        

        // Se hace este ciclo para proceder a obtener todos los archios (objects) del bucket aumentando valores de min y max.
        while (!string.IsNullOrEmpty(response.Next))
        {
            var queryParams = Microsoft.AspNetCore.WebUtilities.QueryHelpers.ParseQuery(new Uri(response.Next).Query);
            response = (await api.GetObjectsAsync(bucketKey, PageSize, null, queryParams["startAt"])).ToObject<BucketObjects>();
            results.AddRange(response.Items);
        }


        var listVM  = new List<GetObjectsVM>();
        var apiForImage = new DerivativesApi();
        api.Configuration.AccessToken = (await GetInternalToken()).AccessToken;

        foreach (var item in results)
        {
            try
            {
                var responseImage = await apiForImage.GetThumbnailAsync(Base64Encode(item.ObjectId), 350, 230);
                var base64 = Convert.ToBase64String(responseImage.ToArray());

                listVM.Add(new GetObjectsVM()
                {
                    ObjectKey = item.ObjectKey,
                    Thumbnail = base64,
                    Urn = Base64Encode(item.ObjectId),
                    ObjectId = item.ObjectId
                });
            }
            catch (System.Exception)
            {
                continue;                
            }
        }

        return listVM;
    }
}