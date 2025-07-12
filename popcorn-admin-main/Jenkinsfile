pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'docker build -t ${IMAGE}:${BUILD_ID} .'
            }
        }
        stage('Push') {
            steps {
                echo 'Pushing...'
                sh 'docker tag ${IMAGE}:${BUILD_ID} pratikgaikwad/${IMAGE}:${BUILD_ID}'
                withCredentials([string(credentialsId: 'DOCKER_PASSWORD', variable: 'DOCKER_PASSWORD')]) {
                    sh 'docker login -u ${DOCKER_USERNAME} -p $DOCKER_PASSWORD'
                }
                sh 'docker push pratikgaikwad/${IMAGE}:${BUILD_ID}'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                sh 'docker run -v /home/pratik/projects/popcorn-admin:/app/dist --rm pratikgaikwad/${IMAGE}:${BUILD_ID}'
            }
        }
        stage('Remove') {
            steps {
                echo 'Removing Image....'
                sh 'docker rmi pratikgaikwad/${IMAGE}:${BUILD_ID}'
            }
        }
    }
    post {
        success {
            emailext attachLog: true, body: 'Email send from jenkins', subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!', to: 'pratik.gaikwad.dev@hotmail.com'
        }
        failure {
            emailext attachLog: true, body: 'Email send from jenkins', subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!', to: 'pratik.gaikwad.dev@hotmail.com'
        }
    }
}