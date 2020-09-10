# URL shortening service

JavaScript frontend for shortening URLs. 

## Requirements
- Web server
- JavaScript enabled browser
### Build requirements
- Docker

## Docker installation
1. Clone/Download this repo `git clone https://github.com/Arelam/URL-shortening-service.git`
2. Build app container `docker build -t urlshort .`
3. Start container `docker run -it --rm --detach --publish 8080:80 --name urls urlshort`
4. Visit  [http://localhost:8080](http://localhost:8080).

## Manual installation
1. Copy files from web directory to accessible web folder/root.
2. Visit  [http://localhost:8080](http://localhost:8080).