import { calculatePercentage } from 'src/app/shared/helpers/model.helpers';
import { Task } from './task.model';

/**
 * ? Tipo de estados posibles de un objetivo
 */
export type TObjetiveStates =
  | 'En progreso'
  | 'Hecho'
  | 'Por empezar'
  | 'Empezado'
  | 'Pausado';

/**
 * ? Interface del objeto a recibir en el constructor
 */
export interface IObjetiveConstructor {
  id: string;
  name: string;
  description: string;
  state: TObjetiveStates;
  sectionId: string;
}

/**
 * ? Modelo de objetivos a realizar
 */
export class Objetive {
  // ANCHOR - Variables
  name: string;
  description: string | undefined;
  state: TObjetiveStates;
  sectionId: string;

  private _id: string;
  get id(): string {
    return this._id;
  }

  private _percentage: number;
  get percentage(): number {
    return this._percentage;
  }

  get isDone(): boolean {
    return this._percentage >= 100;
  }

  private _tasks: Task[];
  get tasks(): Task[] {
    return [...this._tasks];
  }

  // ANCHOR - Constructor
  constructor(objetiveConstructor: IObjetiveConstructor) {
    const {
      id,
      name,
      description = undefined,
      state,
      sectionId,
    } = objetiveConstructor;

    //* public
    this.name = name;
    this.description = description || undefined;
    this.state = state;
    this.sectionId = sectionId;

    //* privates
    this._id = id;
    this._percentage = 0;
    this._tasks = [];
  }

  // ANCHOR - Métodos

  /**
   * ? Añade una tarea al objetivo y recalcula el porcentaje
   * @param task {Task} Tarea a añadir en el Objetivo
   */
  public addTask(task: Task): void {
    this._tasks.push(task);
    this._percentage = calculatePercentage(this._tasks);
  }

  /**
   * ? Elimina una tarea al objetivo y recalcula el porcentaje
   * @param task {Task | string} Tarea o Id de la tarea a eliminar
   */
  public removeTask(task: Task | string): void {
    //* Si recibimos la tarea completa extraemos la id
    if (typeof task !== 'string') task = (task as Task).id;
    this._tasks = this._tasks.filter((element) => element.id !== task);
    this._percentage = calculatePercentage(this._tasks);
  }
}
