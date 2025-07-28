module.exports = {
  default: {
    // Especifica la ruta a tus archivos de features.
    paths: ['features/**/*.feature'],

    // Le dice a Cucumber dónde encontrar tus definiciones de pasos y archivos de soporte.
    require: [
      'step_definitions/world.js',
      'step_definitions/**/*.js',
      'support/**/*.js'
    ],

    // Define el formato de la salida en la consola y para los reportes.
    format: [
      'progress-bar',                               // barra de progreso
      'json:reports/report.json'                    // JSON compatible con html-formatter
    ],

    // Permite pasar parámetros a tu World personalizado.
    worldParameters: {
      baseUrl: 'https://test-adl.leonardojose.dev/'
    },

    // Aumenta el timeout general (20 segundos por step)
    timeout: 40000
  }
};
