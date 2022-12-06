import { Objetive } from "./objetive.model";

/**
 * ? Tipo de prioridades de las posibles tareas
 */
export type TTaskPriority = 'p-1' | 'p-2' | 'p-3' | 'p-4' | 'p-5' | 'URGENTE';

/**
 * ? Tipo de tarea a realizar
 */
export type TTaskType = 'Bug' | 'Implementar' | 'Fix' | 'Revisar' | 'Idea';

/**
 * ? Modelo de tarea a crear
 */
export class Task {
  // ANCHOR - Variables
  // id: string;
  name: string;
  description: string;
  priority: TTaskPriority;
  type: TTaskType;
  objetive: string;
  isDone: boolean;

  // ANCHOR - Constructor
  constructor(
    name: string,
    description: string,
    priority: TTaskPriority,
    type: TTaskType,
    objetive: string
  ) {
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.type = type;
    this.objetive = objetive;
    this.isDone = false;
  }

  // ANCHOR - Métodos

  // TODO - Implementar metodo para recuperar el objeto del objetivo completo.
  /**
   * ? Método para recuperar el objetivo de la tarea
   */
  public getObjetive() : Objetive {
    return new Objetive();
  }
}
