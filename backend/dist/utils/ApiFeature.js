export class ApiFeature {
    modelQuery;
    featureObject;
    constructor(modelQuery, request) {
        this.modelQuery = modelQuery;
        this.featureObject = request.query;
    }
    // Pagination
    paginate() {
        let page = this.featureObject.page * 1 || 1;
        if (this.featureObject.page <= 0)
            page = 1;
        let skip = (page - 1) * this.featureObject.limit;
        this.modelQuery.skip(skip).limit(this.featureObject.limit);
        return this;
    }
}
