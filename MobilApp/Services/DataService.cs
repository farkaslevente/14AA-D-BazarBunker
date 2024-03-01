using MobilApp_Szakdolgozat.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using MobilApp_Szakdolgozat.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Nodes;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;

namespace MobilApp_Szakdolgozat.Services
{
    public class DataService
    {
        public struct t
        {
            string token;
        }
 //     /\             (_)    | |/ /   | | |
 //    /  \    _ __ ___ _     | ' / ___| | |
 //   / /\ \ | '_ ` _ \| |    |  < / _ \ | |
 //  / ____ \| | | | | | |    | . \  __/ | |
 // /_/    \_\_| |_| |_|_|    |_|\_\___|_|_|
 // képváltáshoz:
 // - token eltárolás
 // - post token, post kép id (<--egyben)

        static string url202 = "http://10.0.22.14:9000";
        static string url303 = "http://10.0.33.12:9000";
        static string url103 = "http://10.0.13.5:9000";
        static string url = url103;

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
                }
            }
            return errorRegister;
        }

        public static async Task<string> login(string email, string jelszo) 
        {
            string jsonData = JsonConvert.SerializeObject(new { email = email, password = jelszo });
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpClient client = new HttpClient();
            HttpResponseMessage response = await client.PostAsync(url + "/login", content);
            string result = await response.Content.ReadAsStringAsync();

            if ((int)response.StatusCode == 401)
            {
                return "Helytelen bejelentkezés!";
            }
            else
            {
                var a = JsonConvert.DeserializeObject<t>(result);
                string[] fullJWT = result.Split(':');
                var fullResult = fullJWT[1].Trim('"');
                string[] trimmedJWT = fullResult.Split('"');
                var trimmedResult = trimmedJWT[0];
                string[] payload = trimmedResult.Split('.');
                var finalPayload = payload[1];

                var finalResult = JWTTokenService.DecodeJwt(JWTTokenService.ConvertJwtStringToJwtSecurityToken(trimmedResult));
                await SecureStorage.SetAsync("userName", finalResult[0]);
                await SecureStorage.SetAsync("userEmail", finalResult[1]);
                await SecureStorage.SetAsync("userImage", finalResult[2]);
                return null;
            }
        }
        public class TokenResponse
        {
            public string Token { get; set; }
        }

    }
}
