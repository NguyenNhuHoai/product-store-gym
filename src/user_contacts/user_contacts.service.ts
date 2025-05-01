import { Injectable, NotFoundException } from '@nestjs/common';
import { UserContactModel } from './user_contacts.model';
import { InjectModel } from '@nestjs/sequelize';
import { createUserContactDTO } from './dto/create_user_contact.dto';

@Injectable()
export class UserContactsService {
  constructor(
    @InjectModel(UserContactModel)
    private readonly userContactModel: typeof UserContactModel,
  ) {}

  async create(data: createUserContactDTO) {
    try {
      const newUserContact = await this.userContactModel.create(data);
      return {
        status: 200,
        message: 'Create user contact success',
        userContact: newUserContact,
      };
    } catch (error) {
      throw new Error('Failed to create user contact');
    }
  }

  async getAll() {
    try {
      const userContacts = await this.userContactModel.findAll();
      return {
        status: 200,
        message: 'Get user contacts success!',
        userContacts: userContacts,
      };
    } catch (error) {
      throw new Error('Can not get  user_contacts');
    }
  }

  async update(id: string, data: createUserContactDTO) {
    try {
      const [affectedRows] = await this.userContactModel.update(
        {
          phone: data.phone,
          address: data.address,
          is_default: data.is_default,
        },
        {
          where: { id: id },
        },
      );

      if (affectedRows === 0) {
        return {
          status: 404,
          message: 'User contact not found or data unchanged.',
        };
      }

      const updatedUserContact = await this.userContactModel.findByPk(id);

      return {
        status: 200,
        message: 'User contact updated successfully.',
        user_contact: updatedUserContact,
      };
    } catch (error) {
      throw new Error(`Update failed: ${error.message}`);
    }
  }

  async delete(id: string) {
    const checkIdContact = await this.userContactModel.findOne({
      where: { id },
    });
    if (!checkIdContact) {
      throw new NotFoundException('User contact is not defound');
    }
    const deleteUserContact = await this.userContactModel.destroy({
      where: { id },
    });

    if (deleteUserContact === 0) {
      throw new NotFoundException('User contact deleted failed');
    }
    return {
      status: 200,
      message: 'User contact deleted success!',
    };
  }
}
