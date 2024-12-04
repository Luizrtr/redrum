 # Redrum APP 🎲
> This repository is dedicated to service management with real-time dashboard functionality.

## Getting Started 🧑🏾‍💻

To get started, ensure you have set up the environment variables in the `.env` file:

```bash
HOST=localhost:3000
MONGODB=mongodb:your-database
```
Replace your-database with the name of your MongoDB database.

Once the environment variables are configured, proceed to run the development server:
```
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
After launching the server, open your preferred web browser and navigate to the specified HOST to access the application.

## Additional Information
For further insights into the project and its features, please refer to the project's documentation or explore the source code.

## Contributing
Contributions are highly appreciated! Please adhere to the guidelines outlined in the CONTRIBUTING.md file.

## License
This project is licensed under the MIT License.

## docker-composer.yml
```
services:
  mongo:
    container_name: mongo
    image: mongo:7.0.12
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: 89551
    ports:
      - "27017:27017"
    volumes:
      - ./data:/data/db
    
  mongo-express:
    container_name: mongo-express
    image: mongo-express
    depends_on:
      - mongo
    environment:
      ME_CONFIG_MONGODB_URL: mongodb://root:89551@mongo:27017/
      ME_CONFIG_BASICAUTH: true
      ME_CONFIG_MONGODB_ADMINUSERNAME: root
      ME_CONFIG_MONGODB_ADMINPASSWORD: 89551
      ME_CONFIG_BASICAUTH_USERNAME: luiz
      ME_CONFIG_BASICAUTH_PASSWORD: 89551
    ports:
      - "8001:8081"
```
