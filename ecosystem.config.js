module.exports = [{
  script: 'app.js',
  name: 'svr',
  exec_mode: 'cluster',
  instances: 1,
  out_file: "dev/null",
  error_file: "dev/null"
}]
