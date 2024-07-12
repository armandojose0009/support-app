# Node.js Project
This is a small and simple support system that connects to a Google Drive spreadsheet as well as a MongoDB connection. This project uses Node.js with Express for faster development, leveraging its robustness and efficiency in creating APIs and web services. Additionally, it uses the Google Sheets API to manage data in a Google spreadsheet, allowing for efficient and scalable data storage and querying.

The frontend of the application is developed in React, chosen for its ability to create interactive and dynamic user interfaces. Combined with Node.js on the backend, it provides a complete architecture that facilitates agile development and integration between the frontend and backend.

## Requirements

- Docker
- Docker Compose
- Node.js (optional, if you want to run the application without Docker)

## Configuration

### Environment Variables

For the application to work correctly, you need to configure the following environment variables in a `.env` file in the `backend` folder:

```plaintext
GOOGLE_SERVICE_ACCOUNT_TYPE=service_account
GOOGLE_SERVICE_ACCOUNT_PROJECT_ID=test2-429004
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_ID=e57137e614913228f76c09763074f37d3b17bcfe
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCVkxdWhxIU5rQU\n+xict5GyxDm7l3kO+b6OJ4kE5LwBFGOlROIkO1dQN8eRLfDs7dJ+lTgR5XjZYD8p\nxlnhp+TITkzhznEmSACKjRKgsVQjAzXvCdrX/k9ejaU3/9LRzLKy2hMvDb6WVtxk\n3uJQEYqVPfb4wXidPBY9skcd/9IYeAlw60hbwH+90yaa0WffAucZrGdPWFvVaksI\nEbvMOsc+tkoJOyXfsytYpVKM2rzpG9yiTSiw05X4yS7OdCqrM+xaYUzV2tNT73mT\nBdA7VC5GiKZjUlIhOH4zItPTMJJgOWhDVNcNn0qgbAMT/Q3IyM2GUHdz6QbJnpLu\nmzLFW5VlAgMBAAECggEAB4QvarcO6Y35BAo6NRCPJHSdPMK33/tyNU03TXpRGEd2\nBRrDt8kOR4cGDahJWx6jB/QSWpPgJsxMtZoKGj+ITP3iTyvt87Ev6xvRESeCxYpR\nGNoIl/dnoFDDOgqDsEH2bkEXMF4jHbBFEwHq+CsUKREcFWljg5iUEDWil+yrGh+a\nbwpzfklFnbERoMyNXDJMqUKFM2BGffdKjzs6shpqOl3XVM8wh59nUc6DDnRhCoIw\n5gnQxMJN8mGPR1q9iyAAvlCSg1SgO2gMvuIat34D8WjgjiftvDXRebwVjcxLvvqo\nIO0m4EZzQsj7FobotB6dR19tUGLATM/p0O0Z9592YQKBgQDE6zoF1n65LCNFHhOs\nyT2GWaGTW2eZvWKoFcNtCc6uahG0BN3Wh9vL1hiifSnfzRFN0LqVN9qgVyVNxa1h\nrU2COm3YOr+Kkar+tJpBRE7bz+Cr1Fuo0tIswNXCk92XUPZKxkganH9Ji9heScuC\nhj+szrHAF2pL58eLdlqNUH8KbwKBgQDCc3xpbun/PTdK2fRj91OCrQkU/1SGiCMq\nNnfSmCcl7sF5aaLAMygXEpNbhDr006dqu5iuHbwDkey3F1ZDCvFOr7TKU6jKub8u\nq4RO/wxPZhzxg1FbqpLbiOC2GhNuQ59tbiEQzPQy8M0FN3xvP3q3XUqbmW63L1lP\n9IB5JPHXawKBgG/wo/hDmaAcBiS5V0fm0hG4jBAfasJLlXSlgoVOiO4/H7cs+QqG\nCp1SJIjiC9bMVSTeHeLLcH2rbGpMkCYxhRkdq+m6Y74a1pCaDAJEGWv9POORAVX0\nGkQUjq9grRvii0+wbbaq9fTSCXp4Crc1J6dNjF/9L5DcvmN6MTmZ484DAoGAP95a\n4O6TYUikHqvUP/l+ro9TSlhLVRzmH/lgBgX/5c+0MMLnuCWVZ26shAS8sKnMdZxE\nm/wcQzfs/n5l0QOJGwVPZp1v9ZZpG1Uu0hun2XR60UEGugsezYj59hY+h5sihHkF\n11TaaNj7HlmJP6kkD5JO7SjKWtTsivyOLjxaSx0CgYEAk2UlSUxDWnKmM+Mul3aN\n0FHJzOM3VZeNl/ZNQQmiLaDVFBrIbjyybDkj74axil6EaebiXWltaCBUu9Qjm3qG\nIpZQQpvc33/xZOw4tib9HggPYn3zkx4JrixxBfMWF29fhd72SSsbxS7sZyWKaCnG\nVu0g01T4ng8hO0605MJvFFk=\n-----END PRIVATE KEY-----\n"
GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL=test2-311@test2-429004.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_CLIENT_ID=118106444541600769826
GOOGLE_SERVICE_ACCOUNT_AUTH_URI=https://accounts.google.com/o/oauth2/auth
GOOGLE_SERVICE_ACCOUNT_TOKEN_URI=https://oauth2.googleapis.com/token
GOOGLE_SERVICE_ACCOUNT_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
GOOGLE_SERVICE_ACCOUNT_CLIENT_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/test2-311%40test2-429004.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_UNIVERSE_DOMAIN=googleapis.com


HOSTMONGO=localhost
PORTMONGO=27017
DATABASEMONGO=support-app
```

## Setup Instructions
- Clone this repository to your local machine.
- Navigate to the `backend` folder.
- Create a `.env` file and add the environment variables mentioned above.

### Running the Application

To start the application using Docker Compose, run the following command in the root directory of the project:

```
docker-compose build && docker-compose up -d
```

This will start both the frontend and backend of the application.

## Accessing the Application

  The frontend application will be available at: `http://localhost:3000`
  
  The backend API will be available at: `http://localhost:3001`
  
## Project Structure

    frontend: Contains the frontend code of the application.
    backend: Contains the backend code of the application.

## Using Google Sheets API

The backend of the application uses the `google-spreadsheet` library to interact with the Google Sheets API.

Key Functions:

  - **Reading Data:** Reads data from a Google spreadsheet.
  - **Updating Data:** Updates data in the spreadsheet based on the provided information.
  