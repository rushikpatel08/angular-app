pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-1'
        S3_BUCKET = 'rushik-first-s3bucket'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master', url: 'https://github.com/rushikpatel08/angular-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Angular App') {
            steps {
                sh 'ng build --configuration=production'
            }
        }

        stage('Deploy to S3') {
            steps {
                sh """
                    aws s3 sync dist/your-angular-app-name/ s3://$S3_BUCKET --delete
                """
            }
        }
    }
}