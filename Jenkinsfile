pipeline {
    agent any

    environment {
        S3_BUCKET = 'rushik-first-s3bucket'
        REPO_URL = 'https://github.com/rushikpatel08/angular-app.git'
        IMAGE_NAME = 'angular_app'
        CONTAINER_NAME = 'angular_container'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master', url: "${REPO_URL}"
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${IMAGE_NAME} .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withDockerRegistry([credentialsId: 'docker-hub-credentials', url: '']) {
                    sh 'docker tag ${IMAGE_NAME} your-dockerhub-username/${IMAGE_NAME}'
                    sh 'docker push your-dockerhub-username/${IMAGE_NAME}'
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-key-pair']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ec2-user@ec2-3-92-255-138.compute-1.amazonaws.com '
                        docker pull your-dockerhub-username/${IMAGE_NAME} &&
                        docker stop ${CONTAINER_NAME} || true &&
                        docker rm ${CONTAINER_NAME} || true &&
                        docker run -d --name ${CONTAINER_NAME} -p 80:80 your-dockerhub-username/${IMAGE_NAME}'
                    """
                }
            }
        }
    }
}
