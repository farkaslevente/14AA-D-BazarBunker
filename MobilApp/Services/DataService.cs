﻿using MobilApp_Szakdolgozat.Models;
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
using MobilApp_Szakdolgozat.ViewModels;
using System.Net.Http.Headers;
using FFImageLoading.Args;
using MySqlX.XDevAPI;
using System.Xml.Linq;
using System.Collections.ObjectModel;



namespace MobilApp_Szakdolgozat.Services
{
    public class DataService
    {
        public static ObservableCollection<AdsModel> advertisements { get; set; } = new ObservableCollection<AdsModel>();
        public struct T
        {
            string token;
        }        
             
        public static string url = "http://10.0.22.5:9000";

        public static async Task<ProfileModel> getProfileById(int userId)
        {
            using (var client = new HttpClient())
            {
                string token = await SecureStorage.GetAsync("userToken");
                client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);
                client.BaseAddress = new Uri(url);
                var uri = $"/users/{userId}";
                var result = await client.GetStringAsync(uri);

                return JsonConvert.DeserializeObject<ProfileModel>(result);
            }
        }

        public static async Task<IEnumerable<PictureCatalogModel>> getAllPictures()
        {
            using (var client = new HttpClient())
            {
                string token = await SecureStorage.GetAsync("userToken");
                client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);
                client.BaseAddress = new Uri(url);
                var uri = "/pictures";
                var result = await client.GetStringAsync(uri);

                return JsonConvert.DeserializeObject<List<PictureCatalogModel>>(result);
            }
        }

        public static async Task<IEnumerable<AdsModel>> getAds()
        {
            using (var client = new HttpClient())
            {
                string token = await SecureStorage.GetAsync("userToken");
                client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);
                client.BaseAddress = new Uri(url);
                var uri = "/ads";
                var result = await client.GetStringAsync(uri);

                return JsonConvert.DeserializeObject<List<AdsModel>>(result);
            }
        }

        public static async Task deleteAd(int adId)
        {
            using (var client = new HttpClient())
            {
                string token = await SecureStorage.GetAsync("userToken");
                client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);
                client.BaseAddress = new Uri(url);
                var uri = $"/ads/{adId}";
                HttpResponseMessage response = await client.DeleteAsync(uri);

                return;
            }
        }

        public static async Task<IEnumerable<CountyModel>> getCounties()
        {
            using (var client = new HttpClient())
            {                                                
                client.BaseAddress = new Uri(url);
                var uri = "/counties";
                var result = await client.GetStringAsync(uri);

                return JsonConvert.DeserializeObject<List<CountyModel>>(result);
            }
        }

        public static async Task<IEnumerable<SettlementModel>> getSettlements()
        {
            using (var client = new HttpClient())
            {          
                client.BaseAddress = new Uri(url);
                var uri = "/settlements";
                var result = await client.GetStringAsync(uri);

                return JsonConvert.DeserializeObject<List<SettlementModel>>(result);
            }
        }

        public static async Task<IEnumerable<string>> getUploads()
        {
            using (var client = new HttpClient())
            {
                string token = await SecureStorage.GetAsync("userToken");
                client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);
                client.BaseAddress = new Uri(url);
                var uri = "/pictures/upload";
                var result = await client.GetStringAsync(uri);

                return JsonConvert.DeserializeObject<List<string>>(result);
            }
        }
        public static async Task<string[]> getFavorites()
        {
            int uId = Int32.Parse(await SecureStorage.GetAsync("userId"));
            ProfileModel localU = await getProfileById(uId);         
            string storedFavoritesList = localU.favourites;
            string[] storedFavorites = storedFavoritesList.Split(" + ");
            for (int i = 0; i < storedFavorites.Length; i++)
            {
                if (storedFavorites[i].Contains(" +"))
                {
                    storedFavorites[i] = storedFavorites[i].Replace(" +", "");
                }
            }           
            return storedFavorites;
        }
        public static async Task<RegisterModel> register(RegisterModel user)
        {
            RegisterModel errorRegister = new RegisterModel();

            string jsonData = JsonConvert.SerializeObject(user);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpClient client = new HttpClient();
            HttpResponseMessage response = await client.PostAsync(url + "/register", content);

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

        public static async Task resetPwd(string email)
        {
            await SecureStorage.SetAsync("resetMail", email);
            string jsonData = JsonConvert.SerializeObject(new
            {
                email = email
            });
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpClient client = new HttpClient();            
            HttpResponseMessage response = await client.PostAsync(url + "/users/resetpassword", content);
            string result = await response.Content.ReadAsStringAsync();
        }

        public static async Task resetPwdCode(string code)
        {
            string resetMail = await SecureStorage.GetAsync("resetMail");
            string jsonData = JsonConvert.SerializeObject(new
            {
                token = code.ToUpper(),
                email = resetMail
            });
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpClient client = new HttpClient();            
            HttpResponseMessage response = await client.PostAsync(url + "/users/authorizereset", content);
            string result = await response.Content.ReadAsStringAsync();
            await SecureStorage.SetAsync("resetToken", result);
        }
        public static async Task resetPwdFinal(string newPassword)
        {
            string resetToken = await SecureStorage.GetAsync("resetToken");
            string[] fullJWT = resetToken.Split(':');
            var fullResult = fullJWT[1].Trim('"');
            string[] trimmedJWT = fullResult.Split('"');
            var trimmedResult = trimmedJWT[0];
            string jsonData = JsonConvert.SerializeObject(new
            {                
                password = newPassword
            });
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpClient client = new HttpClient();            
            client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", trimmedResult);
            HttpResponseMessage response = await client.PostAsync(url + "/users/newpassword", content);
            string result = await response.Content.ReadAsStringAsync();            
        }

        public static async Task<string> login(string email, string password)
        {
            string jsonData = JsonConvert.SerializeObject(new { email = email, password = password });
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
                
                string[] fullJWT = result.Split(':');
                var fullResult = fullJWT[1].Trim('"');
                string[] trimmedJWT = fullResult.Split('"');
                var trimmedResult = trimmedJWT[0];                
                string[] payload = trimmedResult.Split('.');
                var finalPayload = payload[1];

                var Result = JWTTokenService.DecodeJwt(JWTTokenService.ConvertJwtStringToJwtSecurityToken(trimmedResult));
                string[] ResultwithoutMustacheOne = Result[0].ToString().Split("{");
                string[] ResultwithoutMustachetwo = ResultwithoutMustacheOne[1].Split("}");                
                string[] finalResult = ResultwithoutMustachetwo[0].Split(",");

                string userImage = null;

                foreach (string item in finalResult)
                {
                    string[] keyValue = item.Split(':');
                    if (keyValue.Length >= 2)
                    {
                        string key = keyValue[0].Trim('"');
                        string value = string.Join(":", keyValue.Skip(1)).Trim('"');

                        if (key == "pPic")
                        {
                            userImage = value;
                            break;
                        }
                    }
                }
                if (userImage != null)
                {
                    await SecureStorage.SetAsync("userImage", userImage);
                }                
                await SecureStorage.SetAsync("userId", finalResult[0].Split(':')[1].Trim('"'));
                await SecureStorage.SetAsync("userName", finalResult[1].Split(':')[1].Trim('"'));
                await SecureStorage.SetAsync("userEmail", finalResult[2].Split(':')[1].Trim('"'));
                await SecureStorage.SetAsync("userLocation", finalResult[3].Split(':')[1].Trim('"'));                
                await SecureStorage.SetAsync("userRole", finalResult[5].Split(':')[1].Trim('"'));
                await SecureStorage.SetAsync("userFavorites", finalResult[6].Split(':')[1].Trim('"'));
                await SecureStorage.SetAsync("userPhone", finalResult[7].Split(':')[1].Trim('"'));
                await SecureStorage.SetAsync("userToken", trimmedResult);

                return null;

            }
        }

        public static async Task newPassword(string newPwd)
        {
            string jsonData = JsonConvert.SerializeObject(new
            {
                newpassword = newPwd
            });
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpClient client = new HttpClient();
            string token = await SecureStorage.GetAsync("userToken");
            client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", token);
            HttpResponseMessage response = await client.PostAsync(url + "/users/newpassword", content);
            string result = await response.Content.ReadAsStringAsync();

        }
            public static async Task<string> profilePictureUpdate(int id, string picUrl)
        {
            string jsonData = JsonConvert.SerializeObject(new {
                id = id,
                pPic = picUrl });
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpClient client = new HttpClient();
            string token = await SecureStorage.GetAsync("userToken");
            client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", token);
            HttpResponseMessage response = await client.PostAsync(url + "/users/changepicture", content);
            string result = await response.Content.ReadAsStringAsync();

            if ((int)response.StatusCode == 401)
            {
                return "error";
            }
            else
            {
                string success = "success";
                await SecureStorage.SetAsync("success", success);
                return null;
            }
        }

        public static async Task<string> profileUpdate(int id, string userName, string userEmail, string userLocation, string userPic, int userRole,string userFavorites, string userMobile)
        {
            string jsonData = JsonConvert.SerializeObject(new
            {
                id = id,
                name = userName,
                email = userEmail,
                location = userLocation,
                pPic = userPic,
                role = userRole,
                favourites = userFavorites,
                phone = userMobile
            });
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpClient client = new HttpClient();
            string token = await SecureStorage.GetAsync("userToken");
            client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", token);
            HttpResponseMessage response = await client.PutAsync(url + "/users/put", content);
            string result = await response.Content.ReadAsStringAsync();

            if ((int)response.StatusCode == 401)
            {
                return "error";
            }
            else
            {
                string success = "success";
                await SecureStorage.SetAsync("success", success);
                await SecureStorage.SetAsync("userId", id.ToString());
                await SecureStorage.SetAsync("userName", userName);
                await SecureStorage.SetAsync("userEmail", userEmail);
                await SecureStorage.SetAsync("userLocation", userLocation);
                await SecureStorage.SetAsync("userRole", userRole.ToString());
                await SecureStorage.SetAsync("userFavorites", userFavorites);
                await SecureStorage.SetAsync("userPhone", userMobile);
                return null;
            }
        }

        public static async Task<string> adProfileFav(int adId)
        {
            string jsonData = JsonConvert.SerializeObject(new
            {
                adId = adId,               
            });
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpClient client = new HttpClient();
            string token = await SecureStorage.GetAsync("userToken");
            client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", token);
            HttpResponseMessage response = await client.PostAsync(url + "/users/addfavourite", content);
            string result = await response.Content.ReadAsStringAsync();

            if ((int)response.StatusCode == 401)
            {
                return "error";
            }
            else
            {              
                return null;
            }
        }


        public static async Task<string> newAdvertisementUpload(string name, string description, string category, int price, int countyId, string settlement, int ownerId)
        {
            string jsonData = JsonConvert.SerializeObject(new {
                name = name,
                description = description,
                category = category,
                price = price,
                countyId = countyId,
                settlement = settlement,
                ownerId = ownerId
            });           
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpClient client = new HttpClient();
            string token = await SecureStorage.GetAsync("userToken");
            client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", token);
            HttpResponseMessage response = await client.PostAsync(url + "/ads/post", content);
            string result = await response.Content.ReadAsStringAsync();

            if ((int)response.StatusCode == 401)
            {
                return "error";
            }
            else
            {
                await SecureStorage.SetAsync("uploaded", true.ToString());
                return null;
            }
        }
        public static async Task<string> UpdateAdvertisementUpload(string name, string description, string category, int price, int countyId, string settlement, int ownerId)
        {
            string jsonData = JsonConvert.SerializeObject(new
            {
                name = name,
                description = description,
                category = category,
                price = price,
                countyId = countyId,
                settlement = settlement,
                ownerId = ownerId
            });
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpClient client = new HttpClient();
            string token = await SecureStorage.GetAsync("userToken");
            client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", token);
            HttpResponseMessage response = await client.PostAsync(url + "/ads/post", content);
            string result = await response.Content.ReadAsStringAsync();

            if ((int)response.StatusCode == 401)
            {
                return "error";
            }
            else
            {
                await SecureStorage.SetAsync("uploaded", true.ToString());
                return null;
            }
        }
        private static async Task getAllAds()
        {
            advertisements.Clear();
            IEnumerable<AdsModel> list = await getAds();
            list.ToList().ForEach(p => advertisements.Add(p));
        }
        public static async Task<string> imageUpload(int userId, int imgId) 
        {
            string Dummyname = "dummy";
            string Dummydescription = "dummy";
            string Dummycategory = "dummy";
            int Dummyprice = 1;
            int DummycountyId = 3;
            string Dummysettlement = "dummy";
            int DummyownerId = 3;
            string dummyJsonData = JsonConvert.SerializeObject(new
            {
                name = Dummyname,
                description = Dummydescription,
                category = Dummycategory,
                price = Dummyprice,
                countyId = DummycountyId,
                settlement = Dummysettlement,
                ownerId = DummyownerId
            });
            StringContent dummyContent = new StringContent(dummyJsonData, Encoding.UTF8, "application/json");
            HttpClient dummyClient = new HttpClient();
            string dummyToken = await SecureStorage.GetAsync("userToken");
            dummyClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", dummyToken);
            HttpResponseMessage dummyResponse = await dummyClient.PostAsync(url + "/ads", dummyContent);
            string dummyResult = await dummyResponse.Content.ReadAsStringAsync();
            await getAllAds();
            int adId = 0;
            for (int i = 0; i < advertisements.Count(); i++)
            {
                if (adId < advertisements[i].id)
                {
                    adId = advertisements[i].id;
                }
            }
            await deleteAd(adId);
            adId++;            

            var uploadFile = await MediaPicker.PickPhotoAsync();

            if (uploadFile == null) return "error";

            var httpContent = new MultipartFormDataContent();         
            string[] fileType = uploadFile.FileName.Split('.');
            uploadFile.FileName = $"{userId}_{adId}_{imgId}.{fileType[1]}";
            httpContent.Add(new StreamContent(await uploadFile.OpenReadAsync()), "file", uploadFile.FileName);
            
            var httpClient = new HttpClient();
            string token = await SecureStorage.GetAsync("userToken");
            httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", token);
            var result = await httpClient.PostAsync($"{url}/pictures/upload", httpContent);
            var response = await result.Content.ReadAsStringAsync();
            //await Shell.Current.DisplayAlert("Response from server", response, "K");
            await SecureStorage.SetAsync("imgId", imgId.ToString());
            return "";
        }
        public class TokenResponse
        {
            public string Token { get; set; }
        }

        public static async Task postSupport(string title, string question)
        {            
            string jsonData = JsonConvert.SerializeObject(new
            {               
               title = title,
               question= question
            });
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            using (var client = new HttpClient())
            {
                string token = await SecureStorage.GetAsync("userToken");
                client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);
                client.BaseAddress = new Uri(url);
                var uri = "/users/support";
                HttpResponseMessage response = await client.PostAsync(uri , content);
                string result = await response.Content.ReadAsStringAsync();
                return;
            }
        }

        public static async Task postSub()
        {            
            using (var client = new HttpClient())
            {
                string token = await SecureStorage.GetAsync("userToken");
                client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);
                client.BaseAddress = new Uri(url);
                var uri = "/users/subscribe";
                HttpResponseMessage response = await client.GetAsync(uri);
                string result = await response.Content.ReadAsStringAsync();
                return;
            }
        }

        public static async Task postNewPwd(string newPwd)
        {
            string jsonData = JsonConvert.SerializeObject(new
            {
                password = newPwd,
            });
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            using (var client = new HttpClient())
            {
                string token = await SecureStorage.GetAsync("userToken");
                client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);
                client.BaseAddress = new Uri(url);
                var uri = "/users/newpassword";
                HttpResponseMessage response = await client.PostAsync(uri, content);
                string result = await response.Content.ReadAsStringAsync();
                return;
            }
        }

    }
}
