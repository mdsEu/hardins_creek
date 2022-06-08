import UserModel from '../models/User.Model';
import IUser from '../types/User';


class UserRepository {
  user:IUser;
  email = "";
  password = "";

  constructor() {
    this.user = new UserModel();
  }

  async save() {
    try {
      this.user.email = this.email;
      this.user.password = this.password;

      const {password, ...user} : IUser = await (await this.user.save()).toObject();

      return user;
    } catch (e) {
      throw "This user couldn't be saved";

    }
  }

  async findByEmail(email:string) {
    try {
      this.user = await UserModel.findOne({email: email}) as IUser;
      const {password, ...user} : IUser = this.user.toObject();
      return user;
    } catch (e) {
      throw "This user couldn't be found";
    }
  }

  async findById(id:string) {
    try {
      return await UserModel.findById(id);
    } catch (e) {
      throw "This user couldn't be found";
    }
  }

  async findAll() {
    try {
      return await UserModel.find();
    } catch (e) {
      throw "This user couldn't be found";
    }
  }

  async validatePassword(password:string) : Promise<boolean> {
    return await this.user.comparePassword(password);
  }

  setPassword(password:string) : void {
    this.password = password;
  }

  setEmail(email:string) : void {
    this.email = email;
  }

  getEmail() : string {
    return this.email;
  }

  getPassword() : string {
    return this.password;
  }
}

export default UserRepository;
