@Library('common') _

buildPipeline(
  name: 'blog-client',
  dockerfile: 'prod.Dockerfile',
  buildConfig: 'blog-client',
  buildConfigKey: 'env',
  manifestUrl: 'git@github.com:qwp0905/kubernetes.git',
  manifestDir: 'blog-client/values.yml'
)