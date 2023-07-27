import { Request } from "express";
import { Query } from "mongoose";

export class ApiFeature {
    modelQuery: Query<{}, any>
    featureObject: { [key: string]: any };
    constructor(modelQuery: Query<{}, any>, request: Request) {
        this.modelQuery = modelQuery
        this.featureObject = request.query
    }

    // Pagination
    paginate() {
        let page: number = this.featureObject.page * 1 || 1;
        if (this.featureObject.page <= 0) page = 1;
        let skip = (page - 1) * this.featureObject.limit;
        this.modelQuery.skip(skip).limit(this.featureObject.limit);
        return this;
    }
}