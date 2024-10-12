module.exports = class UserDto {
    id: String
    name: String
    constructor (model: any) {
        this.name = model.name
        this.id = model._id || model.id
    }
}