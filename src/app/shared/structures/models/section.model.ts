import { calculatePercentage } from 'src/app/shared/helpers/model.helpers';
import { Objetive } from './objetive.model';
import { Tech } from './techs.model';

/**
 * ? Interface del objeto a recibir en el constructor
 */
export interface ISectionsConstructor {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

/**
 * ? Modelo de secciones del proyecto
 */
export class Section {
  // ANCHOR - variables

  public name: string;
  public description: string;
  public icon: string | undefined;

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

  private _objetives: Objetive[];
  get objetives() {
    return this._objetives;
  }

  // ANCHOR - Constructor
  private constructor(sectionContrutor: ISectionsConstructor) {
    const { id, name, description, icon = undefined } = sectionContrutor;
    this._id = id;
    this.name = name;
    this.description = description;
    this.icon = icon;

    this._percentage = 0;
    this._objetives = [];
  }

  // ANCHOR - Métodos

  /**
   * ? Añade un objetivo a la sección y recalcula el porcentaje
   * @param objetive {Objetive} Objetivo a añadir en la sección
   * @returns {Objetive[]} - Retorna la lista de objetivos final
   */
  public addObjetive(objetive: Objetive): Objetive[] {
    this._objetives.push(objetive);
    this._percentage = calculatePercentage(this._objetives);
    return this._objetives;
  }

  /**
   * ? Elimina un objetivo a la sección y recalcula el porcentaje
   * @param objetive {Objetive | string} Objetivo o Id del objetivo a eliminar
   * @returns {Objetive[]} - Retorna la lista de objetivos final
   */
  public removeObjetive(objetive: Objetive | string): Objetive[] {
    //* Si recibimos la tarea completa extraemos la id
    if (typeof objetive !== 'string') objetive = (objetive as Objetive).id;
    this._objetives = this._objetives.filter(
      (element) => element.id !== objetive
    );
    this._percentage = calculatePercentage(this._objetives);
    return this._objetives;
  }

  /**
   * ? Recupera las tecnologias utilizadas en los objetivos de la sección
   * @returns {Tech[]} - Técnologias usadas en los objetivos de la sección
   */
  public getTechs(): Tech[] {
    let techsInSection: Tech[] = [];
    this._objetives.forEach((objetive) => {
      objetive.techs.forEach((tech) => {
        if (!techsInSection.some((elem) => elem.id === tech.id))
          techsInSection.push(tech);
      });
    });
    return techsInSection;
  }
}
