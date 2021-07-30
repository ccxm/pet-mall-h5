// 前端项目JenkinsFile配置，后端项目配置稍有不同，后面会区分说明
pipeline {
    agent any

    parameters {
        gitParameter branchFilter: 'origin/(.*)', defaultValue: 'develop', name: 'BRANCH', type: 'PT_BRANCH_TAG'
        choice(
                description: '你需要选择哪个环境进行部署：',
                name: 'env',
                choices: ['develop', 'production']
        )
        choice(
                description: '部署端口：',
                name: 'port',
                choices: [5005, 5010]
        )
        string(name: 'update', defaultValue: '', description: '本次更新内容?')
    }

    environment {
        project_name = "${JOB_NAME}_${params.env}"
        port = "${params.port}"
        mappingPort = "${params.port}"
    }

    triggers {
        GenericTrigger(
                causeString: 'Generic Cause',
                genericVariables: [[defaultValue: '', key: 'ref', regexpFilter: '', value: '$.ref']],
                regexpFilterExpression: '^(refs/heads/develop)$',
                regexpFilterText: '$ref',
                token: '11ce6f6159dbd8f0a57f19ea74c849590c',
                tokenCredentialId: ''
        )
    }

    stages {
        stage('拉取代码') {
            steps {
                git([branch: '${BRANCH}', credentialsId: 'c5295538-6e4c-41bc-b0b7-df177e90a685', url: 'https://gitee.com/yang-shaoxin/pet-mall-front.git'])
            }
        }


        stage('安裝依賴') {
            steps {
                nodejs('nodejs') {
                    sh "pwd"
                    sh "node -v"
                    sh "npm install"
                }
            }
        }

        stage('打包') {
            steps {
                nodejs('nodejs') {
                    sh "pwd"
                    sh "npm run build"
                }
            }
        }

        stage('部署') {
            steps {
                script {
                    sh "pwd"
                    sh "docker stop ${project_name} || true"
                    sh "docker rm ${project_name} || true"
                    sh "docker image build ./ -t ${project_name}"
                }
            }
        }

        stage('发布') {
            steps {
                script {
                    echo "端口号： ${port}"
                    sh "docker run -d --name ${project_name} -p ${port}:80 ${project_name}"
                }
            }
        }
    }

    post {
        always {
            emailext(
                    subject: '构建通知：${PROJECT_NAME} - Build # ${BUILD_NUMBER} - ${BUILD_STATUS}!',
                    body: '${FILE,path="email.html"}',
                    to: '1532917281@qq.com'
            )
        }
    }
}

docker run \
  -u root \
  --rm \
  -d \
  -p 6888:8080 \
  -p 50001:50000 \
  -v /var/cxm-jenkins-data:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkinsci/blueocean
