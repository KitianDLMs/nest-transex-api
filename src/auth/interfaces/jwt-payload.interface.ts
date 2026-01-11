import { ValidRoles } from "./valid-roles";


export interface JwtPayload {
    id: string
    email: string;
    roles: string[];
    fullName: string;
}
