pipeline {
  agent { node { label 'agent' } }

  parameters { 
    string(
      name: 'DEPLOY_TAG',
      defaultValue: "${sh(returnStdout: true, script: 'git log -1 --format=%H | head -n 1')}",
      description: 'Deploy tag'
    )
  }

  environment {
    APP              = 'blog-client'
    AWS_ECR_REGISTRY = credentials('aws-ecr-registry')
    COMMIT_MESSAGE   = "${sh(returnStdout: true, script: 'git log -1 --pretty=%B | head -n 1')}"
    MESSAGE          = "$JOB_NAME#$BUILD_NUMBER\n$COMMIT_MESSAGE\n$BUILD_URL"
  }

  stages {
    stage('Initialization') {
      parallel {
        stage('Set Build Name') {
          steps {
            buildName("[$BUILD_NUMBER] $COMMIT_MESSAGE")
          }
        }

        stage('Configure Aws Credentials') {
          environment {
            RANDOM_STRING = UUID.randomUUID().toString()
          }

          steps {
            container('aws-cli') {
              sh('aws ecr get-login-password --region ap-northeast-2 > $RANDOM_STRING.txt')
            }

            container('helm') {
              sh('cat $RANDOM_STRING.txt | helm registry login -u AWS --password-stdin $AWS_ECR_REGISTRY')
            }

            sh('rm -f $RANDOM_STRING.txt')
          }
        }
      }
    }

    stage('Build & Push') {
      steps {
        container('helm') {
          sh('kubectl get cm $APP -n default -o jsonpath={.data.env} > .env')
        }

        container('docker') {
          sh('docker build --platform linux/amd64 -f prod.Dockerfile -t $AWS_ECR_REGISTRY/$APP:$COMMIT_HASH .')
          sh('docker push $AWS_ECR_REGISTRY/$APP:$COMMIT_HASH')
        }
      }
    }
  }

  post {
    success {
      slackSend(channel: 'testtest', color: 'good', message: "[Success] $MESSAGE")
    }
    failure {
      slackSend(channel: 'testtest', color: 'danger', message: "[Failed] $MESSAGE")
    }
    unstable {
      slackSend(channel: 'testtest', color: 'warning', message: "[Unstable] $MESSAGE")
    }
  }
}