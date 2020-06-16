import {IFileUnit} from '../../common/shared/models/units/IFileUnit';
import {IFile} from '../../common/shared/models/mediaManager/IFile';
import {ICourse} from '../../common/shared/models/ICourse';
import {IChatRoom} from '../../common/shared/models/IChatRoom';

export class FileUnit implements IFileUnit {
  _id: any;
  _course: any;
  name: string;
  description: string;
  type: string;
  __t: string;
  progressable: boolean;
  weight: number;
  updatedAt: string;
  createdAt: string;
  visible: boolean;
  unitCreator: any;
  chatRoom: IChatRoom;

  files: IFile[] = [];
  fileUnitType: string;

  constructor(_course: ICourse) {
    this._course = _course;
    this.__t = 'file';
    this.fileUnitType = 'file';
    this.progressable = false;
    this.weight = 0;
  }

}
