export interface ServerConfig {
    serverPort: number;
    serverAddress: string;
    mysql: MySqlConfig;
}

interface MySqlConfig {
    host: string;
    user: string;
    password: string;
    database: string;
}