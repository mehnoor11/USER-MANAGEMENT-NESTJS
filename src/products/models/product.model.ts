import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';
import type { CreationOptional } from 'sequelize';

@Table({ tableName: 'products', paranoid: true, timestamps: true })
export class Product extends Model<Product> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: CreationOptional<number>;

  @Column({ type: DataType.STRING, allowNull: false })
  declare productName: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare productDescription: string;

  @CreatedAt
  @Column({ field: 'created_at', type: DataType.DATE })
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  @Column({ field: 'updated_at', type: DataType.DATE })
  declare updatedAt: CreationOptional<Date>;

  @DeletedAt
  @Column({ field: 'deleted_at', type: DataType.DATE })
  declare deletedAt: CreationOptional<Date>;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare createdBy: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare updatedBy: number | null;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare DeletedBy: number | null;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  declare isActive: boolean;
}
