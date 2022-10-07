using System;
using System.Threading.Tasks;
using Autodesk.Forge;

public class GetObjectsVM
{
    public string? Urn { get; set; }
    public string? ObjectKey { get; set; }
    public string? Thumbnail { get; set; }
    public string? ObjectId { get; internal set; }
}