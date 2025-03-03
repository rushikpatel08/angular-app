pipeline {
    agent any

    environment {
        S3_BUCKET = 'rushik-first-s3bucket'
        REPO_URL = 'https://github.com/rushikpatel08/angular-app.git'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: "${REPO_URL}"
            }
        }

        stage('Build Angular App') {
            steps {
                sh 'npm install'
                sh 'ng build --configuration production'
            }
        }

        stage('Deploy to S3') {
            steps {
                sh '''
                aws s3 sync dist/angular-app s3://${S3_BUCKET} --delete
                '''
            }
        }
    }
}
