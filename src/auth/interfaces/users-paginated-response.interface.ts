import { User } from "../entities/user.entity";

export interface UsersPaginatedResponse {
  data: User[];
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}
