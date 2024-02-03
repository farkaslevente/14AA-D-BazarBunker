using MobilApp_Szakdolgozat.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Nodes;
using System.Threading.Tasks;

namespace MobilApp_Szakdolgozat.Services
{
    public class DataService
    {
        static string url = "https://bgs.jedlik.eu";

        public static async Task<IEnumerable<ProfileModel>> getAllProfiles()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(url);
                var uri = "/users"; //Majd meg kell adni a végleges backend elérést
                var result = await client.GetStringAsync(uri);

                return JsonConvert.DeserializeObject<List<ProfileModel>>(result);
            }
        }

        public static async Task<IEnumerable<PictureCatalogModel>> getAllPictures() 
        {
            using (var client = new HttpClient()) 
            { 
                client.BaseAddress = new Uri(url);
                var uri = "/pictures"; //Majd meg kell adni a végleges backend elérést
                var result = await client.GetStringAsync(uri);

                return JsonConvert.DeserializeObject<List<PictureCatalogModel>>(result);
            }
        }


    }
}
