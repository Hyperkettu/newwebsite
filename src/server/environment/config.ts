import { ServerConfig } from '../types/server-config';

export const config: ServerConfig = {
    serverAddress: 'localhost', 
    serverPort: 4025, 
    mysql: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'Weight' 
    }
}
