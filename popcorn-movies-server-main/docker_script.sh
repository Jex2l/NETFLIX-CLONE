#!/bin/bash

IMAGE=$IMAGE_NAME

echo "****************************************************************"
echo "***** Building the docker image for the popcorn-data-server ****"
echo "****************************************************************"
docker build -t $IMAGE:$BUILD_ID .

echo "****************************************************************"
echo "**************** PUSHING IMAGE TO DOCKERHUB ********************"
echo "****************************************************************"
docker tag $IMAGE:$BUILD_ID pratikgaikwad/$IMAGE:$BUILD_ID
docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
docker push pratikgaikwad/$IMAGE:$BUILD_ID

echo "****************************************************************"
echo "**************** Stoping previous containers *******************"
echo "****************************************************************"
docker stop popocorn-data

sleep 5

echo "****************************************************************"
echo "*********************** Deploying Image ************************"
echo "****************************************************************"
docker run -d -p 8000:8000 --rm -v popcorn_popcorn_images:/app/images -v popcorn_popcorn_videos:/app/videos --network popcorn_network --name popocorn-data pratikgaikwad/$IMAGE:$BUILD_ID

echo "****************************************************************"
echo "**************** Removing previous image *******************"
echo "****************************************************************"
docker image prune -a -f




