export interface ValidateService {
    isAbleToUpdate(address: string): Promise<boolean>;
    isAbleToCreate(address: string): Promise<boolean>
}
