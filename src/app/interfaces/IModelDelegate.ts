export interface IModelDelegate {
    aggregate(data: unknown): unknown;
    count(data: unknown): unknown;
    create(data: unknown): unknown;
    createMany(data: unknown): unknown;
    delete(data: unknown): unknown;
    deleteMany(data: unknown): unknown;
    findFirst(data: unknown): unknown;
    findFirstOrThrow(data: unknown): unknown;
    findMany(data: unknown): unknown;
    findUnique(data: unknown): unknown;
    findUniqueOrThrow(data: unknown): unknown;
    groupBy(data: unknown): unknown;
    update(data: unknown): unknown;
    updateMany(data: unknown): unknown;
    upsert(data: unknown): unknown;

    fields: string[];
}
