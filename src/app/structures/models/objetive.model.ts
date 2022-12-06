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
 * ? Modelo de objetivos a realizar
 */
export class Objetive {
  // ANCHOR - Variables
  name: string;
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

  private _tasks: Task[];
  get tasks(): Task[] {
    return this._tasks;
  }

  // ANCHOR - Constructor
  constructor(
    id: string,
    name: string,
    state: TObjetiveStates,
    sectionId: string
  ) {
    this._id = id;
    this.name = name;
    this.state = state;
    this.sectionId = sectionId;
    this._percentage = 0;
    this._tasks = [];
  }

  // ANCHOR - Métodos

  /**
   * ? Recupera el progreso/porcentaje del objetivo
   * @return {number} Porcentaje
   */
  private calculatePercentage(): number {
    let count = 0;
    let countDone = 0;
    for (const task of this.tasks) {
      count++;
      task.isDone && countDone++;
    }

    this._percentage = (100 * countDone) / count;
    return this._percentage;
  }

  /**
   * ? Añade una tarea al objetivo y recalcula el porcentaje
   * @param task {Task} Tarea a añadir en el Objetivo
   */
  public addTask(task: Task): void {
    this._tasks.push(task);
    this.calculatePercentage();
  }

  /**
   * ? Elimina una tarea al objetivo y recalcula el porcentaje
   * @param task {Task | string} Tarea o Id de la tarea a eliminar
   */
  public removeTask(task: Task | string): void {
    let id: string;
    if (typeof task !== 'string') task = (task as Task).id;
    id = task;
    this._tasks = this._tasks.filter((element) => element.id !== id);
    this.calculatePercentage();
  }
}
