// $ Helpers para los modelos de Seccion, Objetivo y Tarea

/**
 * ? Método para calcular el porcentaje realizado de un Modelo respecto a la lista de modelos necesarios para completarlo
 * @param arrayModel - Lista de modelos del que depende el progreso del Modelo que llama al método
 * @returns {number} - Porcentaje redondeado a dos decimales del progreso realizado
 */
export const calculatePercentage = (arrayModel: any[]): number => {
  let countDone = 0;
  for (const model of arrayModel) {
    model.isDone && countDone++;
  }
  return Math.round(
    (100 * ((100 * countDone) / arrayModel.length + Number.EPSILON)) / 100
  );
};
