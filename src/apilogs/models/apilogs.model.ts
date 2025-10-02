import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

import type {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

@Table({ tableName: 'apilogs', timestamps: true })
export class ApiLog extends Model<
  InferAttributes<ApiLog>,
  InferCreationAttributes<ApiLog>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: CreationOptional<number>;

  @Column(DataType.STRING)
  declare requestUrl: string;

  @Column(DataType.STRING)
  declare method: string;

  @Column(DataType.JSON)
  declare payload: object | null;

  @Column(DataType.JSON)
  declare response: object | null;

  @Column(DataType.INTEGER)
  declare statusCode: number | null;

  @Column(DataType.STRING)
  declare ip: string | null;

  @Column(DataType.JSON)
  declare headers: object | null;

  @Column(DataType.JSON)
  declare query: object | null;

  @Column(DataType.INTEGER)
  declare durationMs: number | null;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  declare timestamp: CreationOptional<Date>;
}

export default ApiLog;
