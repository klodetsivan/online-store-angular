class AppConfig {

    // Database: 
    public connectionString = "mongodb://127.0.0.1:27017/online-store"; // Fill db name

    // Server port: 
    public port = 3001;

}

const appConfig = new AppConfig();

export default appConfig;