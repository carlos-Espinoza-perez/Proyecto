using System.Collections.Generic;
using System.Threading.Tasks;
using Autodesk.Forge;
using Autodesk.Forge.Model;

public record TranslationStatus(string Status, string Progress, IEnumerable<string>? Messages);

public partial class ForgeService
{
    // Funcion global para pasar un string a un formato string base64
    public static string Base64Encode(string plainText)
    {
        var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
        return System.Convert.ToBase64String(plainTextBytes).TrimEnd('=');
    }

    // Funcion encargada de trasladar un archivo (object) a un formato valido de Autodesk (.svf)
    public async Task<Job> TranslateModel(string objectId, string? rootFilename)
    {
        var token = await GetInternalToken();
        var api = new DerivativesApi();
        api.Configuration.AccessToken = token.AccessToken;

        // Aqui se agregan los formatos necesarios .svf entre ellos
        var formats = new List<JobPayloadItem> { new JobPayloadItem (JobPayloadItem.TypeEnum.Svf, new List<JobPayloadItem.ViewsEnum> { JobPayloadItem.ViewsEnum._2d, JobPayloadItem.ViewsEnum._3d })};
        var payload = new JobPayload(new JobPayloadInput(Base64Encode(objectId)), new JobPayloadOutput(formats));
        
        if (!string.IsNullOrEmpty(rootFilename))
        {
            payload.Input.RootFilename = rootFilename;
            payload.Input.CompressedUrn = true;
        }

        var job = (await api.TranslateAsync(payload)).ToObject<Job>();
        return job;
    }


    // Funcion encargada de retornar un status de como va el proceso de trasladar un archivo (revit, etc) a un formato (.svf)
    public async Task<TranslationStatus> GetTranslationStatus(string urn)
    {
        var token = await GetInternalToken();
        var api = new DerivativesApi();
        api.Configuration.AccessToken = token.AccessToken;
        var json = (await api.GetManifestAsync(urn)).ToJson();
        var messages = new List<string>();
        foreach (var message in json.SelectTokens("$.derivatives[*].messages[?(@.type == 'error')].message"))
        {
            if (message.Type == Newtonsoft.Json.Linq.JTokenType.String) messages.Add((string)message);
        }

        foreach (var message in json.SelectTokens("$.derivatives[*].children[*].messages[?(@.type == 'error')].message"))
        {
            if (message.Type == Newtonsoft.Json.Linq.JTokenType.String) messages.Add((string)message);
        }

        return new TranslationStatus((string)json["status"], (string)json["progress"], messages);
    }
}