import {ILecture} from '../common/shared/models/ILecture';
import {IUnit} from '../common/shared/models/units/IUnit';

export class Lecture implements ILecture {
  _id: any;
  name: string;
  description: string;
  units: IUnit[];
}
