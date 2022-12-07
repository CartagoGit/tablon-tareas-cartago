/**
 * ? Tipo de prioridades de las posibles tareas
 */
export type TTaskPriority = 'p-1' | 'p-2' | 'p-3' | 'p-4' | 'p-5' | 'URGENTE';

/**
 * ? Tipo de tarea a realizar
 */
export type TTaskType = 'Bug' | 'Implementar' | 'Fix' | 'Revisar' | 'Idea';

/**
 * ? Interface del objeto a recibir en el constructor
 */
export interface ITaskConstructor {
  id: string;
  name: string;
  description?: string;
  priority: TTaskPriority;
  type: TTaskType;
  objetiveId: string;
}

/**
 * ? Modelo de tarea a crear
 */
export class Task {
  // ANCHOR - Variables
  public name: string;
  public description: string | undefined;
  public priority: TTaskPriority;
  public type: TTaskType;
  public objetiveId: string;
  public isDone: boolean;

  private _id: string;
  get id(): string {
    return this._id;
  }

  // ANCHOR - Constructor

  private constructor(taskConstructor: ITaskConstructor) {
    const {
      id,
      name,
      description = undefined,
      priority,
      type,
      objetiveId,
    } = taskConstructor;

    //* public
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.type = type;
    this.objetiveId = objetiveId;
    this.isDone = false;

    //* private
    this._id = id;
  }

  // ANCHOR - Métodos

  // TODO - Implementar metodo para recuperar el objeto del objetivo completo.
  /**
   * ? Método para recuperar el objetivo de la tarea
   */
  // public getObjetive(): Objetive {
  //   return new Objetive();
  // }

  /**
   * ? Método para recuperar las ección de la tarea
   */
  // public getObjetive(): Objetive {
  //   return new Objetive();
  // }
}
