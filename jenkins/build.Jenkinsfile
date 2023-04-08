@Library('common') _

buildPipeline([
  name:           'blog-client',
  dockerfile:     'prod.Dockerfile',
  buildConfig:    'blog-client',
  buildConfigKey: 'env',
  buildNamesapce: 'service',
  manifestRepo:   'git@github.com:qwp0905/kubernetes.git',
  manifestDir:    'service/blog-client/values.yml'
])