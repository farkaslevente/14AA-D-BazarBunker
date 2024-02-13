using MobilApp_Szakdolgozat.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
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
        static string url = "http://10.0.13.1:9000";

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

        public static async Task<RegisterModel> register(RegisterModel user) 
        {
            RegisterModel errorRegister = new RegisterModel();

            string jsonData = JsonConvert.SerializeObject(user);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpClient client = new HttpClient();
            HttpResponseMessage response = await client.PostAsync(url + "/register", content); //Majd meg kell adni a végleges backend elérést

            // Debug.WriteLine(response.StatusCode);
            string result = await response.Content.ReadAsStringAsync();

            if ((int)response.StatusCode == 400) 
            {
                //hiba
                dynamic errorObj = JsonConvert.DeserializeObject<dynamic>(result);
                foreach (JProperty variable in errorObj) 
                {
                    if (variable.Name == "name")
                    {
                        errorRegister.name = variable.Value[0].ToString();
                    }
                    if (variable.Name == "email")
                    {
                        errorRegister.email = variable.Value[0].ToString();
                    }
                    if (variable.Name == "password")
                    {
                        errorRegister.password = variable.Value[0].ToString();
                    }
                    if (variable.Name == "confirm_password")
                    {
                        errorRegister.confirm_password = variable.Value[0].ToString();
                    }
                }
            }
            return errorRegister;
        }

        public static async Task<string> login(string email, string password) 
        {
            string jsonData = JsonConvert.SerializeObject(new { email = email, password = password });
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpClient client = new HttpClient();
            HttpResponseMessage response = await client.PostAsync(url + "/login", content); //Majd meg kell adni a végleges backend elérést

            string result = await response.Content.ReadAsStringAsync();

            if ((int)response.StatusCode == 401)
            {
                return "Helytelen bejelentkezés!";
            }
            else
            {
                await SecureStorage.SetAsync("user", result);
                return null;
            }
        }


    }
}
