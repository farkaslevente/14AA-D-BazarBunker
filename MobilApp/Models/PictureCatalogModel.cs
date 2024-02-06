using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MobilApp_Szakdolgozat.Models
{
    public class PictureCatalogModel
    {
        public int? Id { get; set; }
        public string Url { get; set; }

        public PictureCatalogModel(MySqlDataReader reader) 
        {
            this.Id = (int?)Convert.ToInt32(reader["id"]);
            this.Url = reader["url"].ToString();
        }

        public PictureCatalogModel(int? Id, string Url) 
        {
            this.Id = Id;
            this.Url = Url;
        }

        public static List<PictureCatalogModel> select() 
        {
            var list = new List<PictureCatalogModel>();
            using (var con = new MySqlConnection(ConfigurationManager.ConnectionStrings["connectionString"].ConnectionString)) 
            {
                con.Open();
                var sql = "SELECT * FROM kepek";
                using (var cmd = new MySqlCommand(sql, con))
                {
                    using (var reader = cmd.ExecuteReader()) 
                    { 
                        while (reader.Read()) 
                        {
                            list.Add(new PictureCatalogModel(reader));
                        }
                    }
                }
                con.Close();
            }
            return list;
        }
    }
}
