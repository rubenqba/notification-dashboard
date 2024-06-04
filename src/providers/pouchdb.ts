"use client";
import env from "@config/env";
import { DEFAULT_PAGEABLE } from "@model/pagination";
import { createService } from "@service/requests-service";
import {
  CreateParams,
  CreateResult,
  DataProvider,
  DataProviderContext,
  DeleteManyParams,
  DeleteManyResult,
  DeleteParams,
  DeleteResult,
  GetListParams,
  GetListResult,
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
  GetOneParams,
  GetOneResult,
  Identifier,
  RaRecord,
  UpdateManyParams,
  UpdateManyResult,
  UpdateParams,
  UpdateResult,
} from "react-admin";

console.log("NEXT_PUBLIC_DB_URL=", process.env.NEXT_PUBLIC_DB_URL)
const service = createService(env.DB_URL);

export interface RequestRecord extends RaRecord<string> {}

export const PouchDataProvider: DataProvider = {
  getList: async function <RecordType extends RaRecord<Identifier> = any>(
    resource: string,
    params: GetListParams
  ): Promise<GetListResult<RecordType>> {
    const { page, perPage } = params.pagination ?? { page: 1, perPage: 10 };
    try {
      const info = await service.info();
      console.log(JSON.stringify(info, null, 2));
    } catch (err) {
      console.log("Ocurrio un error de pouchdb", err);
    }

    return service.getPage({ service: resource }, DEFAULT_PAGEABLE).then((result) => {
      console.log(result);
      const response: GetListResult<RecordType> = {
        data: result.content.map((r) => {
          const { _id, ...rest } = r;
          return {
            id: _id,
            ...rest,
          };
        }),
        total: result.totalElements,
      };
      return response;
    });
  },
  getOne: function <RecordType extends RaRecord<Identifier> = any>(
    resource: string,
    params: GetOneParams<RecordType>
  ): Promise<GetOneResult<RecordType>> {
    return service.findOne(params.id)
  },
  getMany: function <RecordType extends RaRecord<Identifier> = any>(
    resource: string,
    params: GetManyParams
  ): Promise<GetManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  getManyReference: function <RecordType extends RaRecord<Identifier> = any>(
    resource: string,
    params: GetManyReferenceParams
  ): Promise<GetManyReferenceResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  update: function <RecordType extends RaRecord<Identifier> = any>(
    resource: string,
    params: UpdateParams<any>
  ): Promise<UpdateResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  updateMany: function <RecordType extends RaRecord<Identifier> = any>(
    resource: string,
    params: UpdateManyParams<any>
  ): Promise<UpdateManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  create: function <
    RecordType extends Omit<RaRecord<Identifier>, "id"> = any,
    ResultRecordType extends RaRecord<Identifier> = RecordType & {
      id: Identifier;
    }
  >(
    resource: string,
    params: CreateParams<any>
  ): Promise<CreateResult<ResultRecordType>> {
    throw new Error("Function not implemented.");
  },
  delete: function <RecordType extends RaRecord<Identifier> = any>(
    resource: string,
    params: DeleteParams<RecordType>
  ): Promise<DeleteResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  deleteMany: function <RecordType extends RaRecord<Identifier> = any>(
    resource: string,
    params: DeleteManyParams<RecordType>
  ): Promise<DeleteManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
};
