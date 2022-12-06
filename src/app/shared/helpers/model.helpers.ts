// $ Helpers para los modelos de Seccion, Objetivo y Tarea

/**
 * ? Método para calcular el porcentaje realizado de un Modelo respecto a la lista de modelos necesarios para completarlo
 * @param arrayModel - Lista de modelos del que depende el progreso del Modelo que llama al método
 * @returns {number} - Porcentaje redondeado a dos decimales del progreso realizado
 */
export const calculatePercentage = (arrayModel: any[]) => {
  let count = 0;
  let countDone = 0;
  for (const model of arrayModel) {
    count++;
    model.isDone && countDone++;
  }

  return Math.round((100 * ((100 * countDone) / count + Number.EPSILON)) / 100);
};
