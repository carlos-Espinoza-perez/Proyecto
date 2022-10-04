using Microsoft.AspNetCore.Mvc;

namespace Proyecto.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult File(string id)
        {
            return View(model: id);
        }
    }
}
